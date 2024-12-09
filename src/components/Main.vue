<script>
import Basket from "@/components/Basket.vue"
import OrderModal from "@/components/modals/OrderModal.vue";
import RemoveModal from "@/components/modals/RemoveModal.vue";
import BasketModal from "@/components/modals/BasketModal.vue";
import SettingsModal from "@/components/modals/SettingsModal.vue";

export default {
  components: { SettingsModal, BasketModal, RemoveModal, OrderModal, Basket },
  data() {
    return {
      inventoryData: null,
      basketItems: [],
      basketCapacity: 3
    };
  },
  created() {
    this.loadInventoryData();
  },
  methods: {
    async loadInventoryData() {
      try {
        const response = await fetch("inventory-modified.json");
        const data = await response.json();

        this.inventoryData = data.inventory;
      } catch (error) {
        console.error(error);
      }
    },
    handleOrderData(payload) {
      this.basketItems.push(payload)
    },
    handleRemoveData(payload) {
      this.basketItems.splice(payload, 1);
    },
    handleSizeSelected(payload) {
      this.basketCapacity = payload;
    }
  }
};
</script>

<template>
  <OrderModal :items="inventoryData" :basketCapacity="basketCapacity" :basketItems="basketItems.length" @orderData="handleOrderData"></OrderModal>
  <RemoveModal :items="basketItems" @removeData="handleRemoveData"></RemoveModal>
  <BasketModal :items="basketItems"></BasketModal>
  <SettingsModal :basketItems="basketItems.length" @sizeSelected="handleSizeSelected"></SettingsModal>
  <button class="btn m-5 shadow-xl" onclick="settings_modal.showModal()">Basket Settings</button>
  <div class="flex justify-between">
    <div class="">
      <div class="card card-compact w-96 h-96 bg-base-100 shadow-xl">
        <figure><img src="bagel.png" alt="Order" /></figure>
        <div class="card-body">
          <h2 class="card-title">Order a product</h2>
          <p>Choose from wide selection of our premium products</p>
          <div class="card-actions justify-end">
            <button class="btn" onclick="order_modal.showModal()">Order</button>
          </div>
        </div>
      </div>
    </div>
    <div class="">
      <div class="card card-compact w-96 h-96 bg-base-100 shadow-xl">
        <figure><img src="coffee.png" alt="Remove" /></figure>
        <div class="card-body">
          <h2 class="card-title">Remove a product</h2>
          <p>Seconds guesses? Get rid of it.</p>
          <div class="card-actions justify-end">
            <button class="btn" onclick="remove_modal.showModal()">Remove</button>
          </div>
        </div>
      </div>
    </div>
    <div class="">
      <div class="card card-compact w-96 h-96 bg-base-100 shadow-xl">
        <figure><img src="basket.png" alt="basket" /></figure>
        <div class="card-body">
          <h2 class="card-title">Check your basket</h2>
          <p>Be careful not to spend too much!</p>
          <div class="card-actions justify-end">
            <button class="btn" onclick="basket_modal.showModal()">Basket</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>