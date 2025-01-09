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
      <div class="container-error">
        <div class="error-absolute error-inactive" ref="error_container">
          <q-icon name="error" /> {{ errorMsg }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { validationHandler } from "src/utils/validationhandler";
import { useValidatorInput } from "src/stores/inputValidator";
import moment from "moment";

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
});

const validatorInput = useValidatorInput();

const errorMsg = ref("");
const error_container = ref(null);

const internalValue = defineModel("internal_value");

const inputRef = ref(null);

const addSpaces = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

const removeNonNumeric = (num) => num.toString().replace(/[^0-9]/g, "");

const removeNonNumericAndComas = (num) => {
  const cleaned = num.toString().replace(/[^0-9,]/g, "");
  return cleaned.replace(/,/g, (match, offset, string) =>
    string.indexOf(",") === offset ? "," : ""
  );
};
onMounted(() => {
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

  if (props.rules.length) {
    watch(internalValue, (newValue) => {
      const validationHasAnError = validationHandler(newValue, props.rules);
      if (validationHasAnError.status) {
        errorMsg.value = validationHasAnError.msg;
        error_container.value.classList.add("error-active");
        inputRef.value.classList.add("input-error-active");
        validatorInput.addErrorForm(props.formName);
      } else {
        error_container.value.classList.remove("error-active");
        inputRef.value.classList.remove("input-error-active");
        validatorInput.removeErrorForm(props.formName);
      }
    });
  }

  if (inputRef.value.type === "date") {
    internalValue.value = moment().format("YYYY-MM-DD");
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
.container-error {
  min-height: 20px;
}
.error-absolute {
  padding: 0 3px;
  font-size: 0.9em;
  position: absolute;
  z-index: -100;
  color: #ff3333;
  font-weight: 500;
  top: 0;
  transition: linear 0.2s;
}

.error-active {
  top: 47px;
  transition: linear 0.2s;
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
