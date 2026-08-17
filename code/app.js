// Akshaya Patra Daily Menu Offering Checklist - Application Logic

// Center Data with Menu Items for Monday through Saturday
const CENTERS_DATA = [
    {
        id: 1,
        name: "NELLORE",
        iconImg: "../images/center_1.png",
        menu: {
            mon: [{ text: "White rice", type: "rice" }, { text: "Veg Sambar", type: "sambar" }],
            tue: [{ text: "Pulhora", type: "rice" }, { text: "Dondakaya Chutney", type: "chutney" }, { text: "Banana", type: "banana" }],
            wed: [{ text: "White rice", type: "rice" }, { text: "Veg Sambar", type: "sambar" }, { text: "Veg - curry", type: "curry" }],
            thu: [{ text: "Vegetable rice", type: "rice" }, { text: "Aaloo Kurma", type: "curry" }, { text: "Curd", type: "curd" }],
            fri: [{ text: "White rice", type: "rice" }, { text: "Leafy dal", type: "dal" }, { text: "Curry (with out egg)", type: "curry" }, { text: "Pickle", type: "pickle" }],
            sat: [{ text: "White rice", type: "rice" }, { text: "Pappu charu", type: "dal" }, { text: "Sweet Pongal", type: "sweet" }]
        }
    },
    {
        id: 2,
        name: "KALYANADURGAM",
        iconImg: "../images/center_2.png",
        menu: {
            mon: [{ text: "White rice", type: "rice" }, { text: "Veg Sambar", type: "sambar" }, { text: "Veg- curry", type: "curry" }],
            tue: [{ text: "Pulhora", type: "rice" }, { text: "Groundnut Chutney", type: "chutney" }, { text: "Banana", type: "banana" }],
            wed: [{ text: "White rice", type: "rice" }, { text: "Veg Sambar", type: "sambar" }],
            thu: [{ text: "Vegetable rice", type: "rice" }, { text: "Aaloo Kurma", type: "curry" }, { text: "Curd", type: "curd" }],
            fri: [{ text: "White rice", type: "rice" }, { text: "Leafy dal", type: "dal" }, { text: "Pickle", type: "pickle" }],
            sat: [{ text: "White rice", type: "rice" }, { text: "Pappu charu", type: "dal" }, { text: "Sweet Pongal", type: "sweet" }]
        }
    },
    {
        id: 3,
        name: "KUPPAM",
        iconImg: "../images/center_3.png",
        menu: {
            mon: [{ text: "White Rice", type: "rice" }, { text: "Mix Veg Curry", type: "curry" }, { text: "Tomato Pappu Charu", type: "dal" }],
            tue: [{ text: "Tamarind Rice", type: "rice" }, { text: "Groundnut Chutney", type: "chutney" }, { text: "Banana", type: "banana" }],
            wed: [{ text: "White Rice", type: "rice" }, { text: "Mix Veg Sambar", type: "sambar" }, { text: "Pickle", type: "pickle" }],
            thu: [{ text: "Vegetable Rice", type: "rice" }, { text: "Salan", type: "curry" }, { text: "Curd", type: "curd" }],
            fri: [{ text: "White Rice", type: "rice" }, { text: "Leaf Dhal", type: "dal" }, { text: "Pickle", type: "pickle" }],
            sat: [{ text: "White Rice", type: "rice" }, { text: "Pappu Charu", type: "dal" }, { text: "Sweet Pongal", type: "sweet" }]
        }
    },
    {
        id: 4,
        name: "WARANGAL",
        iconImg: "../images/center_4.png",
        menu: {
            mon: [{ text: "Jeera Rice", type: "rice" }, { text: "Mix Veg Green", type: "curry" }, { text: "Peas Curry", type: "curry" }, { text: "Rava Kesari", type: "sweet" }],
            tue: [{ text: "White Rice", type: "rice" }, { text: "Mix Veg Chana", type: "curry" }, { text: "Dhal Curry", type: "dal" }, { text: "Mix Veg Sambar", type: "sambar" }, { text: "Pickle", type: "pickle" }],
            wed: [{ text: "White Rice", type: "rice" }, { text: "Mix Veg Curry Sabji", type: "curry" }, { text: "Leaf Dhal", type: "dal" }, { text: "Chikki", type: "chikki" }],
            thu: [{ text: "Vegetable Biryani", type: "rice" }, { text: "Mix Veg Kulasi", type: "curry" }, { text: "Chana Curry", type: "curry" }, { text: "Curd", type: "curd" }],
            fri: [{ text: "White Rice", type: "rice" }, { text: "Mix Veg Curry Sabji", type: "curry" }, { text: "Mix Veg Sambar", type: "sambar" }, { text: "Chikki", type: "chikki" }],
            sat: [{ text: "White Rice", type: "rice" }, { text: "Mix Veg Green", type: "curry" }, { text: "Peas Curry", type: "curry" }, { text: "Leaf Dhal", type: "dal" }, { text: "Sweet Pongal", type: "sweet" }]
        }
    },
    {
        id: 5,
        name: "NARSINGI",
        iconImg: "../images/center_5.png",
        menu: {
            mon: [{ text: "Khichdi", type: "rice" }, { text: "Aloo Meal Maker Curry", type: "curry" }, { text: "Majjiga Pulusu / Chutney / Pickle", type: "chutney" }],
            tue: [{ text: "White Rice", type: "rice" }, { text: "Veg Sambar", type: "sambar" }, { text: "Paneer Green", type: "curry" }, { text: "Peas Masala", type: "curry" }, { text: "Sweet Pongal", type: "sweet" }],
            wed: [{ text: "White Rice", type: "rice" }, { text: "Leaf Dal", type: "dal" }, { text: "Bottle Gourd", type: "curry" }, { text: "Moong Dal Curry", type: "dal" }, { text: "Chikki", type: "chikki" }],
            thu: [{ text: "Veg Biryani", type: "rice" }, { text: "Aloo Green", type: "curry" }, { text: "Peas Curry", type: "curry" }, { text: "Curd", type: "curd" }],
            fri: [{ text: "White Rice", type: "rice" }, { text: "Veg Sambar", type: "sambar" }, { text: "Tomato Uabla Curry", type: "curry" }, { text: "Chikki / Rava Kesari", type: "sweet" }],
            sat: [{ text: "White Rice", type: "rice" }, { text: "Leaf Dal", type: "dal" }, { text: "Paneer Masala with Matar", type: "curry" }, { text: "Rava Kesari / Rasam", type: "sweet" }]
        }
    },
    {
        id: 6,
        name: "ONGOLE",
        iconImg: "../images/center_6.png",
        menu: {
            mon: [{ text: "White Rice", type: "rice" }, { text: "Dosakaya Pappu", type: "dal" }, { text: "Sweet Pongal", type: "sweet" }],
            tue: [{ text: "Pulhora", type: "rice" }, { text: "Tomato Pappu", type: "dal" }],
            wed: [{ text: "White Rice", type: "rice" }, { text: "Leaf & Dal", type: "dal" }, { text: "Boiled Chana", type: "curry" }],
            thu: [{ text: "White Rice", type: "rice" }, { text: "Sambar with Vegetables", type: "sambar" }, { text: "Green Leafy Vegetable Curry", type: "curry" }, { text: "Sweet Pongal", type: "sweet" }],
            fri: [{ text: "White Rice", type: "rice" }, { text: "Sorakaya Pappu / Beerakaya Pappu / Green Leafy Vegetable Curry", type: "dal" }, { text: "Sweet Pongal", type: "sweet" }],
            sat: [{ text: "Vegetable Rice", type: "rice" }, { text: "Sambar with Vegetables", type: "sambar" }, { text: "Green Leafy Vegetable Curry", type: "curry" }, { text: "Curd", type: "curd" }]
        }
    },
    {
        id: 7,
        name: "NAWABPETA",
        iconImg: "../images/center_7.png",
        menu: {
            mon: [{ text: "Special Rice", type: "rice" }, { text: "Mix Veg Curry-500", type: "curry" }, { text: "Sweet Pongal / Curd", type: "sweet" }],
            tue: [{ text: "White Rice", type: "rice" }, { text: "Veg Sambar", type: "sambar" }, { text: "Mix Veg Curry-500", type: "curry" }, { text: "Pickle", type: "pickle" }],
            wed: [{ text: "White Rice", type: "rice" }, { text: "Leaf Dal / Veg Dal", type: "dal" }, { text: "Mix Veg Curry-500", type: "curry" }, { text: "Chikki", type: "chikki" }],
            thu: [{ text: "Special Rice", type: "rice" }, { text: "Mix Veg Curry-500", type: "curry" }, { text: "Curd", type: "curd" }],
            fri: [{ text: "White Rice", type: "rice" }, { text: "Veg Sambar", type: "sambar" }, { text: "Mix Veg Curry-500", type: "curry" }, { text: "Pickle / Rava Kesari", type: "pickle" }],
            sat: [{ text: "Rice", type: "rice" }, { text: "Veg Sambar", type: "sambar" }, { text: "Leaf Dal / Veg Dal", type: "dal" }, { text: "Mix Veg Curry-500", type: "curry" }, { text: "Pickle", type: "pickle" }]
        }
    },
    {
        id: 8,
        name: "KANDHI",
        iconImg: "../images/center_8.png",
        menu: {
            mon: [{ text: "Bagara Rice", type: "rice" }, { text: "Mix Veg Dalcha", type: "dal" }, { text: "Sweet Rice", type: "sweet" }, { text: "Pickle (mango)", type: "pickle" }],
            tue: [{ text: "Rice", type: "rice" }, { text: "Mix Veg Sambar", type: "sambar" }, { text: "Soya Chunks Mini", type: "curry" }, { text: "Meal Maker Curry", type: "curry" }, { text: "Tomato Tango Masala", type: "curry" }],
            wed: [{ text: "Rice", type: "rice" }, { text: "Leaf Dal - 1200/tomato pappu", type: "dal" }, { text: "Mix Veg Curry (Mix Veg Dal)", type: "curry" }, { text: "Tomato Tango Masala", type: "curry" }],
            thu: [{ text: "Veg Biryani", type: "rice" }, { text: "South Indi Mix Veg Curry", type: "curry" }, { text: "Curd", type: "curd" }, { text: "Tomato Ketchup masala", type: "curry" }],
            fri: [{ text: "Rice", type: "rice" }, { text: "Mix Veg Sambar", type: "sambar" }, { text: "Mix Veg Curry", type: "curry" }, { text: "(Mix veg paneer curry)", type: "curry" }, { text: "Tomato Ketchup masala", type: "curry" }],
            sat: [{ text: "Rice", type: "rice" }, { text: "Leaf Dal - 1200/tomato pappu", type: "dal" }, { text: "Ridge Gourd", type: "curry" }, { text: "Moongdal Curry", type: "dal" }, { text: "millet chikki", type: "chikki" }]
        }
    }
];

// Dish Icon Image Generator using user uploaded images (rice.png, dal.png, curry.png, banana.png, pickle.png, pulhora.png, curd.png, chiki.png)
function getFoodIconHtml(item) {
    let type = typeof item === 'string' ? item : (item?.type || '');
    let text = typeof item === 'object' && item?.text ? item.text.toLowerCase() : '';

    let imgSrc = '../images/rice.png';
    let altText = 'Dish';

    // 1. Chikki
    if (type === 'chikki' || text.includes('chikki')) {
        imgSrc = '../images/chiki.png';
        altText = 'Chikki';
    } 
    // 2. Curd
    else if (type === 'curd' || text.includes('curd')) {
        imgSrc = '../images/curd.png';
        altText = 'Curd';
    } 
    // 3. Banana
    else if (type === 'banana' || text.includes('banana')) {
        imgSrc = '../images/banana.png';
        altText = 'Banana';
    } 
    // 4. Pickle / Chutney
    else if (type === 'pickle' || type === 'chutney' || text.includes('pickle') || text.includes('chutney')) {
        imgSrc = '../images/pickle.png';
        altText = 'Pickle';
    } 
    // 5. Pulhora / Tamarind Rice
    else if (type === 'pulhora' || text.includes('pulhora') || text.includes('tamarind')) {
        imgSrc = '../images/pulhora.png';
        altText = 'Pulhora';
    } 
    // 6. Dal & Sambar dishes (Dal, Dhal, Sambar, Pappu, Dalcha, Rasam)
    else if (text.includes('dal') || text.includes('dhal') || text.includes('sambar') || text.includes('pappu') || text.includes('dalcha') || text.includes('rasam') || type === 'dal' || type === 'sambar') {
        imgSrc = '../images/dal.png';
        altText = 'Dal';
    } 
    // 7. Curry dishes (Curry, Kurma, Masala, Sabji, Gourd, Paneer, Aloo, Peas, Salan, Kulasi, Chana, Soya, Maker, Tango, Ketchup, Ridge)
    else if (text.includes('curry') || text.includes('kurma') || text.includes('masala') || text.includes('sabji') || text.includes('gourd') || text.includes('paneer') || text.includes('aloo') || text.includes('peas') || text.includes('salan') || text.includes('kulasi') || text.includes('chana') || text.includes('soya') || text.includes('maker') || text.includes('tango') || text.includes('ketchup') || text.includes('ridge') || type === 'curry') {
        imgSrc = '../images/curry.png';
        altText = 'Curry';
    } 
    // 8. Rice dishes (White, Jeera, Bagara, Khichdi, Biryani, Rice)
    else if (type === 'rice' || text.includes('rice') || text.includes('biryani') || text.includes('khichdi')) {
        imgSrc = '../images/rice.png';
        altText = 'Rice';
    } 
    // 9. Sweet / Pongal / Kesari
    else if (type === 'sweet' || text.includes('pongal') || text.includes('kesari') || text.includes('sweet')) {
        imgSrc = '../images/pulhora.png';
        altText = 'Sweet';
    } 
    else {
        imgSrc = '../images/rice.png';
        altText = 'Dish';
    }

    return `<img src="${imgSrc}" alt="${altText}" class="food-icon-img">`;
}

// Application State Management
let appState = {
    checkedItems: {},
    touchedKitchenDays: {}, // Tracks kitchen-day keys modified by user, e.g. '1-mon': true
    dates: {
        mon: '', tue: '', wed: '', thu: '', fri: '', sat: ''
    },
    weekLabel: '',
    currentMondayStr: ''
};

// Helper to format local date as YYYY-MM-DD without UTC timezone shift
function formatLocalYmd(dateObj) {
    const y = dateObj.getFullYear();
    const m = String(dateObj.getMonth() + 1).padStart(2, '0');
    const d = String(dateObj.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}

// Calculate Monday of the current active week.
// If today is Sunday, it automatically rolls over to the coming Monday (+1 day)
function getWeekMonday(dateObj = new Date()) {
    const d = new Date(dateObj);
    const day = d.getDay(); // 0 is Sun, 1 is Mon...
    const diff = (day === 0 ? 1 : 1 - day);
    const monday = new Date(d);
    monday.setDate(d.getDate() + diff);
    return monday;
}

document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    loadLocalState();
    initCurrentWeekDisplay(); // Checks week rollover & clears checkboxes if new week started!
    initEventListeners();
    checkNotionConfigStatus();
}

// Render 8 Center Rows into Table Body
function renderChecklistTable() {
    const tbody = document.getElementById('checklist-tbody');
    if (!tbody) return;

    let html = '';
    const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

    CENTERS_DATA.forEach(center => {
        html += `<tr>`;
        
        // S. No. Column
        html += `<td class="row-sno">${center.id}</td>`;

        // Center Column
        html += `<td>
            <div class="center-cell-content">
                <img src="${center.iconImg}" alt="${center.name} Logo" class="center-icon-img">
                <div class="center-name">${center.name}</div>
            </div>
        </td>`;

        // Day Columns (Mon-Sat)
        days.forEach(day => {
            const items = center.menu[day] || [];
            html += `<td><div class="cell-items-list">`;
            
            items.forEach((item, idx) => {
                const itemKey = `${center.id}-${day}-${idx}`;
                const isChecked = appState.checkedItems[itemKey] ? 'checked' : '';

                html += `
                    <div class="item-row ${isChecked}" data-key="${itemKey}">
                        <div class="custom-checkbox"></div>
                        <span class="item-text">${item.text}</span>
                        ${getFoodIconHtml(item)}
                    </div>
                `;
            });

            html += `</div></td>`;
        });

        html += `</tr>`;
    });

    tbody.innerHTML = html;
    attachCheckboxClickHandlers();
}

// Attach click listeners to item rows
function attachCheckboxClickHandlers() {
    document.querySelectorAll('.item-row').forEach(row => {
        row.addEventListener('click', (e) => {
            const key = row.getAttribute('data-key'); // Format: centerId-day-idx
            const parts = key.split('-');
            const kitchenDayKey = `${parts[0]}-${parts[1]}`;

            const isCurrentlyChecked = row.classList.contains('checked');

            if (isCurrentlyChecked) {
                row.classList.remove('checked');
                delete appState.checkedItems[key];
            } else {
                row.classList.add('checked');
                appState.checkedItems[key] = true;
            }

            // Mark this kitchen-day as modified by user (so check & uncheck both update Notion!)
            if (!appState.touchedKitchenDays) appState.touchedKitchenDays = {};
            appState.touchedKitchenDays[kitchenDayKey] = true;

            saveLocalState();
        });
    });
}

// Build kitchen-day summary rows in format: KitchenName-DD-MM-YYYY-DayName
// If onlyModified is true, ONLY includes kitchen-day rows where user checked items OR modified/unchecked items!
function getKitchenDaySummary(onlyModified = true) {
    const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    const dayNames = { mon: 'Monday', tue: 'Tuesday', wed: 'Wednesday', thu: 'Thursday', fri: 'Friday', sat: 'Saturday' };

    const summary = [];

    days.forEach(day => {
        const dayName = dayNames[day];
        const dateStr = appState.dates[day] || '';
        const cleanDateStr = dateStr.replace(/\//g, '-');

        CENTERS_DATA.forEach(center => {
            const kitchenDayKey = `${center.id}-${day}`;
            const items = center.menu[day] || [];
            const checkedDishes = [];
            const uncheckedDishes = [];

            items.forEach((item, idx) => {
                const key = `${center.id}-${day}-${idx}`;
                if (appState.checkedItems[key]) {
                    checkedDishes.push(item.text);
                } else {
                    uncheckedDishes.push(item.text);
                }
            });

            // Format: KitchenName-DD-MM-YYYY-DayName (e.g. NELLORE-13-08-2026-Thursday)
            const rowTitle = `${center.name}-${cleanDateStr || 'Date'}-${dayName}`;
            const isTouched = appState.touchedKitchenDays && appState.touchedKitchenDays[kitchenDayKey];
            const hasChecked = checkedDishes.length > 0;

            // Include if not filtering, OR if user checked items, OR if user modified/unchecked items!
            if (!onlyModified || hasChecked || isTouched) {
                summary.push({
                    centerId: center.id,
                    centerName: center.name,
                    dayKey: day,
                    dayName: dayName,
                    date: dateStr,
                    rowTitle: rowTitle,
                    checkedCount: checkedDishes.length,
                    checkedText: checkedDishes.length > 0 ? checkedDishes.join(', ') : 'None',
                    uncheckedText: uncheckedDishes.length > 0 ? uncheckedDishes.join(', ') : 'None'
                });
            }
        });
    });

    return summary;
}

// Current 1-Week Display Logic (auto-rolls over to next Monday after Saturday completes)
function initCurrentWeekDisplay() {
    const picker = document.getElementById('week-date-picker');
    
    // Calculate active Monday for current week
    const activeMonday = getWeekMonday(new Date());
    const formattedMonStr = formatLocalYmd(activeMonday);
    if (picker) picker.value = formattedMonStr;

    updateDayDates(activeMonday);
}

function updateDayDates(mondayDate) {
    const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    const dateInputs = {
        mon: document.getElementById('date-mon'),
        tue: document.getElementById('date-tue'),
        wed: document.getElementById('date-wed'),
        thu: document.getElementById('date-thu'),
        fri: document.getElementById('date-fri'),
        sat: document.getElementById('date-sat')
    };

    let mondayStr = '';
    let saturdayStr = '';

    const newMondayYmd = formatLocalYmd(mondayDate);

    // Reset checkboxes completely if a new week has started!
    if (!appState.currentMondayStr || appState.currentMondayStr !== newMondayYmd) {
        appState.checkedItems = {};
        appState.touchedKitchenDays = {};
        appState.currentMondayStr = newMondayYmd;
        saveLocalState();
    }

    days.forEach((day, index) => {
        const d = new Date(mondayDate);
        d.setDate(mondayDate.getDate() + index);

        const dd = String(d.getDate()).padStart(2, '0');
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const yyyy = d.getFullYear();
        const formatted = `${dd}/${mm}/${yyyy}`;

        if (index === 0) mondayStr = `${dd}/${mm}`;
        if (index === 5) saturdayStr = `${dd}/${mm}/${yyyy}`;

        if (dateInputs[day]) {
            dateInputs[day].value = formatted;
            appState.dates[day] = formatted;
        }
    });

    appState.weekLabel = `Week (${mondayStr} - ${saturdayStr})`;
    renderChecklistTable();
}

// LocalStorage Helper
function saveLocalState() {
    localStorage.setItem('akshaya_patra_checklist_state', JSON.stringify(appState));
}

function loadLocalState() {
    const saved = localStorage.getItem('akshaya_patra_checklist_state');
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            if (parsed.checkedItems) appState.checkedItems = parsed.checkedItems;
            if (parsed.touchedKitchenDays) appState.touchedKitchenDays = parsed.touchedKitchenDays;
            if (parsed.dates) appState.dates = parsed.dates;
            if (parsed.currentMondayStr) appState.currentMondayStr = parsed.currentMondayStr;
        } catch (e) {
            console.error("Error parsing local state", e);
        }
    }
}

// Event Listeners for Buttons & Modals
function initEventListeners() {
    document.getElementById('btn-print').addEventListener('click', () => {
        window.print();
    });

    const modal = document.getElementById('notion-modal');
    document.getElementById('btn-notion-settings').addEventListener('click', () => {
        modal.classList.add('active');
        document.getElementById('input-notion-key').value = localStorage.getItem('notion_api_key') || '';
        document.getElementById('input-database-id').value = localStorage.getItem('notion_db_id') || '';
    });

    document.getElementById('modal-close-btn').addEventListener('click', () => {
        modal.classList.remove('active');
    });

    document.getElementById('btn-save-notion-config').addEventListener('click', () => {
        const key = document.getElementById('input-notion-key').value.trim();
        const dbId = document.getElementById('input-database-id').value.trim();
        localStorage.setItem('notion_api_key', key);
        localStorage.setItem('notion_db_id', dbId);
        modal.classList.remove('active');
        checkNotionConfigStatus();
    });

    document.getElementById('btn-test-notion').addEventListener('click', async () => {
        const key = document.getElementById('input-notion-key').value.trim();
        const dbId = document.getElementById('input-database-id').value.trim();
        const msgDiv = document.getElementById('modal-msg');
        
        msgDiv.style.display = 'block';
        msgDiv.style.color = '#3b82f6';
        msgDiv.textContent = 'Testing connection...';

        try {
            const res = await fetch('/api/notion/test-connection', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ notionKey: key, databaseId: dbId })
            });
            const data = await res.json();
            if (data.success) {
                msgDiv.style.color = '#16a34a';
                msgDiv.textContent = `✓ Success! Connected to: "${data.title}"`;
            } else {
                msgDiv.style.color = '#dc2626';
                msgDiv.textContent = `❌ Connection failed: ${data.error}`;
            }
        } catch (e) {
            msgDiv.style.color = '#dc2626';
            msgDiv.textContent = `❌ Network Error: ${e.message}`;
        }
    });

    // Explicit Manual Save to Notion ONLY when user clicks button!
    document.getElementById('btn-save-notion').addEventListener('click', () => {
        saveToNotion(true);
    });
}

function checkNotionConfigStatus() {
    const key = localStorage.getItem('notion_api_key');
    const dbId = localStorage.getItem('notion_db_id');
    const badge = document.getElementById('notion-status-badge');

    if (key && dbId) {
        badge.className = 'status-badge status-saved';
        badge.innerHTML = '⚡ Notion: Ready';
    } else {
        badge.className = 'status-badge status-offline';
        badge.innerHTML = '⚡ Notion: Unconfigured';
    }
}

// Manual Save to Notion (saves ONLY modified/checked kitchen days for lightning fast <200ms updates)
async function saveToNotion(isManual = true) {
    const key = localStorage.getItem('notion_api_key');
    const dbId = localStorage.getItem('notion_db_id');
    const badge = document.getElementById('notion-status-badge');

    if (!key || !dbId) {
        alert('Please configure Notion API Key and Database ID in Settings first!');
        document.getElementById('notion-modal').classList.add('active');
        return;
    }

    // Fast, targeted save: send ONLY modified or checked kitchen days!
    const modifiedKitchenDays = getKitchenDaySummary(true);

    if (modifiedKitchenDays.length === 0) {
        badge.className = 'status-badge status-offline';
        badge.innerHTML = '⚡ Notion: Ready';
        alert('No kitchen checklist changes found! Please check or uncheck dishes to save to Notion.');
        return;
    }

    badge.className = 'status-badge status-saving';
    badge.innerHTML = `💾 Saving...`;

    try {
        const response = await fetch('/api/notion/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                notionKey: key,
                databaseId: dbId,
                weekLabel: appState.weekLabel || 'Current Week Checklist',
                dateRange: `${appState.dates.mon} to ${appState.dates.sat}`,
                stateData: appState,
                kitchenDaySummary: modifiedKitchenDays
            })
        });

        const resData = await response.json();
        if (resData.success) {
            badge.className = 'status-badge status-saved';
            badge.innerHTML = '✓ Saved to Notion';
            alert(`Successfully updated kitchen in Notion!`);
        } else {
            badge.className = 'status-badge status-offline';
            badge.innerHTML = '❌ Notion Error';
            alert(`Error saving to Notion: ${resData.error}`);
        }
    } catch (err) {
        badge.className = 'status-badge status-offline';
        badge.innerHTML = '❌ Network Error';
        console.error("Save to Notion failed:", err);
    }
}
