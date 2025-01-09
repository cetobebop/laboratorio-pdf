<template>
  <div class="title">Carac. Físicas</div>
  <div class="container-orina row">
    <div class="col">
      <exam-form-div-input
        v-for="(test, index) in orinaFisica.left"
        :type="test.type"
        :label="test.label"
        :style="test.style"
        v-model:internal_value="
          examStore.orinaUnformatted.fisicas[test.property]
        "
        :key="index"
      ></exam-form-div-input>
    </div>
    <div class="col">
      <exam-form-div-input
        v-for="(test, index) in orinaFisica.rigth"
        :type="test.type"
        :label="test.label"
        :style="test.style"
        v-model:internal_value="
          examStore.orinaUnformatted.fisicas[test.property]
        "
        :key="index"
      ></exam-form-div-input>
    </div>
  </div>
  <div class="title">Carac. Químicas</div>
  <div class="container-orina row">
    <div class="col">
      <exam-form-div-input
        v-for="(test, index) in orinaQuimica.left"
        :type="test.type"
        :label="test.label"
        :style="test.style"
        v-model:internal_value="
          examStore.orinaUnformatted.quimicas[test.property]
        "
        :key="index"
      ></exam-form-div-input>

      <exam-form-div-input-add-property
        v-for="(newProperty, index) in newPropertiesQuimica"
        :count="`${index + 1}.`"
        :style="orinaMicro.left[0].style"
        :type="newProperty.type"
        v-model:value_value="
          examStore.orinaUnformatted.quimicas[
            keyValuesContainer[newProperty.newPos]
          ]
        "
        v-model:key_value.capitalize="keyValuesContainer[newProperty.newPos]"
        :key="index"
      ></exam-form-div-input-add-property>
      <q-btn @click="onClick" class="q-mt-sm" icon="add" id="quimicas"></q-btn>
    </div>
    <div class="col">
      <exam-form-div-input
        v-for="(test, index) in orinaQuimica.rigth"
        :type="test.type"
        :label="test.label"
        :style="test.style"
        v-model:internal_value="
          examStore.orinaUnformatted.quimicas[test.property]
        "
        :key="index"
      ></exam-form-div-input>
    </div>
  </div>
  <div class="title">Examen Microscópico</div>
  <div class="container-orina row">
    <div class="col">
      <exam-form-div-input
        v-for="(test, index) in orinaMicro.left"
        :type="test.type"
        :label="test.label"
        :style="test.style"
        v-model:internal_value="examStore.orinaUnformatted.micro[test.property]"
        :key="index"
      ></exam-form-div-input>

      <exam-form-div-input-select
        type="text"
        label="Células"
        :style="orinaMicro.left[0].style"
        v-model:internal_value="
          examStore.orinaUnformatted.micro[`celulas${selectCelulas.value}`]
        "
        :options-model="celulaOptions"
        v-model:select_value="selectCelulas"
      ></exam-form-div-input-select>

      <exam-form-div-input-add-property
        v-for="(newProperty, index) in newPropertiesMicro"
        :count="`${index + 1}.`"
        :style="orinaMicro.left[0].style"
        :type="newProperty.type"
        v-model:value_value="
          examStore.orinaUnformatted.micro[
            removeWhiteSpaces(keyValuesContainer[newProperty.newPos])
          ]
        "
        v-model:key_value.capitalize="keyValuesContainer[newProperty.newPos]"
        :key="index"
      ></exam-form-div-input-add-property>

      <q-btn @click="onClick" class="q-mt-sm" icon="add" id="micro"></q-btn>
    </div>
    <div class="col">
      <exam-form-div-input
        v-for="(test, index) in orinaMicro.rigth"
        :type="test.type"
        :label="test.label"
        :style="test.style"
        v-model:internal_value="examStore.orinaUnformatted.micro[test.property]"
        :key="index"
      ></exam-form-div-input>

      <exam-form-div-input-select
        type="text"
        label="Cristales"
        :style="orinaMicro.rigth[0].style"
        v-model:internal_value="
          examStore.orinaUnformatted.micro[`cristales${selectCristales.value}`]
        "
        :options-model="cristalesOptions"
        v-model:select_value="selectCristales"
      ></exam-form-div-input-select>
    </div>
  </div>
</template>

<script setup>
import { useExamStore } from "src/stores/exams";
import ExamFormDivInput from "./ExamFormDivInput.vue";
import ExamFormDivInputAddProperty from "./ExamFormDivInputAddProperty.vue";
import ExamFormDivInputSelect from "./ExamFormDivInputSelect.vue";
import { orinaFisica, orinaQuimica, orinaMicro } from "src/inputObjects/orina";

import { ref } from "vue";

const examStore = useExamStore();

const newPropertiesQuimica = ref([]);
const newPropertiesMicro = ref([]);

let count = 0;

const keyValuesContainer = ref({});

const selectCelulas = ref({ label: "- - - - -", value: "" });
const selectCristales = ref({ label: "- - - - -", value: "" });

const celulaOptions = [
  { label: "Uretrales superficiales", value: "_uretrales_superficiales" },
  { label: "Redondas", value: "_redondas" },
  { label: "Epiteliales", value: "_epiteliales" },
  { label: "- - - - -", value: "" },
  ,
];

const cristalesOptions = [
  { label: "de Oxalato de calcio", value: "_oxalato_calcio" },
  { label: "de Oxalato de calcio grandes", value: "_oxalato_calcio_grandes" },
  { label: "de Oxalato de calcio pequeños", value: "_oxalato_calcio_pequenos" },
  { label: "- - - - -", value: "" },
];

function removeWhiteSpaces(string) {
  return string?.trim();
}

function onClick(e) {
  const pos = e.target.closest(".q-btn").id;
  const newInput = {
    type: "text",
    style: orinaFisica.left[0].style,
    newPos: `_${count}`,
  };
  if (pos == "micro") newPropertiesMicro.value.push(newInput);
  else if (pos == "quimicas") newPropertiesQuimica.value.push(newInput);
  count++;
}
</script>

<style scoped>
.title {
  padding: 0 0 0 5px;
  margin: 7px 0;
  font-weight: 700;
}

.container-orina {
  padding: 0 0px 10px 5px;
}
</style>
