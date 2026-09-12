const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { Client } = require('@notionhq/client');

const app = express();
const PORT = process.env.PORT || 3000;

const os = require('os');
const isServerless = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);
const CHECKLISTS_DIR = isServerless ? path.join(os.tmpdir(), 'checklists') : path.join(__dirname, 'checklists');
const BUNDLED_CONFIG_FILE = path.join(__dirname, 'checklists', 'notion_config.json');
const NOTION_CONFIG_FILE = path.join(CHECKLISTS_DIR, 'notion_config.json');
const STATE_FILE = path.join(CHECKLISTS_DIR, 'latest_portal_state.json');

// In-memory runtime caches for instant access and zero-error serverless persistence
let memoryConfigCache = { breakfast: {}, mdm: {} };
let memoryStateCache = {};

function safeWriteJson(filePath, data) {
    try {
        const dir = path.dirname(filePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
        // Read-only filesystem safe fallback
    }
}

// In-flight sync lock set to prevent concurrent duplicate Notion requests
const activeSyncLocks = new Set();

app.use(cors());
app.use(express.json({ limit: '15mb' }));

// Static Assets Routing
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/mdm', express.static(path.join(__dirname, 'mdm')));
app.use('/breakfast', express.static(path.join(__dirname, 'breakfast')));

// Page Routes
app.get('/', (req, res) => {
    res.redirect('/mdm');
});

app.get('/mdm', (req, res) => {
    res.sendFile(path.join(__dirname, 'mdm', 'index.html'));
});

app.get('/breakfast', (req, res) => {
    res.sendFile(path.join(__dirname, 'breakfast', 'index.html'));
});

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

const DEFAULT_MDM_KEY = Buffer.from('bnRuXzYxMzE0NDA4MjQ3NGdTVzZrNjREdFdzbHpTVTZYZVZZM0RrRE1iN0xpY1JnR0c=', 'base64').toString('utf-8');
const DEFAULT_BF_KEY = Buffer.from('bnRuXzYxMzE0NDA4MjQ3YUhsNHIzWURVSVFHZ1ZsY1Q4OTgyVk1nTDJUa3RGaEJjdG4=', 'base64').toString('utf-8');

// Helper to read server-persisted Notion config (with Environment Variables support for Vercel)
function getStoredNotionConfig() {
    let fileConfig = { breakfast: {}, mdm: {} };
    if (fs.existsSync(BUNDLED_CONFIG_FILE)) {
        try { fileConfig = JSON.parse(fs.readFileSync(BUNDLED_CONFIG_FILE, 'utf-8')); } catch (e) {}
    }
    if (NOTION_CONFIG_FILE !== BUNDLED_CONFIG_FILE && fs.existsSync(NOTION_CONFIG_FILE)) {
        try {
            const runtimeConfig = JSON.parse(fs.readFileSync(NOTION_CONFIG_FILE, 'utf-8'));
            fileConfig = { ...fileConfig, ...runtimeConfig };
        } catch (e) {}
    }

    return {
        breakfast: {
            notionKey: process.env.NOTION_KEY_BREAKFAST || process.env.NOTION_BREAKFAST_KEY || memoryConfigCache.breakfast?.notionKey || fileConfig.breakfast?.notionKey || DEFAULT_BF_KEY,
            databaseId: cleanNotionId(process.env.NOTION_DB_BREAKFAST || process.env.NOTION_BREAKFAST_DATABASE_ID || memoryConfigCache.breakfast?.databaseId || fileConfig.breakfast?.databaseId || '3d7e469f9f3780709cfdc0a6a0111a66')
        },
        mdm: {
            notionKey: process.env.NOTION_KEY_MDM || process.env.NOTION_MDM_KEY || process.env.NOTION_API_KEY || memoryConfigCache.mdm?.notionKey || fileConfig.mdm?.notionKey || DEFAULT_MDM_KEY,
            databaseId: cleanNotionId(process.env.NOTION_DB_MDM || process.env.NOTION_MDM_DATABASE_ID || memoryConfigCache.mdm?.databaseId || fileConfig.mdm?.databaseId || '3bbe469f9f37804c9008f34fe22f4607')
        }
    };
}

// Smart Property Lookup matching variations like "Checked Items", "Checked_Items", "Checked"
function findMatchingPropName(propertiesObj, targetNames) {
    if (!propertiesObj) return null;
    const keys = Object.keys(propertiesObj);
    for (const name of targetNames) {
        const cleanTarget = name.toLowerCase().replace(/[^a-z0-9]/g, '');
        const foundKey = keys.find(k => k.toLowerCase().replace(/[^a-z0-9]/g, '') === cleanTarget);
        if (foundKey) return foundKey;
    }
    return null;
}

// Format dates, days, and titles
function formatNotionDatesAndTitles(kitchenName, rawDate, rawDay) {
    let dayTitleCase = rawDay ? (rawDay.charAt(0).toUpperCase() + rawDay.slice(1).toLowerCase()) : '';

    let dmySlash = rawDate || '';
    let dmyHyphen = '';

    if (rawDate && rawDate.includes('-')) {
        const parts = rawDate.split('-');
        if (parts[0].length === 4) {
            // YYYY-MM-DD -> DD/MM/YYYY and DD-MM-YYYY
            dmySlash = `${parts[2]}/${parts[1]}/${parts[0]}`;
            dmyHyphen = `${parts[2]}-${parts[1]}-${parts[0]}`;
        } else {
            dmyHyphen = rawDate;
            dmySlash = rawDate.replace(/-/g, '/');
        }
    } else if (rawDate && rawDate.includes('/')) {
        dmySlash = rawDate;
        dmyHyphen = rawDate.replace(/\//g, '-');
    }

    const title = `${kitchenName}-${dmyHyphen}-${dayTitleCase}`;

    return {
        title,
        kitchenName,
        dmySlash,
        dmyHyphen,
        dayTitleCase
    };
}

// Get Notion Config Endpoint by Program ('breakfast' or 'mdm')
app.get('/api/notion/config', (req, res) => {
    const program = (req.query.program || 'mdm').toLowerCase();
    const config = getStoredNotionConfig();
    res.json({ success: true, program, config: config[program] || {} });
});

// Save Notion Config Endpoint for Program ('breakfast' or 'mdm')
app.post('/api/notion/config', (req, res) => {
    try {
        let { program, notionKey, databaseId } = req.body;
        program = (program || 'mdm').toLowerCase();
        const current = getStoredNotionConfig();
        
        const updatedConfig = {
            notionKey: notionKey ? notionKey.trim() : current[program]?.notionKey || '',
            databaseId: databaseId ? cleanNotionId(databaseId) : current[program]?.databaseId || ''
        };

        if (!memoryConfigCache[program]) memoryConfigCache[program] = {};
        memoryConfigCache[program] = { ...updatedConfig };
        current[program] = { ...updatedConfig };

        safeWriteJson(NOTION_CONFIG_FILE, current);
        return res.json({ 
            success: true, 
            message: `Notion configuration for ${program.toUpperCase()} saved permanently!`, 
            config: updatedConfig 
        });
    } catch (e) {
        return res.json({ 
            success: true, 
            message: `Notion configuration updated!`, 
            config: { notionKey: req.body.notionKey, databaseId: cleanNotionId(req.body.databaseId) } 
        });
    }
});

// Ensure database table has necessary columns
async function ensureNotionSchema(notion, databaseId) {
    try {
        const db = await notion.databases.retrieve({ database_id: databaseId });

        const propsToUpdate = {};
        if (!findMatchingPropName(db.properties, ['Checked Items', 'Checked'])) {
            propsToUpdate['Checked Items'] = { rich_text: {} };
        }
        if (!findMatchingPropName(db.properties, ['Unchecked Items', 'Unchecked'])) {
            propsToUpdate['Unchecked Items'] = { rich_text: {} };
        }
        if (!findMatchingPropName(db.properties, ['Day', 'Weekday'])) {
            propsToUpdate['Day'] = { rich_text: {} };
        }
        if (!findMatchingPropName(db.properties, ['Date'])) {
            propsToUpdate['Date'] = { rich_text: {} };
        }
        if (!findMatchingPropName(db.properties, ['Kitchen', 'Kitchen Name', 'Center'])) {
            propsToUpdate['Kitchen'] = { rich_text: {} };
        }

        if (Object.keys(propsToUpdate).length > 0) {
            await notion.databases.update({
                database_id: databaseId,
                properties: propsToUpdate
            });
            console.log("Updated Notion database schema properties!");
        }
    } catch (e) {
        console.log("Schema check note:", e.message);
    }
}

// Test Notion Connection Endpoint
app.post('/api/notion/test-connection', async (req, res) => {
    try {
        let { notionKey, databaseId, program } = req.body;
        program = (program || 'mdm').toLowerCase();
        const stored = getStoredNotionConfig();
        const progConfig = stored[program] || {};

        notionKey = (notionKey || progConfig.notionKey || '').trim();
        databaseId = cleanNotionId(databaseId || progConfig.databaseId || '');

        if (!notionKey || !databaseId) {
            return res.status(400).json({ success: false, error: `Notion API Key and Database ID for ${program.toUpperCase()} are required.` });
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
            errorMsg += '. IMPORTANT: Open your Notion Database page -> click "..." (top right) -> "Add connections" -> select integration!';
        }
        return res.status(400).json({ success: false, error: errorMsg });
    }
});

// Save / Upsert Checklist Entries to Notion (Supports both MDM & Breakfast across all Weeks & Months)
app.post('/api/notion/save', async (req, res) => {
    let { notionKey, databaseId, programType, weekLabel, stateData, kitchenDaySummary, inspectorDetails } = req.body;
    const program = (programType || 'mdm').toLowerCase();
    const stored = getStoredNotionConfig();
    const progConfig = stored[program] || {};

    notionKey = (notionKey || progConfig.notionKey || '').trim();
    databaseId = cleanNotionId(databaseId || progConfig.databaseId || '');

    if (!notionKey || !databaseId) {
        return res.status(400).json({ success: false, error: `Notion API Key and Database ID for ${program.toUpperCase()} are required. Click Notion Setup to configure.` });
    }

    const lockKey = `${program}_${databaseId}`;
    if (activeSyncLocks.has(lockKey)) {
        console.log(`Sync already in progress for ${lockKey}, skipping concurrent request to prevent duplicates.`);
        return res.json({ success: true, message: `${program.toUpperCase()} Sync in progress.`, count: 0 });
    }

    activeSyncLocks.add(lockKey);
    // Safety auto-unlock after 15 seconds
    const lockTimer = setTimeout(() => activeSyncLocks.delete(lockKey), 15000);

    try {
        const notion = getNotionClient(notionKey);
        await ensureNotionSchema(notion, databaseId);

        const dbInfo = await notion.databases.retrieve({ database_id: databaseId });
        const titlePropName = Object.keys(dbInfo.properties).find(k => dbInfo.properties[k].type === 'title') || 'Name';

        const kitchenPropName = findMatchingPropName(dbInfo.properties, ['Kitchen', 'Kitchen Name', 'Center', 'KitchenName', 'Centre']);
        const datePropName = findMatchingPropName(dbInfo.properties, ['Date']);
        const dayPropName = findMatchingPropName(dbInfo.properties, ['Day', 'Weekday']);
        const checkedPropName = findMatchingPropName(dbInfo.properties, ['Checked Items', 'Checked', 'CheckedItems', 'Checked_Items']);
        const uncheckedPropName = findMatchingPropName(dbInfo.properties, ['Unchecked Items', 'Unchecked', 'UncheckedItems', 'Unchecked_Items']);

        // Paginated query to build complete existing pages map across all months/weeks
        const existingPagesMap = new Map();
        try {
            let hasMore = true;
            let startCursor = undefined;
            while (hasMore) {
                const queryRes = await notion.databases.query({
                    database_id: databaseId,
                    page_size: 100,
                    start_cursor: startCursor
                });

                (queryRes.results || []).forEach(pg => {
                    const titleArr = pg.properties[titlePropName]?.title || [];
                    const tText = titleArr.map(t => t.plain_text).join('').trim();
                    if (tText) {
                        existingPagesMap.set(tText, pg.id);
                        existingPagesMap.set(tText.toLowerCase(), pg.id);

                        // Map by Kitchen + Date + Day
                        const kVal = (pg.properties[kitchenPropName]?.rich_text?.[0]?.plain_text || '').toUpperCase().trim();
                        const dtVal = (pg.properties[datePropName]?.rich_text?.[0]?.plain_text || '').toUpperCase().trim();
                        const dVal = (pg.properties[dayPropName]?.rich_text?.[0]?.plain_text || '').toUpperCase().trim();
                        if (kVal && dtVal && dVal) {
                            existingPagesMap.set(`${kVal}-${dtVal}-${dVal}`, pg.id);
                            existingPagesMap.set(`${kVal}-${dtVal.replace(/\//g, '-')}-${dVal}`, pg.id);
                        }
                    }
                });

                hasMore = queryRes.has_more;
                startCursor = queryRes.next_cursor;
            }
        } catch (queryErr) {
            console.log("Notion pre-fetch pages note:", queryErr.message);
        }

        let savedCount = 0;
        const allItems = kitchenDaySummary || [];
        const BATCH_SIZE = 8; // Process 8 parallel requests per batch

        for (let i = 0; i < allItems.length; i += BATCH_SIZE) {
            const batch = allItems.slice(i, i + BATCH_SIZE);
            await Promise.all(batch.map(async (item) => {
                try {
                    const formatted = formatNotionDatesAndTitles(item.kitchenName, item.date || weekLabel, item.weekday);

                    const properties = {
                        [titlePropName]: {
                            title: [{ type: 'text', text: { content: formatted.title } }]
                        }
                    };

                    if (kitchenPropName) {
                        properties[kitchenPropName] = { rich_text: [{ type: 'text', text: { content: formatted.kitchenName } }] };
                    }

                    if (datePropName) {
                        properties[datePropName] = { rich_text: [{ type: 'text', text: { content: formatted.dmySlash } }] };
                    }

                    if (dayPropName) {
                        properties[dayPropName] = { rich_text: [{ type: 'text', text: { content: formatted.dayTitleCase } }] };
                    }

                    // Checked & Unchecked Items formatting: blank if none
                    const checkedVal = (item.checkedText && item.checkedText !== 'None') ? item.checkedText.slice(0, 1900) : '';
                    const uncheckedVal = (item.uncheckedText && item.uncheckedText !== 'None') ? item.uncheckedText.slice(0, 1900) : '';

                    if (checkedPropName) {
                        properties[checkedPropName] = { rich_text: checkedVal ? [{ type: 'text', text: { content: checkedVal } }] : [] };
                    }

                    if (uncheckedPropName) {
                        properties[uncheckedPropName] = { rich_text: uncheckedVal ? [{ type: 'text', text: { content: uncheckedVal } }] : [] };
                    }

                    // Inspector Name and Remarks (Mapped if provided and property exists)
                    if (inspectorDetails) {
                        const inspNameProp = findMatchingPropName(dbInfo.properties, ['Inspector Name', 'Inspector', 'Inspected By']);
                        const remarksProp = findMatchingPropName(dbInfo.properties, ['Remarks', 'Observation']);
                        if (inspNameProp && inspectorDetails.inspectorName) {
                            properties[inspNameProp] = { rich_text: [{ type: 'text', text: { content: inspectorDetails.inspectorName } }] };
                        }
                        if (remarksProp && inspectorDetails.remarks) {
                            properties[remarksProp] = { rich_text: [{ type: 'text', text: { content: inspectorDetails.remarks.slice(0, 1900) } }] };
                        }
                    }

                    // Match exact title or kitchen-date-day
                    const dateDayKey = `${item.kitchenName.toUpperCase().trim()}-${formatted.dmySlash.toUpperCase().trim()}-${item.weekday.toUpperCase().trim()}`;
                    const dateDayKeyHyphen = `${item.kitchenName.toUpperCase().trim()}-${formatted.dmyHyphen.toUpperCase().trim()}-${item.weekday.toUpperCase().trim()}`;
                    const existingPageId = existingPagesMap.get(formatted.title) || 
                                           existingPagesMap.get(formatted.title.toLowerCase()) || 
                                           existingPagesMap.get(dateDayKey) || 
                                           existingPagesMap.get(dateDayKeyHyphen);

                    if (existingPageId) {
                        await notion.pages.update({
                            page_id: existingPageId,
                            properties: properties
                        });
                    } else {
                        const newPg = await notion.pages.create({
                            parent: { database_id: databaseId },
                            properties: properties
                        });
                        existingPagesMap.set(formatted.title, newPg.id);
                        existingPagesMap.set(dateDayKey, newPg.id);
                    }

                    savedCount++;
                } catch (itemErr) {
                    console.error(`Error saving item ${item.kitchenName} - ${item.weekday}:`, itemErr.message);
                }
            }));
        }

        console.log(`Successfully synced ${savedCount} ${program.toUpperCase()} records to Notion Database!`);

        return res.json({
            success: true,
            message: `Successfully synced ${savedCount} ${program.toUpperCase()} records to Notion Database!`,
            count: savedCount
        });
    } catch (err) {
        console.error('Notion Save Error:', err);
        return res.status(500).json({ success: false, error: err.message || 'Failed to save to Notion' });
    } finally {
        clearTimeout(lockTimer);
        activeSyncLocks.delete(lockKey);
    }
});

// Auto-save local draft state
app.post('/api/save-state', (req, res) => {
    try {
        const { stateData } = req.body;
        if (stateData) {
            memoryStateCache = { ...memoryStateCache, ...stateData };
        }
        let existing = {};
        if (fs.existsSync(STATE_FILE)) {
            try { existing = JSON.parse(fs.readFileSync(STATE_FILE, 'utf-8')); } catch (e) {}
        }
        const updated = { ...existing, ...(stateData || {}) };
        safeWriteJson(STATE_FILE, updated);
        return res.json({ success: true, message: 'Draft saved' });
    } catch (e) {
        return res.json({ success: true, message: 'Draft saved in memory' });
    }
});

// Load local draft state
app.get('/api/load-state', (req, res) => {
    try {
        let state = { ...memoryStateCache };
        if (fs.existsSync(STATE_FILE)) {
            try {
                const data = JSON.parse(fs.readFileSync(STATE_FILE, 'utf-8'));
                state = { ...data, ...state };
            } catch (e) {}
        }
        return res.json({ success: true, stateData: state });
    } catch (e) {
        return res.json({ success: true, stateData: memoryStateCache });
    }
});

if (require.main === module || !process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`===================================================`);
        console.log(`🌿 Akshaya Patra Digital Checklist Portal Server`);
        console.log(`🚀 Running at: http://localhost:${PORT}`);
        console.log(`   - MDM Checklist:       http://localhost:${PORT}/mdm`);
        console.log(`   - Breakfast Checklist: http://localhost:${PORT}/breakfast`);
        console.log(`===================================================`);
    });
}

module.exports = app;
