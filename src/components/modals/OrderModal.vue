<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    },
    basketCapacity: {
      type: Number,
      required: true
    },
    basketItems: {
      type: Number,
      required: true
    }
  },
  methods: {
    sendDataToParent(item) {
      if (this.basketItems >= this.basketCapacity){
        alert("Invalid operation. The basket is full. Please remove items or increase basket capacity.")
      } else {
        this.$emit('orderData', item);
      }
    },
  }
}
</script>

<template>
  <dialog id="order_modal" class="modal">
    <form method="dialog" class="modal-box">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      <h3 class="font-bold text-2xl">Choose your order</h3>
      <div class="overflow-x-auto">
        <table class="table">
          <thead>
          <tr>
            <th></th>
            <th>SKU</th>
            <th>Price</th>
            <th>Name</th>
            <th>Variant</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) in items" :key="index">
            <th>{{ index + 1 }}</th>
            <td>{{ item.sku }}</td>
            <td>{{ item.price }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.variant }}</td>
            <td>
              <button class="btn" @click="sendDataToParent(item)">Order</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </form>
  </dialog>
</template>

<style scoped>

</style>