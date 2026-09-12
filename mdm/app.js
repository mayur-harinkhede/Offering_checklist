// Akshaya Patra Daily Menu Offering Checklist (MDM) - Application Logic

const CENTERS_DATA = [
    {
        id: 1,
        name: "NELLORE",
        iconImg: "/images/center_1.png",
        menu: {
            mon: [{ text: "White rice", type: "rice" }, { text: "Veg Sambar", type: "dal" }],
            tue: [{ text: "Pulhora", type: "pulhora" }, { text: "Dondakaya Chutney", type: "chutney" }, { text: "Banana", type: "fruit" }],
            wed: [{ text: "White rice", type: "rice" }, { text: "Veg Sambar", type: "dal" }, { text: "Veg - curry", type: "curry" }],
            thu: [{ text: "Vegetable rice", type: "rice" }, { text: "Aaloo Kurma", type: "curry" }, { text: "Curd", type: "curd" }],
            fri: [{ text: "White rice", type: "rice" }, { text: "Leafy dal", type: "dal" }, { text: "Curry (with out egg)", type: "curry" }, { text: "Pickle", type: "pickle" }],
            sat: [{ text: "White rice", type: "rice" }, { text: "Pappu charu", type: "dal" }, { text: "Sweet Pongal", type: "sweet" }]
        }
    },
    {
        id: 2,
        name: "KALYANADURGAM",
        iconImg: "/images/center_2.png",
        menu: {
            mon: [{ text: "White rice", type: "rice" }, { text: "Veg Sambar", type: "dal" }, { text: "Veg- curry", type: "curry" }],
            tue: [{ text: "Pulhora", type: "pulhora" }, { text: "Groundnut Chutney", type: "chutney" }, { text: "Banana", type: "fruit" }],
            wed: [{ text: "White rice", type: "rice" }, { text: "Veg Sambar", type: "dal" }],
            thu: [{ text: "Vegetable rice", type: "rice" }, { text: "Aaloo Kurma", type: "curry" }, { text: "Curd", type: "curd" }],
            fri: [{ text: "White rice", type: "rice" }, { text: "Leafy dal", type: "dal" }, { text: "Pickle", type: "pickle" }],
            sat: [{ text: "White rice", type: "rice" }, { text: "Pappu charu", type: "dal" }, { text: "Sweet Pongal", type: "sweet" }]
        }
    },
    {
        id: 3,
        name: "KUPPAM",
        iconImg: "/images/center_3.png",
        menu: {
            mon: [{ text: "White Rice", type: "rice" }, { text: "Mix Veg Curry", type: "curry" }, { text: "Tomato Pappu Charu", type: "dal" }],
            tue: [{ text: "Tamarind Rice", type: "pulhora" }, { text: "Groundnut Chutney", type: "chutney" }, { text: "Banana", type: "fruit" }],
            wed: [{ text: "White Rice", type: "rice" }, { text: "Mix Veg Sambar", type: "dal" }, { text: "Pickle", type: "pickle" }],
            thu: [{ text: "Vegetable Rice", type: "rice" }, { text: "Salan", type: "curry" }, { text: "Curd", type: "curd" }],
            fri: [{ text: "White Rice", type: "rice" }, { text: "Leaf Dhal", type: "dal" }, { text: "Pickle", type: "pickle" }],
            sat: [{ text: "White Rice", type: "rice" }, { text: "Pappu Charu", type: "dal" }, { text: "Sweet Pongal", type: "sweet" }]
        }
    },
    {
        id: 4,
        name: "WARANGAL",
        iconImg: "/images/center_4.png",
        menu: {
            mon: [{ text: "Jeera Rice", type: "rice" }, { text: "Mix Veg Green", type: "curry" }, { text: "Peas Curry", type: "curry" }, { text: "Rava Kesari", type: "sweet" }],
            tue: [{ text: "White Rice", type: "rice" }, { text: "Mix Veg Chana", type: "curry" }, { text: "Dhal Curry", type: "dal" }, { text: "Mix Veg Sambar", type: "dal" }, { text: "Pickle", type: "pickle" }],
            wed: [{ text: "White Rice", type: "rice" }, { text: "Mix Veg Curry Sabji", type: "curry" }, { text: "Leaf Dhal", type: "dal" }, { text: "Chikki", type: "chiki" }],
            thu: [{ text: "Vegetable Biryani", type: "rice" }, { text: "Mix Veg Kulasi", type: "curry" }, { text: "Chana Curry", type: "curry" }, { text: "Curd", type: "curd" }],
            fri: [{ text: "White Rice", type: "rice" }, { text: "Mix Veg Curry Sabji", type: "curry" }, { text: "Mix Veg Sambar", type: "dal" }, { text: "Chikki", type: "chiki" }],
            sat: [{ text: "White Rice", type: "rice" }, { text: "Mix Veg Green", type: "curry" }, { text: "Peas Curry", type: "curry" }, { text: "Leaf Dhal", type: "dal" }, { text: "Sweet Pongal", type: "sweet" }]
        }
    },
    {
        id: 5,
        name: "NARSINGI",
        iconImg: "/images/center_5.png",
        menu: {
            mon: [{ text: "Khichdi", type: "rice" }, { text: "Aloo Meal Maker Curry", type: "curry" }, { text: "Majjiga Pulusu / Chutney / Pickle", type: "pickle" }],
            tue: [{ text: "White Rice", type: "rice" }, { text: "Veg Sambar", type: "dal" }, { text: "Paneer Green", type: "curry" }, { text: "Peas Masala", type: "curry" }, { text: "Sweet Pongal", type: "sweet" }],
            wed: [{ text: "White Rice", type: "rice" }, { text: "Leaf Dal", type: "dal" }, { text: "Bottle Gourd", type: "curry" }, { text: "Moong Dal Curry", type: "curry" }, { text: "Chikki", type: "chiki" }],
            thu: [{ text: "Veg Biryani", type: "rice" }, { text: "Aloo Green", type: "curry" }, { text: "Peas Curry", type: "curry" }, { text: "Curd", type: "curd" }],
            fri: [{ text: "White Rice", type: "rice" }, { text: "Veg Sambar", type: "dal" }, { text: "Tomato Uabla Curry", type: "curry" }, { text: "Chikki / Rava Kesari", type: "chiki" }],
            sat: [{ text: "White Rice", type: "rice" }, { text: "Leaf Dal", type: "dal" }, { text: "Paneer Masala with Matar", type: "curry" }, { text: "Rava Kesari / Rasam", type: "sweet" }]
        }
    },
    {
        id: 6,
        name: "ONGOLE",
        iconImg: "/images/center_6.png",
        menu: {
            mon: [{ text: "White Rice", type: "rice" }, { text: "Dosakaya Pappu", type: "dal" }, { text: "Sweet Pongal", type: "sweet" }],
            tue: [{ text: "Pulhora", type: "pulhora" }, { text: "Tomato Pappu", type: "dal" }],
            wed: [{ text: "White Rice", type: "rice" }, { text: "Leaf & Dal", type: "dal" }, { text: "Boiled Chana", type: "curry" }],
            thu: [{ text: "White Rice", type: "rice" }, { text: "Sambar with Vegetables", type: "dal" }, { text: "Green Leafy Vegetable Curry", type: "curry" }, { text: "Sweet Pongal", type: "sweet" }],
            fri: [{ text: "White Rice", type: "rice" }, { text: "Sorakaya Pappu / Beerakaya Pappu / Green Leafy Vegetable Curry", type: "curry" }, { text: "Sweet Pongal", type: "sweet" }],
            sat: [{ text: "Vegetable Rice", type: "rice" }, { text: "Sambar with Vegetables", type: "dal" }, { text: "Green Leafy Vegetable Curry", type: "curry" }, { text: "Curd", type: "curd" }]
        }
    },
    {
        id: 7,
        name: "NAWABPETA",
        iconImg: "/images/center_7.png",
        menu: {
            mon: [{ text: "Special Rice", type: "rice" }, { text: "Mix Veg Curry-500", type: "curry" }, { text: "Sweet Pongal / Curd", type: "sweet" }],
            tue: [{ text: "White Rice", type: "rice" }, { text: "Veg Sambar", type: "dal" }, { text: "Mix Veg Curry-500", type: "curry" }, { text: "Pickle", type: "pickle" }],
            wed: [{ text: "White Rice", type: "rice" }, { text: "Leaf Dal / Veg Dal", type: "dal" }, { text: "Mix Veg Curry-500", type: "curry" }, { text: "Chikki", type: "chiki" }],
            thu: [{ text: "Special Rice", type: "rice" }, { text: "Mix Veg Curry-500", type: "curry" }, { text: "Curd", type: "curd" }],
            fri: [{ text: "White Rice", type: "rice" }, { text: "Veg Sambar", type: "dal" }, { text: "Mix Veg Curry-500", type: "curry" }, { text: "Pickle / Rava Kesari", type: "pickle" }],
            sat: [{ text: "Rice", type: "rice" }, { text: "Veg Sambar", type: "dal" }, { text: "Leaf Dal / Veg Dal", type: "dal" }, { text: "Mix Veg Curry-500", type: "curry" }, { text: "Pickle", type: "pickle" }]
        }
    },
    {
        id: 8,
        name: "KANDHI",
        iconImg: "/images/center_8.png",
        menu: {
            mon: [{ text: "Bagara Rice", type: "rice" }, { text: "Mix Veg Dalcha", type: "curry" }, { text: "Sweet Rice", type: "sweet" }, { text: "Pickle (mango)", type: "pickle" }],
            tue: [{ text: "Rice", type: "rice" }, { text: "Mix Veg Sambar", type: "dal" }, { text: "Soya Chunks Mini", type: "curry" }, { text: "Meal Maker Curry", type: "curry" }, { text: "Tomato Tango Masala", type: "curry" }],
            wed: [{ text: "Rice", type: "rice" }, { text: "Leaf Dal - 1200/tomato pappu", type: "dal" }, { text: "Mix Veg Curry (Mix Veg Dal)", type: "curry" }, { text: "Tomato Tango Masala", type: "curry" }],
            thu: [{ text: "Veg Biryani", type: "rice" }, { text: "South Indi Mix Veg Curry", type: "curry" }, { text: "Curd", type: "curd" }, { text: "Tomato Ketchup masala", type: "curry" }],
            fri: [{ text: "Rice", type: "rice" }, { text: "Mix Veg Sambar", type: "dal" }, { text: "Mix Veg Curry", type: "curry" }, { text: "(Mix veg paneer curry)", type: "curry" }, { text: "Tomato Ketchup masala", type: "curry" }],
            sat: [{ text: "Rice", type: "rice" }, { text: "Leaf Dal - 1200/tomato pappu", type: "dal" }, { text: "Ridge Gourd", type: "curry" }, { text: "Moongdal Curry", type: "curry" }, { text: "millet chikki", type: "chiki" }]
        }
    }
];

function getFoodIconHtml(item) {
    let imgSrc = '/images/rice.png';
    let altText = 'Food';
    const text = (item.text || '').toLowerCase();
    const type = (item.type || '').toLowerCase();

    if (type === 'fruit' || text.includes('banana')) {
        imgSrc = '/images/banana.png';
        altText = 'Banana';
    } 
    else if (type === 'chiki' || text.includes('chikki') || text.includes('chiki')) {
        imgSrc = '/images/chiki.png';
        altText = 'Chikki';
    } 
    else if (type === 'curd' || text.includes('curd')) {
        imgSrc = '/images/curd.png';
        altText = 'Curd';
    } 
    else if (type === 'pickle' || text.includes('pickle') || text.includes('chutney')) {
        imgSrc = '/images/pickle.png';
        altText = 'Pickle';
    } 
    else if (type === 'pulhora' || text.includes('pulhora') || text.includes('tamarind')) {
        imgSrc = '/images/pulhora.png';
        altText = 'Pulhora';
    } 
    else if (type === 'dal' || text.includes('dal') || text.includes('sambar') || text.includes('pappu') || text.includes('charu') || text.includes('dhal') || text.includes('dalcha') || text.includes('rasam')) {
        imgSrc = '/images/dal.png';
        altText = 'Dal';
    } 
    else if (text.includes('curry') || text.includes('kurma') || text.includes('masala') || text.includes('sabji') || text.includes('gourd') || text.includes('paneer') || text.includes('aloo') || text.includes('peas') || text.includes('salan') || text.includes('kulasi') || text.includes('chana') || text.includes('soya') || text.includes('maker') || text.includes('tango') || text.includes('ketchup') || text.includes('ridge') || type === 'curry') {
        imgSrc = '/images/curry.png';
        altText = 'Curry';
    } 
    else if (type === 'rice' || text.includes('rice') || text.includes('biryani') || text.includes('khichdi')) {
        imgSrc = '/images/rice.png';
        altText = 'Rice';
    } 
    else if (type === 'sweet' || text.includes('pongal') || text.includes('kesari') || text.includes('sweet')) {
        imgSrc = '/images/pulhora.png';
        altText = 'Sweet';
    } 
    else {
        imgSrc = '/images/rice.png';
        altText = 'Dish';
    }

    return `<img src="${imgSrc}" alt="${altText}" class="food-icon-img">`;
}

// Application State Management
let appState = {
    checkedItems: {},
    allWeeksChecked: {},
    dates: { mon: '', tue: '', wed: '', thu: '', fri: '', sat: '' },
    weekLabel: '',
    currentMondayStr: ''
};

// Auto-Save Notion Debounce Timer
let autoSaveNotionTimer = null;

document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    loadLocalState();
    initCurrentWeekDisplay();
    initEventListeners();
    checkNotionConfigStatus();
}

function renderChecklistTable() {
    const tbody = document.getElementById('checklist-tbody');
    if (!tbody) return;

    let html = '';
    const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

    CENTERS_DATA.forEach(center => {
        html += `<tr>`;
        html += `<td class="row-sno">${center.id}</td>`;
        html += `<td>
            <div class="center-cell-content">
                <img src="${center.iconImg}" alt="${center.name} Logo" class="center-icon-img" onerror="this.style.display='none'">
                <div class="center-name">${center.name}</div>
            </div>
        </td>`;

        days.forEach(day => {
            const items = center.menu[day] || [];
            html += `<td><div class="cell-items-list">`;
            
            items.forEach((item, idx) => {
                const itemKey = `${center.id}-${day}-${idx}`;
                const isChecked = Boolean(appState.checkedItems && appState.checkedItems[itemKey]) ? 'checked' : '';

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
}

// Trigger Auto-Save to Notion with 1.5s Debounce
function triggerAutoSaveToNotion() {
    if (autoSaveNotionTimer) clearTimeout(autoSaveNotionTimer);

    autoSaveNotionTimer = setTimeout(() => {
        handleSaveToNotion({ isAutoSave: true });
    }, 1500);
}

function formatLocalYmd(dateObj) {
    const y = dateObj.getFullYear();
    const m = String(dateObj.getMonth() + 1).padStart(2, '0');
    const d = String(dateObj.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}

function getWeekMonday(dateObj = new Date()) {
    const d = new Date(dateObj);
    const day = d.getDay();
    const diff = (day === 0 ? -6 : 1 - day);
    const monday = new Date(d);
    monday.setDate(d.getDate() + diff);
    monday.setHours(0, 0, 0, 0);
    return monday;
}

function initCurrentWeekDisplay() {
    const picker = document.getElementById('week-date-picker');
    let activeMonday = null;

    if (appState.currentMondayStr) {
        const parts = appState.currentMondayStr.split('-');
        if (parts.length === 3) {
            activeMonday = getWeekMonday(new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10)));
        }
    }
    if (!activeMonday) {
        if (picker && picker.value) {
            const parts = picker.value.split('-');
            if (parts.length === 3) {
                activeMonday = getWeekMonday(new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10)));
            }
        }
    }
    if (!activeMonday) {
        activeMonday = getWeekMonday(new Date());
    }

    if (picker) {
        picker.value = formatLocalYmd(activeMonday);
    }

    updateDayDates(activeMonday, false);
}

function updateDayDates(mondayDate, isUserChange = false) {
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

    if (!appState.allWeeksChecked) appState.allWeeksChecked = {};

    // If user explicitly changed the week, save current week's checks first
    if (isUserChange && appState.currentMondayStr && appState.currentMondayStr !== newMondayYmd) {
        appState.allWeeksChecked[appState.currentMondayStr] = { ...(appState.checkedItems || {}) };
    }

    appState.currentMondayStr = newMondayYmd;

    // Restore checks for this week without wiping
    if (appState.allWeeksChecked[newMondayYmd]) {
        appState.checkedItems = { ...appState.allWeeksChecked[newMondayYmd] };
    } else if (appState.checkedItems && Object.keys(appState.checkedItems).length > 0 && !isUserChange) {
        appState.allWeeksChecked[newMondayYmd] = { ...appState.checkedItems };
    } else {
        appState.checkedItems = {};
        appState.allWeeksChecked[newMondayYmd] = {};
    }

    days.forEach((day, index) => {
        const d = new Date(mondayDate.getFullYear(), mondayDate.getMonth(), mondayDate.getDate() + index);
        const dd = String(d.getDate()).padStart(2, '0');
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const yyyy = d.getFullYear();
        const formatted = `${dd}/${mm}/${yyyy}`;

        if (index === 0) mondayStr = `${dd}/${mm}`;
        if (index === 5) saturdayStr = `${dd}/${mm}/${yyyy}`;

        if (dateInputs[day]) {
            dateInputs[day].value = formatted;
        }
        appState.dates[day] = formatted;
    });

    appState.weekLabel = `Week (${mondayStr} - ${saturdayStr})`;
    renderChecklistTable();
    saveLocalState();
}

function initEventListeners() {
    const btnPrint = document.getElementById('btn-print');
    if (btnPrint) btnPrint.addEventListener('click', () => window.print());

    const picker = document.getElementById('week-date-picker');
    if (picker) {
        picker.addEventListener('change', (e) => {
            if (e.target.value) {
                const parts = e.target.value.split('-');
                if (parts.length === 3) {
                    const selectedMon = getWeekMonday(new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10)));
                    updateDayDates(selectedMon, true);
                    saveLocalState();
                    triggerAutoSaveToNotion();
                }
            }
        });
    }

    const btnSettings = document.getElementById('btn-notion-settings');
    const modal = document.getElementById('notion-modal');
    const btnModalClose = document.getElementById('modal-close-btn');

    if (btnSettings && modal) {
        btnSettings.addEventListener('click', () => {
            modal.classList.add('active');
            populateNotionModalInputs();
        });
    }
    if (btnModalClose && modal) btnModalClose.addEventListener('click', () => modal.classList.remove('active'));

    const btnTest = document.getElementById('btn-test-notion');
    if (btnTest) btnTest.addEventListener('click', handleNotionTest);

    const btnSaveConfig = document.getElementById('btn-save-notion-config');
    if (btnSaveConfig) btnSaveConfig.addEventListener('click', handleNotionSaveConfig);

    const btnSaveNotion = document.getElementById('btn-save-notion');
    if (btnSaveNotion) btnSaveNotion.addEventListener('click', () => handleSaveToNotion({ isAutoSave: false }));

    const switcher = document.getElementById('program-switcher');
    if (switcher) {
        switcher.addEventListener('change', (e) => {
            if (e.target.value) window.location.href = e.target.value;
        });
    }

    // Event Delegation for Table Row Checkbox Clicking
    const tbody = document.getElementById('checklist-tbody');
    if (tbody) {
        tbody.addEventListener('click', (e) => {
            const row = e.target.closest('.item-row');
            if (!row) return;

            const key = row.getAttribute('data-key');
            if (!key) return;

            if (!appState.checkedItems) appState.checkedItems = {};
            if (!appState.allWeeksChecked) appState.allWeeksChecked = {};

            const isCurrentlyChecked = Boolean(appState.checkedItems[key]);

            if (isCurrentlyChecked) {
                row.classList.remove('checked');
                delete appState.checkedItems[key];
            } else {
                row.classList.add('checked');
                appState.checkedItems[key] = true;
            }

            if (appState.currentMondayStr) {
                appState.allWeeksChecked[appState.currentMondayStr] = { ...appState.checkedItems };
            }

            saveLocalState();
            triggerAutoSaveToNotion();
        });
    }
}

function saveLocalState() {
    try {
        localStorage.setItem('akshaya_patra_mdm_state', JSON.stringify(appState));
    } catch (e) {}

    fetch('/api/save-state', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stateData: { mdm: appState } })
    }).catch(err => console.log('Save draft note:', err.message));
}

function loadLocalState() {
    try {
        const saved = localStorage.getItem('akshaya_patra_mdm_state');
        if (saved) {
            const parsed = JSON.parse(saved);
            if (parsed.allWeeksChecked && typeof parsed.allWeeksChecked === 'object') {
                appState.allWeeksChecked = parsed.allWeeksChecked;
            }
            if (parsed.checkedItems && typeof parsed.checkedItems === 'object') {
                appState.checkedItems = parsed.checkedItems;
            }
            if (parsed.dates) appState.dates = parsed.dates;
            if (parsed.currentMondayStr) appState.currentMondayStr = parsed.currentMondayStr;

            if (appState.currentMondayStr && appState.allWeeksChecked && appState.allWeeksChecked[appState.currentMondayStr]) {
                appState.checkedItems = { ...appState.allWeeksChecked[appState.currentMondayStr] };
            }
        }
    } catch (e) {}

    fetch('/api/load-state')
        .then(res => res.json())
        .then(res => {
            if (res.success && res.stateData) {
                const data = res.stateData.mdm || res.stateData;
                if (data.allWeeksChecked && Object.keys(data.allWeeksChecked).length > 0) {
                    appState.allWeeksChecked = { ...(data.allWeeksChecked || {}), ...(appState.allWeeksChecked || {}) };
                }
                if (appState.currentMondayStr && appState.allWeeksChecked && appState.allWeeksChecked[appState.currentMondayStr]) {
                    appState.checkedItems = { ...appState.allWeeksChecked[appState.currentMondayStr] };
                } else if (data.checkedItems && Object.keys(data.checkedItems).length > 0 && Object.keys(appState.checkedItems || {}).length === 0) {
                    appState.checkedItems = data.checkedItems;
                }
                renderChecklistTable();
            }
        })
        .catch(err => console.log('Load draft note:', err.message));
}

function checkNotionConfigStatus() {
    fetch('/api/notion/config?program=mdm')
        .then(res => res.json())
        .then(data => {
            const cfg = data.config || {};
            const key = cfg.notionKey || localStorage.getItem('notion_mdm_key');
            const dbId = cfg.databaseId || localStorage.getItem('notion_mdm_db');
            
            if (key) localStorage.setItem('notion_mdm_key', key);
            if (dbId) localStorage.setItem('notion_mdm_db', dbId);

            const badge = document.getElementById('notion-status-badge');
            if (badge) {
                if (key && dbId) {
                    badge.className = 'status-badge status-saved';
                    badge.innerHTML = '⚡ Notion: Connected';
                } else {
                    badge.className = 'status-badge status-offline';
                    badge.innerHTML = '⚡ Notion: Unconfigured';
                }
            }
        })
        .catch(() => {});
}

function populateNotionModalInputs() {
    const key = localStorage.getItem('notion_mdm_key') || '';
    const dbId = localStorage.getItem('notion_mdm_db') || '';
    const inputKey = document.getElementById('input-notion-key');
    const inputDb = document.getElementById('input-database-id');
    if (inputKey) inputKey.value = key;
    if (inputDb) inputDb.value = dbId;
}

function handleNotionSaveConfig() {
    const key = document.getElementById('input-notion-key').value.trim();
    const dbId = document.getElementById('input-database-id').value.trim();

    if (!key || !dbId) {
        showModalMsg('Both API Key and Database ID are required.', 'error');
        return;
    }

    localStorage.setItem('notion_mdm_key', key);
    localStorage.setItem('notion_mdm_db', dbId);

    fetch('/api/notion/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ program: 'mdm', notionKey: key, databaseId: dbId })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            showModalMsg('Saved permanently to server!', 'success');
            checkNotionConfigStatus();
            setTimeout(() => {
                const modal = document.getElementById('notion-modal');
                if (modal) modal.classList.remove('active');
            }, 1200);
        } else {
            showModalMsg(`Error: ${data.error}`, 'error');
        }
    })
    .catch(err => showModalMsg(`Failed to save: ${err.message}`, 'error'));
}

function handleNotionTest() {
    const key = document.getElementById('input-notion-key').value.trim();
    const dbId = document.getElementById('input-database-id').value.trim();

    if (!key || !dbId) {
        showModalMsg('Please enter Notion API Key and Database ID to test.', 'error');
        return;
    }

    showModalMsg('Testing connection to Notion...', 'info');

    fetch('/api/notion/test-connection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ program: 'mdm', notionKey: key, databaseId: dbId })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            showModalMsg(`Connected! ${data.title}`, 'success');
        } else {
            showModalMsg(`Error: ${data.error}`, 'error');
        }
    })
    .catch(err => showModalMsg(`Connection failed: ${err.message}`, 'error'));
}

function showModalMsg(msg, type) {
    const msgEl = document.getElementById('modal-msg');
    if (!msgEl) return;
    msgEl.style.display = 'block';
    msgEl.textContent = msg;
    if (type === 'error') {
        msgEl.style.background = '#fef2f2'; msgEl.style.color = '#991b1b'; msgEl.style.border = '1px solid #fecaca';
    } else if (type === 'success') {
        msgEl.style.background = '#f0fdf4'; msgEl.style.color = '#166534'; msgEl.style.border = '1px solid #bbf7d0';
    } else {
        msgEl.style.background = '#eff6ff'; msgEl.style.color = '#1e40af'; msgEl.style.border = '1px solid #bfdbfe';
    }
}

function getKitchenDaySummary() {
    const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    const dayNames = { mon: 'Monday', tue: 'Tuesday', wed: 'Wednesday', thu: 'Thursday', fri: 'Friday', sat: 'Saturday' };
    const summary = [];

    // Derive exact date per day dynamically from active Monday date
    const picker = document.getElementById('week-date-picker');
    let mondayDate = getWeekMonday(new Date());
    if (picker && picker.value) {
        const parts = picker.value.split('-');
        if (parts.length === 3) {
            mondayDate = getWeekMonday(new Date(parts[0], parts[1] - 1, parts[2]));
        }
    }

    days.forEach((day, index) => {
        const dayName = dayNames[day];
        
        // Exact date calculation for this specific day (Monday + index)
        const currentDayDate = new Date(mondayDate);
        currentDayDate.setDate(mondayDate.getDate() + index);

        const dd = String(currentDayDate.getDate()).padStart(2, '0');
        const mm = String(currentDayDate.getMonth() + 1).padStart(2, '0');
        const yyyy = currentDayDate.getFullYear();
        const dateStr = `${dd}/${mm}/${yyyy}`;

        CENTERS_DATA.forEach(center => {
            const items = center.menu[day] || [];
            const checkedDishes = [];
            const uncheckedDishes = [];

            items.forEach((item, idx) => {
                const key = `${center.id}-${day}-${idx}`;
                const textVal = typeof item === 'object' ? item.text : item;
                if (appState.checkedItems && Boolean(appState.checkedItems[key])) {
                    checkedDishes.push(textVal);
                } else {
                    uncheckedDishes.push(textVal);
                }
            });

            summary.push({
                centerId: center.id,
                kitchenName: center.name,
                weekday: dayName.toUpperCase(),
                date: dateStr,
                checkedText: checkedDishes.length > 0 ? checkedDishes.join(', ') : '',
                uncheckedText: uncheckedDishes.length > 0 ? uncheckedDishes.join(', ') : ''
            });
        });
    });

    return summary;
}

// Unified Save to Notion (Supports Manual Click + Silent Auto-Save)
function handleSaveToNotion(options = {}) {
    const isAutoSave = options && options.isAutoSave;
    const key = localStorage.getItem('notion_mdm_key');
    const dbId = localStorage.getItem('notion_mdm_db');

    const badge = document.getElementById('notion-status-badge');
    if (badge) {
        badge.className = 'status-badge status-saving';
        badge.innerHTML = '🔄 Notion: Syncing...';
    }

    const weekLabel = document.getElementById('week-date-picker') ? document.getElementById('week-date-picker').value : '';
    const kitchenDaySummary = getKitchenDaySummary();

    const btnSaveNotion = document.getElementById('btn-save-notion');
    if (!isAutoSave && btnSaveNotion) {
        btnSaveNotion.disabled = true;
        btnSaveNotion.innerHTML = '⏳ Saving...';
    }

    fetch('/api/notion/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            notionKey: key || undefined,
            databaseId: dbId || undefined,
            programType: 'mdm',
            weekLabel: weekLabel,
            stateData: appState,
            kitchenDaySummary: kitchenDaySummary
        })
    })
    .then(res => res.json())
    .then(data => {
        if (!isAutoSave && btnSaveNotion) {
            btnSaveNotion.disabled = false;
            btnSaveNotion.innerHTML = '💾 Save to Notion';
        }
        if (data.success) {
            if (badge) {
                badge.className = 'status-badge status-saved';
                badge.innerHTML = '✅ Notion: Synced';
                setTimeout(() => { badge.innerHTML = '⚡ Notion: Connected'; }, 3000);
            }
            if (!isAutoSave) {
                alert(`🎉 Success! ${data.message}`);
            }
        } else {
            if (badge) {
                badge.className = 'status-badge status-offline';
                badge.innerHTML = '⚡ Notion: Error';
            }
            if (!isAutoSave) alert(`❌ Notion Error: ${data.error}`);
        }
    })
    .catch(err => {
        if (!isAutoSave && btnSaveNotion) {
            btnSaveNotion.disabled = false;
            btnSaveNotion.innerHTML = '💾 Save to Notion';
        }
        if (badge) {
            badge.className = 'status-badge status-offline';
            badge.innerHTML = '⚡ Notion: Error';
        }
        if (!isAutoSave) alert(`❌ Request Failed: ${err.message}`);
    });
}
