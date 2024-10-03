<template>
  <div id="container" :style="style">
    <label :for="`input-${label}`">{{ label }}</label>
    <div id="container-input">
      <input :type="type" :id="`input-${label}`" v-model="internalValue" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  label: String,
  style: Object,
  type: String,
});

const internalValue = defineModel("internal_value");
</script>

<style scoped>
#container {
  margin: 5px 0 0 5px;
}

input {
  border-radius: 5px;
  outline: none;
  border: rgba(0, 0, 0, 0.2) 1px solid;
  padding: 5px 3px;
  width: 100%;
  height: 2.5rem;
}

#container-input {
  margin: 2px 0;
  padding: 2px;
  width: 100%;
  border-radius: 5px;
}

#container-input:focus-within {
  outline: 2px solid rgba(0, 0, 0, 0.48);
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
</style>
