<template>
  <div id="container-hematology" class="row">
    <div class="col">
      <exam-form-div-input
        v-for="(item, index) of Hematologyleft"
        :type="item.type"
        :format-number-comas="item.formatNumberComas ?? false"
        :format-number-spaces="item.formatNumberSpaces ?? false"
        :label="item.label"
        :style="item.style"
        v-model:internal_value="examStore.hematologyUnformatted[item.property]"
        :key="index"
      ></exam-form-div-input>
    </div>
    <div class="col">
      <exam-form-div-input
        v-for="(item, index) of hematologyRight"
        :type="item.type"
        :validate-in-group="true"
        :format-number-comas="item.formatNumberComas ?? false"
        :format-number-spaces="item.formatNumberSpaces ?? false"
        :label="item.label"
        :style="item.style"
        v-model:internal_value="examStore.hematologyUnformatted[item.property]"
        :key="index"
        :rules="item.rules"
        :form-name="item.formName"
      ></exam-form-div-input>
    </div>
  </div>
</template>

<script setup>
import { useExamStore } from "src/stores/exams";
import ExamFormDivInput from "./ExamFormDivInput.vue";
import { validateAdd } from "src/validations/validateAdd";

const initializeRules = () => {
  hematologyRight.forEach((item, index) => {
    const randomValue = Math.random();
    item.rules = [validateAdd(`hematology_id`, randomValue)];
  });
};

const Hematologyleft = [
  {
    type: "text",
    formatNumberComas: true,
    label: "Hemoglobina",
    style: { width: "75%" },
    property: "hemoglobina",
  },
  {
    type: "text",
    formatNumberSpaces: true,
    addSpaces: true,
    label: "Hematocrito",
    style: { width: "75%" },
    property: "hematocrito",
  },
  {
    type: "text",
    formatNumberSpaces: true,
    addSpaces: true,
    label: "CHCM",
    style: { width: "75%" },
    property: "chcm",
  },
  {
    type: "text",
    formatNumberSpaces: true,
    addSpaces: true,
    label: "Leucocitos",
    style: { width: "75%" },
    property: "leucocitos",
  },
  {
    type: "text",
    formatNumberSpaces: true,
    addSpaces: true,
    label: "Plaquetas",
    style: { width: "75%" },
    property: "plaquetas",
  },
];

const hematologyRight = [
  {
    type: "text",
    label: "Neutrofilos",
    style: { width: "75%" },
    property: "neutrofilos",
    formName: "hematologia",
  },
  {
    type: "text",
    label: "Linfocitos",
    style: { width: "75%" },
    property: "linfocitos",
    formName: "hematologia",
  },
  {
    type: "text",
    label: "Eosinófilos",
    style: { width: "75%" },
    property: "eosinofilos",
    formName: "hematologia",
  },
  {
    type: "text",
    label: "Monocitos",
    style: { width: "75%" },
    property: "monocitos",
    formName: "hematologia",
  },
  {
    type: "text",
    label: "Cayado",
    style: { width: "75%" },
    property: "cayado",
    formName: "hematologia",
  },
  {
    type: "text",
    label: "Blastos",
    style: { width: "75%" },
    property: "blastos",
    formName: "hematologia",
  },
];

initializeRules();

const examStore = useExamStore();
</script>

<style scoped>
#container-hematology {
  padding: 0 0px 10px 5px;
}
</style>
