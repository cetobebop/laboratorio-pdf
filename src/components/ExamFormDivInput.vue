<template>
  <div id="container" :style="style">
    <label :for="`input-${label}`">{{ label }}</label>
    <div class="relative-position">
      <div id="container-input">
        <input
          :placeholder="placeholder"
          :type="type"
          :id="`input-${label}`"
          ref="inputRef"
          v-model="internalValue"
        />
      </div>
      <exam-form-div-input-error-message
        :internalValue="internalValue"
        :rules="rules"
        :idForm="formName"
        :id-input="idInput"
        :validate-in-group="validateInGroup"
        @validate-data="validation"
      ></exam-form-div-input-error-message>
    </div>
  </div>
</template>

<script setup>
import ExamFormDivInputErrorMessage from "./ExamFormDivInputErrorMessage.vue";
import { ref, onMounted, watch } from "vue";
import { useValidatorInput } from "src/stores/inputValidator";

const props = defineProps({
  label: String,
  formatNumberSpaces: { type: Boolean, default: false },
  formatNumberComas: { type: Boolean, default: false },
  placeholder: { type: String, default: "" },
  style: Object,
  type: String,
  refs: Object,
  rules: { type: Array, default: () => [] },
  formName: String,
  validateInGroup: { type: Boolean, default: false },
});

const validatorInput = useValidatorInput();

const idInput = Math.random().toString();

const internalValue = defineModel("internal_value");

const inputRef = ref(null);

function validation({ status, msg }) {
  if (status) {
    inputRef.value.classList?.add("input-error-active");
    inputRef.value.status = "bad";
  } else {
    inputRef.value.classList?.remove("input-error-active");
    inputRef.value.status = "fine";
  }
}

const addSpaces = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

const removeNonNumeric = (num) => num.toString().replace(/[^0-9]/g, "");

const removeNonNumericAndComas = (num) => {
  const cleaned = num.toString().replace(/[^0-9,]/g, "");
  return cleaned.replace(/,/g, (match, offset, string) =>
    string.indexOf(",") === offset ? "," : ""
  );
};
onMounted(() => {
  if (props.rules.length) {
    validatorInput.setInputNodes(inputRef.value);
    inputRef.value.status = "pending";
  }

  if (inputRef.value.type === "text") {
    if (props.formatNumberComas) {
      inputRef.value.addEventListener("input", handleComas);
    }
    if (props.formatNumberSpaces) {
      watch(internalValue, (newValue) => {
        internalValue.value = handleChangeText(newValue);
      });
    }
  }
});

const handleChangeText = (value = "") => {
  return addSpaces(removeNonNumeric(value));
};

const handleComas = (event) =>
  (event.target.value = removeNonNumericAndComas(event.target.value));
</script>

<style scoped>
#container {
  margin: 5px 0 0 0;
}

.input-error-active {
  transition: linear 0.1s;
  border: #ff3333 solid 2px;
}

input {
  border-radius: 5px;
  outline: none;
  border: rgba(0, 0, 0, 0.2) 1px solid;
  padding: 5px 3px;
  width: 100%;
  height: 2.5rem;
  transition: linear 0.1s;
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
