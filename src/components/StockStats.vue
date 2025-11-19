<template>
  <div class="card mb-4 shadow-sm border-0">
    <div class="card-header bg-white border-bottom-0 pt-4 ps-4">
      <h5 class="mb-0 fw-bold text-secondary">
        <i class="fa-solid fa-chart-pie me-2 text-primary"></i>Statistik Stok
      </h5>
    </div>
    <div class="card-body p-4">
      <div class="row g-4">
        <!-- Total Item -->
        <div class="col-md-6">
          <div class="card h-100 border-0 shadow-sm hover-card">
            <div class="card-body d-flex align-items-center">
              <div class="icon-wrapper bg-primary bg-opacity-10 text-primary rounded-circle p-3 me-3">
                <i class="fa-solid fa-box fa-xl"></i>
              </div>
              <div>
                <h6 class="text-muted mb-1">Total Item</h6>
                <h3 class="mb-0 fw-bold text-dark">{{ totalItems }}</h3>
              </div>
            </div>
            <div class="card-footer bg-transparent border-0 pt-0 pb-3 ps-3">
              <small class="text-muted"><i class="fa-solid fa-arrow-up text-success me-1"></i>Item terdaftar</small>
            </div>
          </div>
        </div>

        <!-- Total Stok -->
        <div class="col-md-6">
          <div class="card h-100 border-0 shadow-sm hover-card">
            <div class="card-body d-flex align-items-center">
              <div class="icon-wrapper bg-success bg-opacity-10 text-success rounded-circle p-3 me-3">
                <i class="fa-solid fa-layer-group fa-xl"></i>
              </div>
              <div>
                <h6 class="text-muted mb-1">Total Stok</h6>
                <h3 class="mb-0 fw-bold text-dark">{{ totalStok }}</h3>
              </div>
            </div>
            <div class="card-footer bg-transparent border-0 pt-0 pb-3 ps-3">
              <small class="text-muted"><i class="fa-solid fa-cubes text-success me-1"></i>Unit tersedia</small>
            </div>
          </div>
        </div>

        <!-- Total Nilai -->
        <div class="col-md-6">
          <div class="card h-100 border-0 shadow-sm hover-card">
            <div class="card-body d-flex align-items-center">
              <div class="icon-wrapper bg-info bg-opacity-10 text-info rounded-circle p-3 me-3">
                <i class="fa-solid fa-money-bill-wave fa-xl"></i>
              </div>
              <div>
                <h6 class="text-muted mb-1">Total Nilai</h6>
                <h4 class="mb-0 fw-bold text-dark">{{ formatRupiah(totalNilai) }}</h4>
              </div>
            </div>
            <div class="card-footer bg-transparent border-0 pt-0 pb-3 ps-3">
              <small class="text-muted"><i class="fa-solid fa-coins text-warning me-1"></i>Aset inventaris</small>
            </div>
          </div>
        </div>

        <!-- Tersedia -->
        <div class="col-md-6">
          <div class="card h-100 border-0 shadow-sm hover-card">
            <div class="card-body d-flex align-items-center">
              <div class="icon-wrapper bg-warning bg-opacity-10 text-warning rounded-circle p-3 me-3">
                <i class="fa-solid fa-check-circle fa-xl"></i>
              </div>
              <div>
                <h6 class="text-muted mb-1">Status Aktif</h6>
                <h3 class="mb-0 fw-bold text-dark">{{ tersediaCount }}</h3>
              </div>
            </div>
            <div class="card-footer bg-transparent border-0 pt-0 pb-3 ps-3">
              <small class="text-muted"><i class="fa-solid fa-circle-check text-success me-1"></i>Siap dipinjam</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { store } from '../store/store';

export default {
  name: 'StockStats',
  computed: {
    bahanAjarList() {
      return store.bahanAjarList;
    },
    totalItems() {
      return this.bahanAjarList.length;
    },
    totalStok() {
      return this.bahanAjarList.reduce((sum, item) => sum + item.jumlah, 0);
    },
    totalNilai() {
      return this.bahanAjarList.reduce((sum, item) => sum + (item.jumlah * item.harga), 0);
    },
    tersediaCount() {
      return this.bahanAjarList.filter(item => item.tersedia).length;
    }
  },
  methods: {
    formatRupiah(angka) {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(angka);
    }
  }
}
</script>

<style scoped>
.icon-wrapper {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hover-card {
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

.hover-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important;
}
</style>
