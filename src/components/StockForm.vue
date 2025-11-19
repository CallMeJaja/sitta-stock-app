<template>
  <div class="card mb-4 shadow-sm">
    <div class="card-header bg-white">
      <h5 class="mb-0"><i class="fa-solid fa-pen-to-square me-2"></i>{{ isEditing ? 'Edit' : 'Tambah' }} Bahan Ajar</h5>
    </div>
    <div class="card-body">
      <form @submit.prevent="submitForm">
        <div class="mb-3">
          <label for="judul" class="form-label">Judul Bahan Ajar:</label>
          <input 
            type="text" 
            id="judul"
            v-model="form.judul"
            class="form-control"
            :class="{ 'is-invalid': errors.judul }"
            placeholder="Masukkan judul bahan ajar"
          >
          <div v-if="errors.judul" class="invalid-feedback">{{ errors.judul }}</div>
        </div>

        <div class="mb-3">
          <label for="kategori" class="form-label">Kategori:</label>
          <select 
            v-model="form.kategori" 
            id="kategori" 
            class="form-select"
            :class="{ 'is-invalid': errors.kategori }"
          >
            <option value="">-- Pilih Kategori --</option>
            <option value="Modul">Modul</option>
            <option value="Buku">Buku</option>
            <option value="Video">Video</option>
            <option value="Slide">Slide</option>
            <option value="E-Book">E-Book</option>
          </select>
          <div v-if="errors.kategori" class="invalid-feedback">{{ errors.kategori }}</div>
        </div>

        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="jumlah" class="form-label">Jumlah Stok:</label>
            <input 
              type="number" 
              id="jumlah"
              v-model.number="form.jumlah"
              class="form-control"
              :class="{ 'is-invalid': errors.jumlah }"
              placeholder="Masukkan jumlah stok"
              min="0"
            >
            <div v-if="errors.jumlah" class="invalid-feedback">{{ errors.jumlah }}</div>
          </div>

          <div class="col-md-6 mb-3">
            <label for="harga" class="form-label">Harga Satuan (Rp):</label>
            <input 
              type="number" 
              id="harga"
              v-model.number="form.harga"
              class="form-control"
              :class="{ 'is-invalid': errors.harga }"
              placeholder="Masukkan harga satuan"
              min="0"
            >
            <div v-if="errors.harga" class="invalid-feedback">{{ errors.harga }}</div>
          </div>
        </div>

        <div class="mb-3">
          <label for="deskripsi" class="form-label">Deskripsi:</label>
          <textarea 
            id="deskripsi"
            v-model="form.deskripsi"
            class="form-control"
            :class="{ 'is-invalid': errors.deskripsi }"
            placeholder="Masukkan deskripsi bahan ajar"
            rows="3"
          ></textarea>
          <div v-if="errors.deskripsi" class="invalid-feedback">{{ errors.deskripsi }}</div>
        </div>

        <div class="mb-3 form-check">
          <input 
            type="checkbox" 
            v-model="form.tersedia" 
            class="form-check-input" 
            id="tersedia"
          >
          <label class="form-check-label" for="tersedia">
            Tersedia untuk dipinjam
          </label>
        </div>

        <div class="d-flex gap-2">
          <button type="submit" class="btn btn-primary">
            <i class="fa-solid" :class="isEditing ? 'fa-pencil' : 'fa-plus'"></i> {{ isEditing ? 'Update' : 'Tambah' }}
          </button>
          <button 
            v-if="isEditing" 
            type="button" 
            class="btn btn-secondary"
            @click="cancelEdit"
          >
            <i class="fa-solid fa-xmark me-1"></i> Batal
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { store, mutations } from '../store/store';

export default {
  name: 'StockForm',
  data() {
    return {
      form: {
        judul: '',
        kategori: '',
        jumlah: 0,
        harga: 0,
        deskripsi: '',
        tersedia: true
      },
      errors: {}
    };
  },
  computed: {
    isEditing() {
      return !!store.editingItem;
    },
    editingItem() {
      return store.editingItem;
    }
  },
  watch: {
    editingItem: {
      handler(newVal) {
        if (newVal) {
          this.form = { ...newVal };
        } else {
          this.resetForm();
        }
      },
      immediate: true
    }
  },
  methods: {
    validateForm() {
      this.errors = {};
      
      if (!this.form.judul || this.form.judul.trim() === '') {
        this.errors.judul = 'Judul harus diisi';
      } else if (this.form.judul.length < 3) {
        this.errors.judul = 'Judul minimal 3 karakter';
      }

      if (!this.form.kategori) {
        this.errors.kategori = 'Kategori harus dipilih';
      }

      if (this.form.jumlah === null || this.form.jumlah < 0) {
        this.errors.jumlah = 'Jumlah stok harus diisi dan tidak boleh negatif';
      }

      if (this.form.harga === null || this.form.harga <= 0) {
        this.errors.harga = 'Harga harus diisi dan lebih dari 0';
      }

      if (!this.form.deskripsi || this.form.deskripsi.trim() === '') {
        this.errors.deskripsi = 'Deskripsi harus diisi';
      }

      return Object.keys(this.errors).length === 0;
    },
    submitForm() {
      if (!this.validateForm()) {
        // No alert needed, Bootstrap validation styles will show
        return;
      }

      if (this.isEditing) {
        mutations.updateBahanAjar(this.form);
        // eslint-disable-next-line no-undef
        Swal.fire({
          icon: 'success',
          title: 'Berhasil!',
          text: 'Bahan ajar berhasil diupdate!',
          timer: 1500,
          showConfirmButton: false
        });
        mutations.setEditingItem(null);
      } else {
        mutations.addBahanAjar(this.form);
        // eslint-disable-next-line no-undef
        Swal.fire({
          icon: 'success',
          title: 'Berhasil!',
          text: 'Bahan ajar berhasil ditambahkan!',
          timer: 1500,
          showConfirmButton: false
        });
        this.resetForm();
      }
    },
    cancelEdit() {
      mutations.setEditingItem(null);
      this.resetForm();
    },
    resetForm() {
      this.form = {
        judul: '',
        kategori: '',
        jumlah: 0,
        harga: 0,
        deskripsi: '',
        tersedia: true
      };
      this.errors = {};
    }
  }
}
</script>

<style scoped>
/* Custom styles removed in favor of Bootstrap classes */
</style>
