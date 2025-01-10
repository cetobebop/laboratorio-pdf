<template>
  <div class="full-width row column content-center">
    <exam-form-div
      test-name="Paciente"
      form-div-name="paciente"
      class="container-exams"
    >
      <exam-form-paciente></exam-form-paciente>
    </exam-form-div>

    <exam-form-div
      test-name="Hematologia"
      form-div-name="hematologia"
      class="container-exams"
    >
      <exam-form-hematology></exam-form-hematology>
    </exam-form-div>

    <exam-form-div
      test-name="Heces"
      form-div-name="heces"
      class="container-exams"
    >
      <exam-form-heces></exam-form-heces>
    </exam-form-div>

    <exam-form-div
      test-name="Orina"
      form-div-name="orina"
      class="container-exams"
    >
      <exam-form-orina></exam-form-orina>
    </exam-form-div>

    <q-btn
      :disable="validatorInput.getGlobalStatus"
      color="primary"
      text-color="white"
      label="Crear"
      class="xs:q-py-md q-py-sm"
      @click="onClick"
    ></q-btn>
    <q-btn
      :disable="!Boolean(examStore.examUrl)"
      color="dark"
      text-color="white"
      label="Ver"
      class="xs:q-py-md q-py-sm q-my-xs"
      @click="onClickVer"
    ></q-btn>
  </div>
</template>

<script setup>
import ExamFormDiv from "./ExamFormDiv.vue";
import ExamFormHematology from "./ExamFormHematology.vue";
import ExamFormHeces from "./ExamFormHeces.vue";
import ExamFormOrina from "./ExamFormOrina.vue";
import ExamFormPaciente from "./ExamFormPaciente.vue";

import { useExamStore } from "src/stores/exams";
import { useValidatorInput } from "src/stores/inputValidator";

const examStore = useExamStore();
const validatorInput = useValidatorInput();

async function onClick() {
  validatorInput.changeButtonGlobalValidationBoolean();
  const status = await validatorInput.evaluateGlobalStatus();
  console.log(status, " sta");
  if (status !== "bad") examStore.joinExam();
}

async function onClickVer() {
  const a = document.createElement("a");
  a.href = examStore.examUrl;
  a.target = "_blank";
  a.click();
}
</script>

<style scoped>
.container-exams {
  padding: 0 0 5px 0;
}
.container-exams:first-child {
  padding-top: 10px;
}
</style>
