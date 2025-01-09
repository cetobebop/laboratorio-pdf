<template>
  <div class="title">Examen macroscópico</div>
  <div class="container-heces row">
    <div class="col">
      <exam-form-div-input
        v-for="(test, index) in hecesLeft"
        :type="test.type"
        :label="test.label"
        :style="test.style"
        v-model:internal_value="examStore.hecesUnformatted.macro[test.property]"
        :key="index"
      ></exam-form-div-input>
    </div>
    <div class="col">
      <exam-form-div-input
        v-for="(test, index) in hecesCenter"
        :type="test.type"
        :label="test.label"
        :style="test.style"
        v-model:internal_value="examStore.hecesUnformatted.macro[test.property]"
        :key="index"
      ></exam-form-div-input>
    </div>
    <div class="col">
      <exam-form-div-input
        v-for="(test, index) in hecesRight"
        :type="test.type"
        :label="test.label"
        :style="test.style"
        v-model:internal_value="examStore.hecesUnformatted.macro[test.property]"
        :key="index"
      ></exam-form-div-input>
    </div>
  </div>
  <div class="title">Examen microscópico</div>
  <div class="container-heces row">
    <div class="col">
      <exam-form-div-input
        v-for="(test, index) in hecesMacro"
        :type="test.type"
        :label="test.label"
        :style="test.style"
        v-model:internal_value="examStore.hecesUnformatted.micro[test.property]"
        :placeholder="test?.placeholder"
        :key="index"
      ></exam-form-div-input>
      <q-btn @click="onClick" class="q-mt-sm" icon="add"></q-btn>
    </div>
  </div>
</template>

<script setup>
import { useExamStore } from "src/stores/exams";
import ExamFormDivInput from "./ExamFormDivInput.vue";
import { ref } from "vue";

const examStore = useExamStore();

const count = ref(1);
const otroInput = ref(null);

function onClick() {
  hecesMacro.value.push({
    type: "text",
    label: `Otros ${count.value + 1}`,
    property: `otros$${count.value + 1}`,
    style: { width: "90%" },
  });

  count.value += 1;
}

const hecesLeft = [
  {
    type: "text",
    label: "Aspecto",
    property: "aspecto",
    style: { width: "98%" },
  },
  {
    type: "text",
    label: "Reacción",
    property: "reaccion",
    style: { width: "98%" },
  },
];
const hecesCenter = [
  {
    type: "text",
    label: "Consistencia",
    property: "consistencia",
    style: { width: "98%" },
  },
  {
    type: "text",
    label: "Moco",
    property: "moco",
    style: { width: "98%" },
  },
];
const hecesRight = [
  {
    type: "text",
    label: "Color",
    property: "color",
    style: { width: "98%" },
  },
  {
    type: "text",
    label: "Sangre",
    property: "sangre",
    style: { width: "98%" },
  },
];

const hecesMacro = ref([
  {
    type: "text",
    label: "Protozoarios",
    property: "protozoarios",
    placeholder: "No se observaron formas Parasitarias en la muestra analizada",
    style: { width: "90%" },
  },
  {
    type: "text",
    label: "Helmintos",
    property: "helmintos",
    placeholder: "No se observaron formas Parasitarias en la muestra analizada",
    style: { width: "90%" },
  },
  {
    type: "text",
    label: "Otros",
    property: "otros",
    style: { width: "90%" },
  },
]);
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
