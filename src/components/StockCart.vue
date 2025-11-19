<template>
  <div v-if="cart.length > 0" class="card mb-4 shadow-sm border-primary">
    <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
      <h5 class="mb-0"><i class="fa-solid fa-shopping-cart me-2"></i>Keranjang Peminjaman ({{ cart.length }} item)</h5>
      <button @click="clearCart" class="btn btn-sm btn-light text-danger fw-bold">
        <i class="fa-solid fa-trash-can me-1"></i> Kosongkan
      </button>
    </div>
    <div class="list-group list-group-flush">
      <div v-for="item in cart" :key="item.id" class="list-group-item d-flex justify-content-between align-items-center">
        <div class="ms-2 me-auto">
          <div class="fw-bold">{{ item.judul }}</div>
          <small class="text-muted">{{ item.kategori }}</small>
        </div>
        <div class="d-flex align-items-center gap-3">
          <div class="btn-group btn-group-sm" role="group">
            <button @click="updateQty(item.id, -1)" class="btn btn-outline-secondary">-</button>
            <button class="btn btn-outline-secondary disabled text-dark fw-bold" style="width: 40px">{{ item.qty }}</button>
            <button @click="updateQty(item.id, 1)" class="btn btn-outline-secondary">+</button>
          </div>
          <div class="fw-bold text-primary" style="min-width: 100px; text-align: right;">
            {{ formatRupiah(item.harga * item.qty) }}
          </div>
          <button @click="removeFromCart(item.id)" class="btn btn-sm btn-outline-danger"><i class="fa-solid fa-xmark"></i></button>
        </div>
      </div>
    </div>
    <div class="card-footer bg-light d-flex justify-content-between align-items-center p-3">
      <span class="h5 mb-0">Total Pembayaran:</span>
      <span class="h4 mb-0 text-primary">{{ formatRupiah(cartTotal) }}</span>
    </div>
  </div>
</template>

<script>
import { store, mutations } from '../store/store';

export default {
  name: 'StockCart',
  computed: {
    cart() {
      return store.cart;
    },
    cartTotal() {
      return this.cart.reduce((sum, item) => sum + (item.harga * item.qty), 0);
    }
  },
  methods: {
    formatRupiah(angka) {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
      }).format(angka);
    },
    updateQty(id, delta) {
      mutations.updateCartQty(id, delta);
    },
    removeFromCart(id) {
      mutations.removeFromCart(id);
    },
    clearCart() {
      // eslint-disable-next-line no-undef
      Swal.fire({
        title: 'Kosongkan Keranjang?',
        text: "Semua item di keranjang akan dihapus!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Ya, Kosongkan!',
        cancelButtonText: 'Batal'
      }).then((result) => {
        if (result.isConfirmed) {
          mutations.clearCart();
          // eslint-disable-next-line no-undef
          Swal.fire(
            'Dikosongkan!',
            'Keranjang belanja telah dikosongkan.',
            'success'
          )
        }
      })
    }
  }
}
</script>

<style scoped>
/* Custom styles removed in favor of Bootstrap classes */
</style>
