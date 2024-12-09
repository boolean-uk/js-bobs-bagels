<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  }
};
</script>

<template>
  <div>
    <h2>Your Basket:</h2>
    <div v-if="items.length > 0">
      <p v-for="(item, index) in items" :key="index">
        <strong>SKU:</strong> {{ item.sku }}<br />
        <strong>Price:</strong> {{ item.price }}<br />
        <strong>Variant:</strong> {{ item.variant }}
        <br />
      </p>
    </div>
    <div v-else>
      <p>Your basket is empty.</p>
    </div>
  </div>
</template>

<style scoped>

</style>