<template>
  <div class="container-error">
    <div class="error-absolute error-inactive" ref="error_container">
      <q-icon name="error" />
      {{ errorMsg }}
    </div>
  </div>
</template>

<script setup>
import { validationHandler } from "src/utils/validationhandler";
import { useValidatorInput } from "src/stores/inputValidator";
import { onMounted, watch, ref, watchEffect, inject } from "vue";

const validatorInput = useValidatorInput();

const errorMsg = ref("");
const error_container = ref(null);

const props = defineProps({
  rules: { type: Array, default: () => [] },
  internalValue: { type: [Number, String, Date, Object], default: null },
  idInput: { type: String, default: "" },
  idForm: { type: String, default: "" },
  validateInGroup: { type: Boolean, default: false },
});

const emits = defineEmits(["validate-data"]);

const channelInputValue = ref("");
const channelFormHideStatus = ref("");
const channelErrorBoolean = ref(false);

onMounted(() => {
  // if (props.idForm === "hematologia") console.log(props.rules);

  if (props.rules.length) {
    watchEffect(() => {
      channelInputValue.value = props.internalValue;
      channelFormHideStatus.value = validatorInput.getFormHideStatus;
      channelErrorBoolean.value = validatorInput.getErrorBoolean;
    });
    watch(channelInputValue, (newValue) => {
      validate(newValue, props.rules, props.validateInGroup);
    });
    watch(channelFormHideStatus, () => {
      if (channelFormHideStatus.value === props.idForm) {
        validate(channelInputValue.value, props.rules, props.validateInGroup);
      }
    });
    if (props.validateInGroup) {
      watch(channelErrorBoolean, () => {
        if (validatorInput.getLastErrorForm === props.idForm) {
          validate(channelInputValue.value, props.rules);
        }
      });
    }
  }
});

function validate(value, rules, changeErrorBoolean = false) {
  const { status, msg } = validationHandler(value, rules);
  if (status) {
    errorMsg.value = msg;
    error_container.value.classList.add("error-active");
    console.log(
      validatorInput.getListformWithInputErrors
        .get(props.idForm)
        ?.has(props.idInput),
      " epa"
    );
    if (
      !validatorInput.getListformWithInputErrors
        .get(props.idForm)
        ?.has(props.idInput)
    )
      validatorInput.addErrorForm(props.idForm, props.idInput);
    emits("validate-data", { status });
  } else {
    error_container.value.classList.remove("error-active");

    if (validatorInput.getGlobalStatus)
      validatorInput.removeErrorForm(props.idForm, props.idInput, {
        changeErrorBoolean,
      });

    emits("validate-data", { status });
  }
}
</script>

<style scoped>
.container-error {
  min-height: 20px;
  font-size: 0.8em;
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
</style>
