// Akshaya Patra Daily Menu Offering Checklist (Breakfast) - Application Logic

const CENTERS_DATA = [
    {
        id: 1,
        name: "KANDI",
        iconImg: "/images/center_8.png",
        menu: {
            mon: [
                { text: "Upma", type: "upma" },
                { text: "Chutney", type: "chutney" },
                { text: "Millet Idly", type: "idly" },
                { text: "Sambar", type: "dal" },
                { text: "Dosa", type: "dosa" },
                { text: "Veg Chutney", type: "chutney" },
                { text: "Idly", type: "idly" },
                { text: "Sambar", type: "dal" },
                { text: "Poori", type: "poori" },
                { text: "Veg Kurma", type: "curry" },
                { text: "Bonda", type: "bonda" },
                { text: "Chutney", type: "chutney" },
                { text: "Milk", type: "curd" }
            ],
            tue: [
                { text: "Dosa", type: "dosa" },
                { text: "Veg Chutney", type: "chutney" },
                { text: "Poori", type: "poori" },
                { text: "Veg Kurma", type: "curry" },
                { text: "Millet Idly", type: "idly" },
                { text: "Sambar", type: "dal" },
                { text: "Upma", type: "upma" },
                { text: "Chutney", type: "chutney" },
                { text: "Idly", type: "idly" },
                { text: "Sambar", type: "dal" },
                { text: "Bonda", type: "bonda" },
                { text: "Chutney", type: "chutney" }
            ],
            wed: [
                { text: "Millet Idly", type: "idly" },
                { text: "Sambar", type: "dal" },
                { text: "Bonda", type: "bonda" },
                { text: "Chutney", type: "chutney" },
                { text: "Poori", type: "poori" },
                { text: "Veg Kurma", type: "curry" },
                { text: "Dosa", type: "dosa" },
                { text: "Veg Chutney", type: "chutney" },
                { text: "Idly", type: "idly" },
                { text: "Sambar", type: "dal" },
                { text: "Upma", type: "upma" },
                { text: "Chutney", type: "chutney" },
                { text: "Milk", type: "curd" }
            ],
            thu: [
                { text: "Poori", type: "poori" },
                { text: "Veg Kurma", type: "curry" },
                { text: "Idly", type: "idly" },
                { text: "Sambar", type: "dal" },
                { text: "Bonda", type: "bonda" },
                { text: "Chutney", type: "chutney" },
                { text: "Millet Idly", type: "idly" },
                { text: "Sambar", type: "dal" },
                { text: "Upma", type: "upma" },
                { text: "Chutney", type: "chutney" },
                { text: "Dosa", type: "dosa" },
                { text: "Veg Chutney", type: "chutney" },
                { text: "Milk", type: "curd" }
            ],
            fri: [
                { text: "Bonda", type: "bonda" },
                { text: "Chutney", type: "chutney" },
                { text: "Upma", type: "upma" },
                { text: "Chutney", type: "chutney" },
                { text: "Idly", type: "idly" },
                { text: "Sambar", type: "dal" },
                { text: "Dosa", type: "dosa" },
                { text: "Veg Chutney", type: "chutney" },
                { text: "Poori", type: "poori" },
                { text: "Veg Kurma", type: "curry" },
                { text: "Millet Idly", type: "idly" },
                { text: "Sambar", type: "dal" },
                { text: "Milk", type: "curd" }
            ],
            sat: [
                { text: "Idly", type: "idly" },
                { text: "Sambar", type: "dal" },
                { text: "Dosa", type: "dosa" },
                { text: "Veg Chutney", type: "chutney" },
                { text: "Upma", type: "upma" },
                { text: "Chutney", type: "chutney" },
                { text: "Millet Idly", type: "idly" },
                { text: "Sambar", type: "dal" },
                { text: "Poori", type: "poori" },
                { text: "Veg Kurma", type: "curry" },
                { text: "Milk", type: "curd" }
            ]
        }
    },
    {
        id: 2,
        name: "NARSINGI",
        iconImg: "/images/center_5.png",
        menu: {
            mon: [{ text: "Bonda / Chutney", type: "bonda" }, { text: "M Idly / Sambar", type: "idly" }],
            tue: [{ text: "M Idly / Sambar", type: "idly" }, { text: "Bonda / Chutney", type: "bonda" }],
            wed: [{ text: "Upma / Chutney", type: "upma" }, { text: "Dosa / Chutney", type: "dosa" }, { text: "Bonda / Chutney", type: "bonda" }],
            thu: [{ text: "Dosa / Chutney", type: "dosa" }, { text: "Upma / Chutney", type: "upma" }, { text: "Poori / Aloo Sagu", type: "poori" }, { text: "Bonda / Chutney", type: "bonda" }],
            fri: [{ text: "Poori / Aloo Sagu", type: "poori" }, { text: "M Idly / Sambar", type: "idly" }, { text: "Upma / Chutney", type: "upma" }],
            sat: [{ text: "Idly / Sambar", type: "idly" }, { text: "Poori / Aloo Sagu", type: "poori" }]
        }
    },
    {
        id: 3,
        name: "WARANGAL",
        iconImg: "/images/center_4.png",
        menu: {
            mon: [{ text: "Poori 2 No's", type: "poori" }, { text: "Mixed Veg Kurma", type: "curry" }],
            tue: [{ text: "Millet Idly 2 No's", type: "idly" }, { text: "Sambar", type: "dal" }],
            wed: [{ text: "Upma", type: "upma" }, { text: "Sambar", type: "dal" }],
            thu: [{ text: "Idly 2 No's", type: "idly" }, { text: "Chutney", type: "chutney" }],
            fri: [{ text: "Bonda 2 No's", type: "bonda" }, { text: "Chutney", type: "chutney" }],
            sat: [{ text: "Dosa 2 No's", type: "dosa" }, { text: "Chutney", type: "chutney" }]
        }
    },
    {
        id: 4,
        name: "MAHBUBNAGAR",
        iconImg: "/images/center_mahbubnagar.png",
        menu: {
            mon: [
                { text: "Upma", type: "upma" },
                { text: "Chutney", type: "chutney" },
                { text: "Millet Idly", type: "idly" },
                { text: "Sambar", type: "dal" },
                { text: "Dosa", type: "dosa" },
                { text: "Veg Chutney", type: "chutney" },
                { text: "Idly", type: "idly" },
                { text: "Sambar", type: "dal" },
                { text: "Poori", type: "poori" },
                { text: "Veg Kurma", type: "curry" },
                { text: "Bonda", type: "bonda" },
                { text: "Chutney", type: "chutney" },
                { text: "Milk", type: "curd" }
            ],
            tue: [
                { text: "Dosa", type: "dosa" },
                { text: "Veg Chutney", type: "chutney" },
                { text: "Poori", type: "poori" },
                { text: "Veg Kurma", type: "curry" },
                { text: "Millet Idly", type: "idly" },
                { text: "Sambar", type: "dal" },
                { text: "Upma", type: "upma" },
                { text: "Chutney", type: "chutney" },
                { text: "Idly", type: "idly" },
                { text: "Sambar", type: "dal" },
                { text: "Bonda", type: "bonda" },
                { text: "Chutney", type: "chutney" }
            ],
            wed: [
                { text: "Millet Idly", type: "idly" },
                { text: "Sambar", type: "dal" },
                { text: "Bonda", type: "bonda" },
                { text: "Chutney", type: "chutney" },
                { text: "Poori", type: "poori" },
                { text: "Veg Kurma", type: "curry" },
                { text: "Dosa", type: "dosa" },
                { text: "Veg Chutney", type: "chutney" },
                { text: "Idly", type: "idly" },
                { text: "Sambar", type: "dal" },
                { text: "Upma", type: "upma" },
                { text: "Chutney", type: "chutney" },
                { text: "Milk", type: "curd" }
            ],
            thu: [
                { text: "Poori", type: "poori" },
                { text: "Veg Kurma", type: "curry" },
                { text: "Idly", type: "idly" },
                { text: "Sambar", type: "dal" },
                { text: "Bonda", type: "bonda" },
                { text: "Chutney", type: "chutney" },
                { text: "Millet Idly", type: "idly" },
                { text: "Sambar", type: "dal" },
                { text: "Upma", type: "upma" },
                { text: "Chutney", type: "chutney" },
                { text: "Dosa", type: "dosa" },
                { text: "Veg Chutney", type: "chutney" },
                { text: "Milk", type: "curd" }
            ],
            fri: [
                { text: "Bonda", type: "bonda" },
                { text: "Chutney", type: "chutney" },
                { text: "Upma", type: "upma" },
                { text: "Chutney", type: "chutney" },
                { text: "Idly", type: "idly" },
                { text: "Sambar", type: "dal" },
                { text: "Dosa", type: "dosa" },
                { text: "Veg Chutney", type: "chutney" },
                { text: "Poori", type: "poori" },
                { text: "Veg Kurma", type: "curry" },
                { text: "Millet Idly", type: "idly" },
                { text: "Sambar", type: "dal" },
                { text: "Milk", type: "curd" }
            ],
            sat: [
                { text: "Idly", type: "idly" },
                { text: "Sambar", type: "dal" },
                { text: "Dosa", type: "dosa" },
                { text: "Veg Chutney", type: "chutney" },
                { text: "Upma", type: "upma" },
                { text: "Chutney", type: "chutney" },
                { text: "Millet Idly", type: "idly" },
                { text: "Sambar", type: "dal" },
                { text: "Poori", type: "poori" },
                { text: "Veg Kurma", type: "curry" },
                { text: "Milk", type: "curd" }
            ]
        }
    }
];

function getFoodIconHtml(item) {
    let imgSrc = '/images/rice.png';
    let altText = 'Food';
    const text = (typeof item === 'object' ? item.text : item || '').toLowerCase();
    const type = (typeof item === 'object' ? item.type : '' || '').toLowerCase();

    if (type === 'fruit' || text.includes('banana')) {
        imgSrc = '/images/banana.png';
        altText = 'Banana';
    } 
    else if (type === 'chiki' || text.includes('chikki') || text.includes('chiki')) {
        imgSrc = '/images/chiki.png';
        altText = 'Chikki';
    } 
    else if (type === 'curd' || text.includes('curd') || text.includes('milk')) {
        imgSrc = '/images/curd.png';
        altText = 'Curd / Milk';
    } 
    else if (type === 'pickle' || text.includes('pickle') || text.includes('chutney')) {
        imgSrc = '/images/pickle.png';
        altText = 'Pickle / Chutney';
    } 
    else if (type === 'upma' || type === 'pulhora' || text.includes('pulhora') || text.includes('upma') || text.includes('poha')) {
        imgSrc = '/images/pulhora.png';
        altText = 'Upma';
    } 
    else if (type === 'dal' || text.includes('dal') || text.includes('sambar') || text.includes('pappu') || text.includes('charu') || text.includes('dhal') || text.includes('dalcha') || text.includes('rasam')) {
        imgSrc = '/images/dal.png';
        altText = 'Dal / Sambar';
    } 
    else if (type === 'curry' || type === 'poori' || text.includes('curry') || text.includes('kurma') || text.includes('masala') || text.includes('sabji') || text.includes('gourd') || text.includes('paneer') || text.includes('aloo') || text.includes('peas') || text.includes('salan') || text.includes('kulasi') || text.includes('chana') || text.includes('soya') || text.includes('maker') || text.includes('sagu') || text.includes('saagu') || text.includes('poori') || text.includes('puri')) {
        imgSrc = '/images/curry.png';
        altText = 'Curry';
    } 
    else if (type === 'idly' || type === 'dosa' || type === 'bonda' || type === 'rice' || text.includes('rice') || text.includes('biryani') || text.includes('khichdi') || text.includes('idly') || text.includes('idli') || text.includes('dosa') || text.includes('bonda')) {
        imgSrc = '/images/rice.png';
        altText = 'Dish';
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
    currentMondayStr: '',
    inspectorName: '',
    inspectorDate: '',
    inspectorSig: '',
    inspectorRemarks: ''
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

    // Inspector Details Form Input Bindings
    ['inspector-name', 'inspector-date', 'inspector-sig', 'inspector-remarks'].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('input', () => {
                if (id === 'inspector-name') appState.inspectorName = el.value;
                if (id === 'inspector-date') appState.inspectorDate = el.value;
                if (id === 'inspector-sig') appState.inspectorSig = el.value;
                if (id === 'inspector-remarks') appState.inspectorRemarks = el.value;
                saveLocalState();
            });
        }
    });

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
        localStorage.setItem('akshaya_patra_breakfast_state', JSON.stringify(appState));
    } catch (e) {}

    fetch('/api/save-state', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stateData: { breakfast: appState } })
    }).catch(err => console.log('Draft save note:', err.message));
}

function loadLocalState() {
    try {
        const saved = localStorage.getItem('akshaya_patra_breakfast_state');
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
            if (parsed.inspectorName) {
                appState.inspectorName = parsed.inspectorName;
                const el = document.getElementById('inspector-name');
                if (el) el.value = parsed.inspectorName;
            }
            if (parsed.inspectorDate) {
                appState.inspectorDate = parsed.inspectorDate;
                const el = document.getElementById('inspector-date');
                if (el) el.value = parsed.inspectorDate;
            }
            if (parsed.inspectorSig) {
                appState.inspectorSig = parsed.inspectorSig;
                const el = document.getElementById('inspector-sig');
                if (el) el.value = parsed.inspectorSig;
            }
            if (parsed.inspectorRemarks) {
                appState.inspectorRemarks = parsed.inspectorRemarks;
                const el = document.getElementById('inspector-remarks');
                if (el) el.value = parsed.inspectorRemarks;
            }

            if (appState.currentMondayStr && appState.allWeeksChecked && appState.allWeeksChecked[appState.currentMondayStr]) {
                appState.checkedItems = { ...appState.allWeeksChecked[appState.currentMondayStr] };
            }
        }
    } catch (e) {}

    fetch('/api/load-state')
        .then(res => res.json())
        .then(res => {
            if (res.success && res.stateData) {
                const data = res.stateData.breakfast || res.stateData;
                if (data.allWeeksChecked && Object.keys(data.allWeeksChecked).length > 0) {
                    appState.allWeeksChecked = { ...(data.allWeeksChecked || {}), ...(appState.allWeeksChecked || {}) };
                }
                if (appState.currentMondayStr && appState.allWeeksChecked && appState.allWeeksChecked[appState.currentMondayStr]) {
                    appState.checkedItems = { ...appState.allWeeksChecked[appState.currentMondayStr] };
                } else if (data.checkedItems && Object.keys(data.checkedItems).length > 0 && Object.keys(appState.checkedItems || {}).length === 0) {
                    appState.checkedItems = data.checkedItems;
                }
                if (data.dates) appState.dates = data.dates;
                if (data.inspectorName && !appState.inspectorName) {
                    appState.inspectorName = data.inspectorName;
                    const el = document.getElementById('inspector-name');
                    if (el) el.value = data.inspectorName;
                }
                if (data.inspectorDate && !appState.inspectorDate) {
                    appState.inspectorDate = data.inspectorDate;
                    const el = document.getElementById('inspector-date');
                    if (el) el.value = data.inspectorDate;
                }
                if (data.inspectorSig && !appState.inspectorSig) {
                    appState.inspectorSig = data.inspectorSig;
                    const el = document.getElementById('inspector-sig');
                    if (el) el.value = data.inspectorSig;
                }
                if (data.inspectorRemarks && !appState.inspectorRemarks) {
                    appState.inspectorRemarks = data.inspectorRemarks;
                    const el = document.getElementById('inspector-remarks');
                    if (el) el.value = data.inspectorRemarks;
                }
                renderChecklistTable();
            }
        })
        .catch(err => console.log('Draft load note:', err.message));
}

function checkNotionConfigStatus() {
    fetch('/api/notion/config?program=breakfast')
        .then(res => res.json())
        .then(data => {
            const cfg = data.config || {};
            const key = cfg.notionKey || localStorage.getItem('notion_breakfast_key');
            const dbId = cfg.databaseId || localStorage.getItem('notion_breakfast_db');
            
            if (key) localStorage.setItem('notion_breakfast_key', key);
            if (dbId) localStorage.setItem('notion_breakfast_db', dbId);

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
    const key = localStorage.getItem('notion_breakfast_key') || '';
    const dbId = localStorage.getItem('notion_breakfast_db') || '';
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

    localStorage.setItem('notion_breakfast_key', key);
    localStorage.setItem('notion_breakfast_db', dbId);

    fetch('/api/notion/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ program: 'breakfast', notionKey: key, databaseId: dbId })
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
        body: JSON.stringify({ program: 'breakfast', notionKey: key, databaseId: dbId })
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
    const key = localStorage.getItem('notion_breakfast_key');
    const dbId = localStorage.getItem('notion_breakfast_db');

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
            programType: 'breakfast',
            weekLabel: weekLabel,
            stateData: appState,
            kitchenDaySummary: kitchenDaySummary,
            inspectorDetails: {
                inspectorName: appState.inspectorName,
                inspectorDate: appState.inspectorDate,
                inspectorSig: appState.inspectorSig,
                remarks: appState.inspectorRemarks
            }
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
