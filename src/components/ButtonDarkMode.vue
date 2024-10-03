<template>
  <button @click="onClick">
    <q-icon
      class="material-symbols-outlined"
      :name="nameIcon"
      size="sm"
    ></q-icon>
  </button>
</template>

<script setup>
import { getDarkModeStatus, toggleDarkStatus } from "src/utils/darkMode";
import { onMounted, ref } from "vue";

const nameIcon = ref(null);

const changeNameIcon = () => (getDarkModeStatus() ? "dark_mode" : "light_mode");

onMounted(() => {
  nameIcon.value = changeNameIcon();
});

function onClick() {
  toggleDarkStatus();
  nameIcon.value = changeNameIcon();
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
