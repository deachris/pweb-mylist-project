const API = '/api/items';

const navBar = document.querySelector('.nav-bar');
const formSearch = document.getElementById('form-search');
const searchTitle = document.getElementById('search-title');
const formItem = document.getElementById('form-item');
const formLabel = document.getElementById('form-label');
const inputId = document.getElementById('input-id');
const inputTitle = document.getElementById('input-title');
const inputCategory = document.getElementById('input-category');
const inputGenre = document.getElementById('input-genre');
const inputRating = document.getElementById('input-rating');
const inputStatus = document.getElementById('input-status');
const btnSave = document.getElementById('btn-save');
const btnCancel = document.getElementById('btn-cancel');
const display = document.getElementById('display');

const statusLabel = {
    'done': 'Selesai',
    'in-progress': 'In Progress',
    'not-started': 'Not Started'
};

let items = [];
let searchQuery = '';
let activeCategory = 'All';
let editingId = null;

function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, char => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    }[char]));
}

async function loadItems() {
    const params = new URLSearchParams();
    if (searchQuery) params.set('title', searchQuery);
    if (activeCategory !== 'All') params.set('category', activeCategory);
    const query = params.toString();

    const res = await fetch(query ? `${API}?${query}` : API);
    items = await res.json();
    renderItems();
}

function renderItems() {
    if (!items.length) {
        display.innerHTML = '<p class="empty">Tidak ada data.</p>';
        return;
    }

    display.innerHTML = items.map(item => `
        <div class="card" data-id="${item.id}">
            <div class="box">
                <span>${escapeHtml(item.title.charAt(0).toUpperCase())}</span>
                <span class="category">${escapeHtml(item.category)}</span>
            </div>
            <div class="card-body">
                <h3>${escapeHtml(item.title)}</h3>
                <p>Genre: ${escapeHtml(item.genre || '-')}</p>
                <p>Rating: ${escapeHtml(item.rating || '-')}</p>
                <span class="status ${item.status}">${statusLabel[item.status]}</span>
                <div class="card-actions">
                    <button class="btn-edit">Edit</button>
                    <button class="btn-delete">Hapus</button>
                </div>
            </div>
        </div>
    `).join('');
}

function resetForm() {
    editingId = null;
    formItem.reset();
    formLabel.textContent = 'Tambah Data';
    btnSave.textContent = 'Tambah';
}

function startEdit(id) {
    const item = items.find(item => item.id === id);
    if (!item) return;

    editingId = id;
    inputId.value = item.id;
    inputTitle.value = item.title;
    inputCategory.value = item.category;
    inputGenre.value = item.genre;
    inputRating.value = item.rating;
    inputStatus.value = item.status;

    formLabel.textContent = 'Ubah Data';
    btnSave.textContent = 'Simpan';
    formItem.scrollIntoView({ behavior: 'smooth' });
    inputTitle.focus();
}

async function removeItem(id) {
    const item = items.find(item => item.id === id);
    if (!confirm(`Hapus "${item ? item.title : ''}"?`)) return;

    await fetch(`${API}/${id}`, { method: 'DELETE' });
    if (editingId === id) resetForm();
    loadItems();
}

formSearch.addEventListener('submit', (event) => {
    event.preventDefault();
    searchQuery = searchTitle.value.trim();
    loadItems();
});

navBar.addEventListener('click', (event) => {
    if (!event.target.matches('h2')) return;
    document.querySelector('.nav-bar .active')?.classList.remove('active');
    event.target.classList.add('active');
    activeCategory = event.target.dataset.category;
    loadItems();
});

formItem.addEventListener('submit', async (event) => {
    event.preventDefault();

    const data = {
        title: inputTitle.value.trim(),
        category: inputCategory.value,
        genre: inputGenre.value.trim(),
        rating: inputRating.value,
        status: inputStatus.value
    };

    const url = editingId ? `${API}/${editingId}` : API;
    const res = await fetch(url, {
        method: editingId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    if (!res.ok) {
        const err = await res.json();
        alert(err.message || 'Terjadi kesalahan.');
        return;
    }

    loadItems();
    resetForm();
});

btnCancel.addEventListener('click', resetForm);

display.addEventListener('click', (event) => {
    const card = event.target.closest('.card');
    if (!card) return;

    const id = Number(card.dataset.id);
    if (event.target.classList.contains('btn-edit')) {
        startEdit(id);
    } else if (event.target.classList.contains('btn-delete')) {
        removeItem(id);
    }
});

loadItems();
