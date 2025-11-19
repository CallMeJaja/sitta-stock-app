<template>
  <div id="app" class="bg-light min-vh-100 py-4">
    <div class="container">
      <StockHeader />
      
      <div class="row g-4 mb-4">
        <div class="col-lg-6">
          <StockForm />
        </div>
        <div class="col-lg-6">
          <StockStats />
        </div>
      </div>

      <StockFilter />
      <StockList />
      <StockCart />
    </div>
  </div>
</template>

<script>
import StockHeader from './components/StockHeader.vue'
import StockForm from './components/StockForm.vue'
import StockStats from './components/StockStats.vue'
import StockFilter from './components/StockFilter.vue'
import StockList from './components/StockList.vue'
import StockCart from './components/StockCart.vue'
import { mutations } from './store/store'

export default {
  name: 'App',
  components: {
    StockHeader,
    StockForm,
    StockStats,
    StockFilter,
    StockList,
    StockCart
  },
  mounted() {
    mutations.loadFromLocalStorage();
  }
}
</script>

<style>
/* Global styles can be minimal now as we rely on Bootstrap */
body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
</style>
