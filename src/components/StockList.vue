<template>
  <div class="card mb-4 shadow-sm">
    <div class="card-header bg-white d-flex justify-content-between align-items-center">
      <h5 class="mb-0"><i class="fa-solid fa-list me-2"></i>Daftar Bahan Ajar ({{ filteredBahanAjar.length }})</h5>
    </div>
    
    <div class="card-body p-0">
      <div v-if="filteredBahanAjar.length === 0" class="p-4 text-center text-muted">
        <p class="mb-0">Tidak ada data bahan ajar yang tersedia.</p>
      </div>

      <div v-else>
        <div class="table-responsive">
          <table class="table table-hover table-striped mb-0 align-middle">
            <thead class="table-light">
              <tr>
                <th>No</th>
                <th>Judul</th>
                <th>Kategori</th>
                <th>Stok</th>
                <th>Harga</th>
                <th>Total Nilai</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in paginatedData" :key="item.id">
                <td>{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
                <td>
                  <div class="fw-bold">{{ item.judul }}</div>
                  <small class="text-muted">{{ item.deskripsi }}</small>
                </td>
                <td>
                  <span class="badge" :class="getKategoriBadgeClass(item.kategori)">
                    {{ item.kategori }}
                  </span>
                </td>
                <td>
                  <span :class="getStokClass(item.jumlah)">
                    {{ item.jumlah }}
                  </span>
                </td>
                <td>{{ formatRupiah(item.harga) }}</td>
                <td><span class="fw-bold">{{ formatRupiah(item.jumlah * item.harga) }}</span></td>
                <td>
                  <span v-if="item.tersedia" class="badge bg-success bg-opacity-10 text-success">
                    <i class="fa-solid fa-check me-1"></i> Tersedia
                  </span>
                  <span v-else class="badge bg-danger bg-opacity-10 text-danger">
                    <i class="fa-solid fa-times me-1"></i> Tidak Tersedia
                  </span>
                </td>
                <td>
                  <div class="btn-group btn-group-sm">
                    <button 
                      @click="addToCart(item)"
                      class="btn btn-outline-primary"
                      title="Pinjam"
                      v-if="item.tersedia && item.jumlah > 0"
                    >
                      <i class="fa-solid fa-cart-plus"></i>
                    </button>
                    <button 
                      @click="editBahanAjar(item)" 
                      class="btn btn-outline-warning"
                      title="Edit"
                    >
                      <i class="fa-solid fa-pencil"></i>
                    </button>
                    <button 
                      @click="deleteBahanAjar(item.id)" 
                      class="btn btn-outline-danger"
                      title="Hapus"
                    >
                      <i class="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <!-- Pagination Controls -->
        <div class="card-footer bg-white d-flex justify-content-between align-items-center py-3" v-if="totalPages > 1">
          <small class="text-muted">
            Menampilkan {{ (currentPage - 1) * itemsPerPage + 1 }} - {{ Math.min(currentPage * itemsPerPage, filteredBahanAjar.length) }} dari {{ filteredBahanAjar.length }} data
          </small>
          <nav aria-label="Page navigation">
            <ul class="pagination pagination-sm mb-0">
              <li class="page-item" :class="{ disabled: currentPage === 1 }">
                <button class="page-link" @click="changePage(currentPage - 1)" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </button>
              </li>
              <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: currentPage === page }">
                <button class="page-link" @click="changePage(page)">{{ page }}</button>
              </li>
              <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                <button class="page-link" @click="changePage(currentPage + 1)" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { store, mutations } from '../store/store';

export default {
  name: 'StockList',
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 5
    }
  },
  computed: {
    filteredBahanAjar() {
      let result = store.bahanAjarList;

      if (store.searchQuery) {
        result = result.filter(item => 
          item.judul.toLowerCase().includes(store.searchQuery.toLowerCase()) ||
          item.deskripsi.toLowerCase().includes(store.searchQuery.toLowerCase())
        );
      }

      if (store.filterKategori) {
        result = result.filter(item => item.kategori === store.filterKategori);
      }

      if (store.filterStatus) {
        result = result.filter(item => {
          if (store.filterStatus === 'tersedia') return item.tersedia;
          if (store.filterStatus === 'tidak') return !item.tersedia;
          return true;
        });
      }

      return result;
    },
    totalPages() {
      return Math.ceil(this.filteredBahanAjar.length / this.itemsPerPage);
    },
    paginatedData() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredBahanAjar.slice(start, end);
    }
  },
  watch: {
    filteredBahanAjar() {
      this.currentPage = 1;
    }
  },
  methods: {
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    formatRupiah(angka) {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
      }).format(angka);
    },
    getStokClass(jumlah) {
      if (jumlah === 0) return 'text-danger fw-bold';
      if (jumlah < 10) return 'text-warning fw-bold';
      return 'text-success fw-bold';
    },
    getKategoriBadgeClass(kategori) {
      const classes = {
        'Modul': 'bg-primary',
        'Buku': 'bg-success',
        'Video': 'bg-danger',
        'Slide': 'bg-warning text-dark',
        'E-Book': 'bg-info text-dark'
      };
      return classes[kategori] || 'bg-secondary';
    },
    editBahanAjar(item) {
      mutations.setEditingItem(item);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    deleteBahanAjar(id) {
      // eslint-disable-next-line no-undef
      Swal.fire({
        title: 'Apakah Anda yakin?',
        text: "Data bahan ajar akan dihapus permanen!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Ya, Hapus!',
        cancelButtonText: 'Batal'
      }).then((result) => {
        if (result.isConfirmed) {
          mutations.deleteBahanAjar(id);
          // eslint-disable-next-line no-undef
          Swal.fire(
            'Terhapus!',
            'Bahan ajar telah dihapus.',
            'success'
          )
        }
      })
    },
    addToCart(item) {
      mutations.addToCart(item);
    }
  }
}
</script>

<style scoped>
/* Custom styles removed in favor of Bootstrap classes */
</style>
