<template>
  <div class="title">Datos</div>
  <div class="container-heces row">
    <div class="col">
      <exam-form-div-input
        v-for="(test, index) in pacienteLeft"
        :type="test.type"
        :label="test.label"
        :style="test.style"
        v-model:internal_value="examStore.patientUnformatted[test.property]"
        :rules="test.rules"
        form-name="paciente"
        :key="index"
      ></exam-form-div-input>

      <exam-form-div-input-select-value
        label="Edad"
        type="text"
        max="150"
        :style="pacienteLeft[0].style"
        v-model:select_value="examStore.patientUnformatted['period']"
        v-model:internal_value.concatSelect="
          examStore.patientUnformatted['edad']
        "
        :rules="edadRules"
        :options-model="edadOptions"
        :formatNumberSpaces="true"
        form-name="paciente"
      ></exam-form-div-input-select-value>
    </div>

    <div class="col">
      <exam-form-div-input
        v-for="(test, index) in pacienteRight"
        :type="test.type"
        :label="test.label"
        :style="test.style"
        v-model:internal_value="examStore.patientUnformatted[test.property]"
        :rules="test.rules"
        :key="index"
        form-name="paciente"
      ></exam-form-div-input>
    </div>
  </div>
</template>

<script setup>
import { useExamStore } from "src/stores/exams";
import ExamFormDivInput from "./ExamFormDivInput.vue";
import ExamFormDivInputSelectValue from "./ExamFormDivInputSelectValue.vue";
import { onMounted, ref } from "vue";
import { require } from "src/validations/require";
import { requireDate } from "src/validations/requireDate";

const examStore = useExamStore();

onMounted(() => {
  examStore.patientUnformatted["period"] = "Años";
});

const edadOptions = ["Años", "Meses"];

const edadRules = [require({ name: "Edad" })];
const pacienteLeft = [
  {
    type: "text",
    label: "Nombre",
    property: "name",
    style: { width: "98%" },
    rules: [require({ name: "Nombre" })],
  },
];

const pacienteRight = [
  {
    type: "date",
    label: "Fecha",
    property: "date",
    style: { width: "98%" },
    rules: [requireDate({ name: "Fecha" })],
  },
  {
    type: "number",
    label: "Nro",
    property: "nro",
    style: { width: "98%" },
    rules: [require({ name: "Nro" })],
  },
];
</script>

<style scoped>
.title {
  padding: 0 0 0 5px;
  margin: 7px 0;
  font-weight: 700;
}

.container-heces {
  padding: 0 0px 10px 5px;
}
</style>
