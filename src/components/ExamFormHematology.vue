<template>
  <div id="container-hematology" class="row">
    <div class="col">
      <exam-form-div-input
        type="number"
        label="Hemoglobina"
        style="width: 75%"
        v-model:internal_value="hematologia.hemoglobina"
      ></exam-form-div-input>
      <exam-form-div-input
        type="number"
        label="Hematocrito"
        style="width: 75%"
        v-model:internal_value="hematologia.hematocrito"
      ></exam-form-div-input>
      <exam-form-div-input
        type="number"
        label="CHCM"
        style="width: 75%"
        v-model:internal_value="hematologia.chcm"
      ></exam-form-div-input>
      <exam-form-div-input
        type="number"
        label="Leucocitos"
        style="width: 75%"
        v-model:internal_value="hematologia.leucocitos"
      ></exam-form-div-input>
      <exam-form-div-input
        type="number"
        label="Plaquetas"
        style="width: 75%"
        v-model:internal_value="hematologia.plaquetas"
      ></exam-form-div-input>
    </div>
    <div class="col">
      <exam-form-div-input
        type="number"
        label="Neutrofilos"
        style="width: 75%"
        v-model:internal_value="hematologia.neutrofilos"
      ></exam-form-div-input>
      <exam-form-div-input
        type="number"
        label="Linfocitos"
        style="width: 75%"
        v-model:internal_value="hematologia.linfocitos"
      ></exam-form-div-input>
      <exam-form-div-input
        type="number"
        label="Eosinófilos"
        style="width: 75%"
        v-model:internal_value="hematologia.eosinofilos"
      ></exam-form-div-input>
      <exam-form-div-input
        type="number"
        label="Monocitos"
        style="width: 75%"
        v-model:internal_value="hematologia.monocitos"
      ></exam-form-div-input>
      <exam-form-div-input
        type="number"
        label="Cayado"
        style="width: 75%"
        v-model:internal_value="hematologia.cayado"
      ></exam-form-div-input>
      <exam-form-div-input
        type="number"
        label="Blastos"
        style="width: 75%"
        v-model:internal_value="hematologia.blastos"
      ></exam-form-div-input>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, watchEffect } from "vue";
import ExamFormDivInput from "./ExamFormDivInput.vue";

const hematologia = ref({});

watchEffect(() => {
  console.log(hematologia.value);
});
</script>

<style scoped>
#container-hematology {
  padding: 0 0 10px 0;
}
</style>
