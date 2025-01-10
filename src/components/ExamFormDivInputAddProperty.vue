<template>
  <div id="container" :style="style">
    <div class="relative-position">
      <label :for="`propiedad${count}`">{{ count }} Propiedad:</label>
      <div class="container-input">
        <input
          :type="type"
          :id="`propiedad${count}`"
          v-model="keyValue"
          :disabled="Boolean(value)"
        />
      </div>

      <label :for="`valor${count}`">{{ count }} Valor:</label>
      <div class="container-input">
        <input
          :type="type"
          :id="`valor${count}`"
          v-model="value"
          :disabled="!keyValue"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, watchEffect } from "vue";
import { useExamStore } from "src/stores/exams";
const examStore = useExamStore();

const channelGlobalDelete = ref(false);

const props = defineProps({
  count: String,
  style: Object,
  type: String,
});

const [keyValue, modifiers] = defineModel("key_value", {
  set(value) {
    if (modifiers.capitalize) {
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
    return value;
  },
});
const [value] = defineModel("value_value");

watchEffect(() => {
  channelGlobalDelete.value = examStore.getGlobalDelete;
});

watch(channelGlobalDelete, () => {
  keyValue.value = "";
});
</script>

<style scoped>
#container {
  margin: 5px 0 0 0;
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

.container-input {
  width: 100%;
  border-radius: 5px;
  padding: 3px 2px;
}

.container-input:focus-within {
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
