<template>
  <button @click="onClick">
    <q-icon class="material-symbols-outlined" name="delete" size="sm"></q-icon>
  </button>
</template>

<script setup>
import { useExamStore } from "src/stores/exams";

const examStore = useExamStore();

function onClick() {
  examStore.resetExamValues();
}
</script>

<style scoped>
button {
  outline: none;
  border: 1px rgba(223, 218, 220, 0.8) solid;
  border-radius: 5px;
  height: 40px;
  width: 40px;
  text-align: center;
}
</style>
