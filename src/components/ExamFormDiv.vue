<template>
  <div id="container">
    <exam-test-button
      v-model="btn"
      @click="onClick"
      :test-name="testName"
      :error-status="valueExist"
    ></exam-test-button>
    <q-slide-transition @hide="onHide">
      <div
        v-show="formDivName == slideExamFormController.getStatus"
        id="slide-container"
      >
        <slot></slot>
      </div>
    </q-slide-transition>
  </div>
</template>

<script setup>
import { onMounted, watch, ref, watchEffect } from "vue";
import ExamTestButton from "./ExamTestButton.vue";
import { useSlideExamFormController } from "src/stores/slideExamFormDivController";
import { useValidatorInput } from "src/stores/inputValidator";

const props = defineProps({
  testName: String,
  formDivName: String,
});

const slideExamFormController = useSlideExamFormController();
const validationInput = useValidatorInput();
const btn = ref(null);
const valueExist = ref(false);
const channelListformWithInputErrors = ref(null);
const channelButtonGlobalValidationBoolean = ref(false);

function onClick() {
  if (slideExamFormController.getStatus == props.formDivName)
    return slideExamFormController.setStatus(null);
  slideExamFormController.setStatus(props.formDivName);
}

function onHide() {
  validationInput.setFormHideStatus(props.formDivName);
}

watchEffect(() => {
  channelListformWithInputErrors.value =
    validationInput.getListformWithInputErrorsLength;

  channelButtonGlobalValidationBoolean.value =
    validationInput.getButtonGlobalValidationBoolean;
});

watch(channelListformWithInputErrors, () => {
  valueExist.value = validationInput.getListformWithInputErrors.has(
    props.formDivName
  );
  if (valueExist.value) {
    btn.value.classList.add("container-error");
  } else {
    btn.value.classList.remove("container-error");
  }
});

watch(channelButtonGlobalValidationBoolean, () => {
  validationInput.setFormHideStatus(props.formDivName);
});
</script>

<style scoped>
#container {
  width: 95%;
}

#slide-container {
  border: rgba(0, 0, 0, 0.2) solid 1px;
  border-top: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 0 0 5px 5px;
}

.container-error {
  /* background: #ff4545; */
  color: #ff4545;
  transition: linear 0.2s;
}
</style>
