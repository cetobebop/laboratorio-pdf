<template>
  <div id="container">
    <exam-test-button @click="onClick" :test-name="testName"></exam-test-button>
    <q-slide-transition>
      <div v-show="visible" id="slide-container">
        <slot></slot>
      </div>
    </q-slide-transition>
  </div>
</template>

<script setup>
import { ref } from "vue";
import ExamTestButton from "./ExamTestButton.vue";

defineProps({
  testName: String,
});

const visible = ref(false);

function onClick() {
  visible.value = !visible.value;
}
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
</style>
