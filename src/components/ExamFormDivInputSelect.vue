<template>
  <div id="container" :style="style">
    <div class="relative-position">
      <q-select dense :options="optionsModel" v-model="selectValue">
        <template v-slot:before>
          <div class="title text-dark dark:text-white">{{ label }}</div>
        </template>
      </q-select>
      <div id="container-input">
        <input :type="type" :id="`input-${label}`" v-model="internalValue" />
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  label: String,
  style: Object,
  type: String,
  refs: Object,
  optionsModel: Array,
});

const internalValue = defineModel("internal_value");
const selectValue = defineModel("select_value");
</script>

<style scoped>
#container {
  margin: 5px 0 0 0;
}

.title {
  font-size: 0.7em;
  font-family: "Roboto", "-apple-system", "Helvetica Neue", Helvetica, Arial,
    sans-serif;
}

input {
  border-radius: 5px;
  outline: none;
  border: rgba(0, 0, 0, 0.2) 1px solid;
  padding: 5px 3px;
  width: 100%;
  height: 2.5rem;
}

.input-error-active {
  transition: linear 0.1s;
  border: #ff3333 solid 2px;
}

#container-input {
  width: 100%;
  border-radius: 5px;
  padding: 3px 2px;
  background: white;
}

#container-input:focus-within {
  outline: 2px solid rgba(0, 0, 0, 0.48);
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* input[type="number"] {
    -moz-appearance: textfield;
  } */
</style>
