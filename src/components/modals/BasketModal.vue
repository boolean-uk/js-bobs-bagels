<script>
export default {
  data() {
    return {
      price: 0
    }
  },
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  computed: {
    totalPrice() {
      return this.items.reduce((total, item) => total + parseFloat(item.price), 0);
    }
  }
}
</script>

<template>
  <dialog id="basket_modal" class="modal">
    <form method="dialog" class="modal-box">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      <h3 class="font-bold text-2xl">Here is your basket.</h3>
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
          </tr>
          </tbody>
        </table>
      </div>
      <p>Total price: {{totalPrice}}</p>
    </form>
  </dialog>
</template>

<style scoped>

</style>