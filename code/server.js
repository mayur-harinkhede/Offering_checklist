const express = require('express');
const cors = require('cors');
const path = require('path');
const { Client } = require('@notionhq/client');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname)));
app.use('/images', express.static(path.join(__dirname, '../images')));
app.use(express.static(path.join(__dirname, '../images')));

// Helper to initialize Notion Client
function getNotionClient(authKey) {
    if (!authKey) throw new Error("Notion API Key is required");
    return new Client({ auth: authKey });
}

// Clean Notion IDs
function cleanNotionId(str) {
    if (!str) return '';
    let cleaned = str.trim();
    if (cleaned.includes('notion.com') || cleaned.includes('notion.so') || cleaned.includes('notion.site')) {
        const urlWithoutQuery = cleaned.split('?')[0];
        const parts = urlWithoutQuery.split('/');
        cleaned = parts[parts.length - 1];
        if (cleaned.includes('-')) {
            const hyphenParts = cleaned.split('-');
            cleaned = hyphenParts[hyphenParts.length - 1];
        }
    }
    cleaned = cleaned.replace(/[^a-zA-Z0-9]/g, '');
    return cleaned;
}

// Ensure database table has separate columns: 'Kitchen Name', 'Date', 'Weekday', 'Checked Items', 'Unchecked Items'
async function ensureNotionSchema(notion, databaseId) {
    try {
        const db = await notion.databases.retrieve({ database_id: databaseId });
        const existingProps = Object.keys(db.properties);

        const propsToUpdate = {};
        if (!existingProps.includes('Checked Items')) {
            propsToUpdate['Checked Items'] = { rich_text: {} };
        }
        if (!existingProps.includes('Unchecked Items')) {
            propsToUpdate['Unchecked Items'] = { rich_text: {} };
        }
        if (!existingProps.includes('Weekday') && !existingProps.includes('Day')) {
            propsToUpdate['Weekday'] = { rich_text: {} };
        }
        if (!existingProps.includes('Date')) {
            propsToUpdate['Date'] = { rich_text: {} };
        }
        if (!existingProps.includes('Kitchen Name') && !existingProps.includes('Kitchen')) {
            propsToUpdate['Kitchen Name'] = { rich_text: {} };
        }

        if (Object.keys(propsToUpdate).length > 0) {
            await notion.databases.update({
                database_id: databaseId,
                properties: propsToUpdate
            });
            console.log("Updated Notion database schema with separate columns!");
        }
    } catch (e) {
        console.log("Schema check note:", e.message);
    }
}

// Helper to build inside page blocks for a Kitchen row
function buildKitchenPageBlocks(rowTitle, item, stateData) {
    const blocks = [];

    blocks.push({
        object: 'block',
        type: 'callout',
        callout: {
            rich_text: [{ 
                type: 'text', 
                text: { content: `Kitchen Checklist Record: ${rowTitle}` } 
            }],
            icon: { emoji: '🏢' }
        }
    });

    blocks.push({
        object: 'block',
        type: 'heading_2',
        heading_2: {
            rich_text: [{ type: 'text', text: { content: '✅ Offered / Checked Items:' } }]
        }
    });

    blocks.push({
        object: 'block',
        type: 'paragraph',
        paragraph: {
            rich_text: [{ type: 'text', text: { content: item.checkedText || 'None' } }]
        }
    });

    blocks.push({
        object: 'block',
        type: 'heading_2',
        heading_2: {
            rich_text: [{ type: 'text', text: { content: '❌ Pending / Unchecked Items:' } }]
        }
    });

    blocks.push({
        object: 'block',
        type: 'paragraph',
        paragraph: {
            rich_text: [{ type: 'text', text: { content: item.uncheckedText || 'None' } }]
        }
    });

    return blocks;
}

// Test Notion Connection
app.post('/api/notion/test-connection', async (req, res) => {
    try {
        let { notionKey, databaseId } = req.body;
        databaseId = cleanNotionId(databaseId);

        if (!notionKey || !databaseId) {
            return res.status(400).json({ success: false, error: 'Notion API Key and Database ID are required.' });
        }
        const notion = getNotionClient(notionKey);
        
        let db;
        try {
            db = await notion.databases.retrieve({ database_id: databaseId });
        } catch (e) {
            try {
                const pg = await notion.pages.retrieve({ page_id: databaseId });
                return res.json({
                    success: true,
                    cleanedDbId: databaseId,
                    title: pg.properties?.title?.title?.[0]?.plain_text || 'Notion Page Connected'
                });
            } catch (err2) {
                throw e;
            }
        }

        return res.json({ 
            success: true, 
            cleanedDbId: databaseId,
            title: db.title?.[0]?.plain_text || 'Notion Database Connected' 
        });
    } catch (err) {
        console.error('Notion Connection Error:', err.message);
        let errorMsg = err.message || 'Failed to connect to Notion';
        if (errorMsg.includes('Could not find database') || errorMsg.includes('Could not find page')) {
            errorMsg += '. IMPORTANT: Open your Notion Database page -> click "..." (top right) -> "Add connections" -> select "Offering Checklist"!';
        }
        return res.status(400).json({ success: false, error: errorMsg });
    }
});

// Save 48 Kitchen Rows to Notion with SEPARATE filterable columns ('Kitchen Name', 'Date', 'Weekday', 'Checked Items', 'Unchecked Items')
app.post('/api/notion/save', async (req, res) => {
    try {
        let { notionKey, databaseId, weekLabel, dateRange, stateData, kitchenDaySummary } = req.body;
        databaseId = cleanNotionId(databaseId);

        if (!notionKey || !databaseId) {
            return res.status(400).json({ success: false, error: 'Notion API Key and Database ID are required.' });
        }

        const notion = getNotionClient(notionKey);

        // 1. Ensure database table columns exist
        await ensureNotionSchema(notion, databaseId);

        const dbInfo = await notion.databases.retrieve({ database_id: databaseId });
        const titlePropName = Object.keys(dbInfo.properties).find(k => dbInfo.properties[k].type === 'title') || 'Name';

        // Fetch ALL pages from Notion database using full pagination so existing pages are ALWAYS found
        let allPages = [];
        let hasMore = true;
        let startCursor = undefined;

        while (hasMore) {
            const queryRes = await notion.databases.query({
                database_id: databaseId,
                start_cursor: startCursor,
                page_size: 100
            }).catch(err => {
                throw new Error(`Could not query Notion database. Did you click "..." (top right in Notion) -> "Add connections" -> select "Offering Checklist"? (${err.message})`);
            });

            allPages = allPages.concat(queryRes.results);
            hasMore = queryRes.has_more;
            startCursor = queryRes.next_cursor;
        }

        const itemsToSave = kitchenDaySummary || [];

        // Map existing Notion pages by row title for fast 1-step lookups
        const existingMap = new Map();
        allPages.forEach(p => {
            const prop = p.properties[titlePropName] || Object.values(p.properties).find(v => v.type === 'title');
            const titleVal = prop?.title?.[0]?.plain_text;
            if (titleVal) existingMap.set(titleVal, p.id);
        });

        // Process items in parallel chunks of 8 to stay super fast (< 2 seconds) and avoid Notion rate limits
        const CHUNK_SIZE = 8;
        for (let i = 0; i < itemsToSave.length; i += CHUNK_SIZE) {
            const chunk = itemsToSave.slice(i, i + CHUNK_SIZE);

            await Promise.all(chunk.map(async (item) => {
                const rowTitle = item.rowTitle; // Format: NELLORE-19-08-2026-Wednesday
                const existingPageId = existingMap.get(rowTitle);

                const rowProperties = {
                    [titlePropName]: {
                        title: [{ type: 'text', text: { content: rowTitle } }]
                    }
                };

                // Column 1: Kitchen Name
                if (dbInfo.properties['Kitchen Name']) {
                    rowProperties['Kitchen Name'] = {
                        rich_text: [{ type: 'text', text: { content: item.centerName || '' } }]
                    };
                } else if (dbInfo.properties['Kitchen']) {
                    rowProperties['Kitchen'] = {
                        rich_text: [{ type: 'text', text: { content: item.centerName || '' } }]
                    };
                }

                // Column 2: Date
                if (dbInfo.properties['Date']) {
                    rowProperties['Date'] = {
                        rich_text: [{ type: 'text', text: { content: item.date || '' } }]
                    };
                }

                // Column 3: Weekday
                if (dbInfo.properties['Weekday']) {
                    rowProperties['Weekday'] = {
                        rich_text: [{ type: 'text', text: { content: item.dayName || '' } }]
                    };
                } else if (dbInfo.properties['Day']) {
                    rowProperties['Day'] = {
                        rich_text: [{ type: 'text', text: { content: item.dayName || '' } }]
                    };
                }

                // Column 4: Checked Items (Reflects exact checked items or EMPTY BLANK when unchecked!)
                if (dbInfo.properties['Checked Items']) {
                    const isBlank = !item.checkedText || item.checkedText === 'None' || item.checkedCount === 0;
                    rowProperties['Checked Items'] = {
                        rich_text: isBlank ? [] : [{ type: 'text', text: { content: item.checkedText.slice(0, 1900) } }]
                    };
                }

                // Column 5: Unchecked Items
                if (dbInfo.properties['Unchecked Items']) {
                    const isBlank = !item.uncheckedText || item.uncheckedText === 'None';
                    rowProperties['Unchecked Items'] = {
                        rich_text: isBlank ? [] : [{ type: 'text', text: { content: item.uncheckedText.slice(0, 1900) } }]
                    };
                }

                const pageBlocks = buildKitchenPageBlocks(rowTitle, item, stateData);

                if (existingPageId) {
                    await notion.pages.update({
                        page_id: existingPageId,
                        properties: rowProperties,
                        archived: false
                    });
                } else {
                    await notion.pages.create({
                        parent: { database_id: databaseId },
                        properties: rowProperties,
                        children: pageBlocks
                    });
                }
            }));
        }

        return res.json({ 
            success: true, 
            savedCount: itemsToSave.length,
            message: `Successfully saved ${itemsToSave.length} kitchen rows to Notion database!` 
        });
    } catch (err) {
        console.error('Save to Notion Error:', err);
        return res.status(500).json({ success: false, error: err.message || 'Error saving to Notion' });
    }
});

app.listen(PORT, () => {
    console.log(`Akshaya Patra Checklist Server running at http://localhost:${PORT}`);
});
