<script>
export default {
  props: {
    basketItems: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      inputNumber: ""
    };
  },
  methods: {
    validateAndEmit() {
      const parsedInput = parseInt(this.inputNumber, 10);

      if (!isNaN(parsedInput) && parsedInput >= this.basketItems) {
        this.$emit("sizeSelected", parsedInput);
      } else {
        alert("Invalid input. Please enter a number greater than or equal to the number of items in the basket.");
      }
    }
  }
};
</script>

<template>
  <dialog id="settings_modal" class="modal">
    <form method="dialog" class="modal-box">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      <h3 class="font-bold text-2xl">Basket settings</h3>
      <p class="p-4">Input new basket size:</p>
      <input v-model="inputNumber" type="number" placeholder="Input new basket size" class="input input-bordered w-full max-w-xs" />
      <button class="btn ml-4" @click="validateAndEmit">Submit</button>
      <p class="p-4">Current number of items in the basket: {{basketItems}}</p>
    </form>
  </dialog>
</template>

<style scoped>

</style>