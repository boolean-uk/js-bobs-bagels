<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  methods: {
    sendDataToParent(item) {
      this.$emit('removeData', item);
    }
  }
}
</script>

<template>
  <dialog id="remove_modal" class="modal">
    <form method="dialog" class="modal-box">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      <h3 class="font-bold text-2xl">Remove a product</h3>
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
              <button class="btn" @click="sendDataToParent(index)">Remove</button>
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