<template>
  <div id="container" :style="style">
    <div class="">
      <label :for="`input-${label}`">{{ label }}</label>

      <div class="row">
        <div class="col relative-position q-mr-xs">
          <div id="container-input">
            <input
              :type="type"
              :id="`input-${label}`"
              ref="inputRef"
              v-model="internalValue"
            />
          </div>
          <exam-form-div-input-error-message
            :internalValue="internalValue"
            :input-ref="inputRef"
            :rules="rules"
            :idForm="formName"
            :id-input="idInput"
            @validate-data="validation"
          ></exam-form-div-input-error-message>
        </div>

        <q-select
          dense
          class="col"
          :options="optionsModel"
          v-model="selectValue"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import ExamFormDivInputErrorMessage from "./ExamFormDivInputErrorMessage.vue";

import { ref, watch } from "vue";
import { onMounted } from "vue";

const props = defineProps({
  label: String,
  style: Object,
  formatNumberSpaces: { type: Boolean, default: false },
  max: String,
  type: String,
  refs: Object,
  optionsModel: Array,
  rules: { type: Array, default: () => [] },
  formName: String,
});

const inputRef = ref(null);
const internalValue = defineModel("internal_value");
const selectValue = defineModel("select_value");
const idInput = Math.random().toString();

onMounted(() => {
  if (props.max) inputRef.value.addEventListener("input", limitValue);

  if (inputRef.value.type === "text" && props.formatNumberSpaces) {
    watch(internalValue, (newValue) => {
      internalValue.value = handleChangeText(newValue);
    });
  }
});

function limitValue(e) {
  const max = props.max;
  if (parseInt(e.target.value) > max) {
    e.target.value = max;
  }
}

function validation({ status }) {
  if (status) {
    inputRef.value?.classList?.add("input-error-active");
    inputRef.value.status = "bad";
  } else {
    inputRef.value?.classList?.remove("input-error-active");
    inputRef.value.status = "fine";
  }
}

const handleChangeText = (value = "") => {
  return removeNonNumeric(value);
};

const removeNonNumeric = (num) => num.toString().replace(/[^0-9]/g, "");
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
