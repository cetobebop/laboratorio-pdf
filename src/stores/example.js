import { defineStore } from "pinia";
import { ref } from "vue";

export const useExampleStore = defineStore("example", () => {
  const state = ref(null);

  function h(state) {
    state.value = state;
  }

  return { state, h };
});
