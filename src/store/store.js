import Vue from 'vue';

export const store = Vue.observable({
    bahanAjarList: [],
    cart: [],
    nextId: 1,
    editingItem: null,
    searchQuery: '',
    filterKategori: '',
    filterStatus: ''
});

export const mutations = {
    setSearchQuery(query) { store.searchQuery = query; },
    setFilterKategori(kategori) { store.filterKategori = kategori; },
    setFilterStatus(status) { store.filterStatus = status; },
    setEditingItem(item) {
        store.editingItem = item ? { ...item } : null;
    },
    setBahanAjarList(list) {
        store.bahanAjarList = list;
        if (list.length > 0) {
            store.nextId = Math.max(...list.map(item => item.id)) + 1;
        }
    },
    addBahanAjar(item) {
        const newItem = { ...item, id: store.nextId++ };
        store.bahanAjarList.push(newItem);
        this.saveToLocalStorage();
    },
    updateBahanAjar(updatedItem) {
        const index = store.bahanAjarList.findIndex(item => item.id === updatedItem.id);
        if (index !== -1) {
            Vue.set(store.bahanAjarList, index, { ...updatedItem });
            this.saveToLocalStorage();
        }
    },
    deleteBahanAjar(id) {
        store.bahanAjarList = store.bahanAjarList.filter(item => item.id !== id);
        this.saveToLocalStorage();
    },
    addToCart(item) {
        const existingItem = store.cart.find(cartItem => cartItem.id === item.id);
        if (existingItem) {
            existingItem.qty++;
        } else {
            store.cart.push({ ...item, qty: 1 });
        }
    },
    removeFromCart(id) {
        store.cart = store.cart.filter(item => item.id !== id);
    },
    updateCartQty(id, delta) {
        const item = store.cart.find(cartItem => cartItem.id === id);
        if (item) {
            item.qty += delta;
            if (item.qty < 1) item.qty = 1;
        }
    },
    clearCart() {
        store.cart = [];
    },
    saveToLocalStorage() {
        localStorage.setItem('bahanAjarList', JSON.stringify(store.bahanAjarList));
    },
    loadFromLocalStorage() {
        const saved = localStorage.getItem('bahanAjarList');
        if (saved) {
            this.setBahanAjarList(JSON.parse(saved));
        } else {
            // Initialize with sample data if empty
            this.setBahanAjarList([
                {
                    id: 1,
                    judul: 'Modul Pemrograman Web',
                    kategori: 'Modul',
                    jumlah: 25,
                    harga: 50000,
                    deskripsi: 'Modul lengkap tentang pemrograman web menggunakan HTML, CSS, dan JavaScript',
                    tersedia: true
                },
                {
                    id: 2,
                    judul: 'Buku Database Fundamental',
                    kategori: 'Buku',
                    jumlah: 5,
                    harga: 120000,
                    deskripsi: 'Buku panduan database dari dasar hingga advanced',
                    tersedia: true
                },
                {
                    id: 3,
                    judul: 'Video Tutorial Vue.js',
                    kategori: 'Video',
                    jumlah: 100,
                    harga: 25000,
                    deskripsi: 'Tutorial lengkap Vue.js untuk pemula hingga mahir',
                    tersedia: false
                }
            ]);
        }
    }
};
