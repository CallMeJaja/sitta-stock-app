<template>
  <div class="card mb-4 shadow-sm">
    <div class="card-body">
      <div class="row g-3">
        <div class="col-md-6">
          <div class="input-group">
            <span class="input-group-text bg-white text-muted">
              <i class="fa-solid fa-magnifying-glass"></i>
            </span>
            <input 
              type="text" 
              class="form-control border-start-0 ps-0"
              :value="searchQuery"
              @input="updateSearch"
              placeholder="Cari bahan ajar..."
            >
          </div>
        </div>
        <div class="col-md-3">
          <select class="form-select" :value="filterKategori" @change="updateKategori">
            <option value="">Semua Kategori</option>
            <option value="Modul">Modul</option>
            <option value="Buku">Buku</option>
            <option value="Video">Video</option>
            <option value="Slide">Slide</option>
            <option value="E-Book">E-Book</option>
          </select>
        </div>
        <div class="col-md-3">
          <select class="form-select" :value="filterStatus" @change="updateStatus">
            <option value="">Semua Status</option>
            <option value="tersedia">Tersedia</option>
            <option value="tidak">Tidak Tersedia</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { store, mutations } from '../store/store';

export default {
  name: 'StockFilter',
  computed: {
    searchQuery() { return store.searchQuery; },
    filterKategori() { return store.filterKategori; },
    filterStatus() { return store.filterStatus; }
  },
  methods: {
    updateSearch(e) { mutations.setSearchQuery(e.target.value); },
    updateKategori(e) { mutations.setFilterKategori(e.target.value); },
    updateStatus(e) { mutations.setFilterStatus(e.target.value); }
  }
}
</script>

<style scoped>
/* Custom styles removed in favor of Bootstrap classes */
</style>
