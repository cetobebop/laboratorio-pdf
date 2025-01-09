import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useSlideExamFormController = defineStore(
  "slideExamFormController",
  () => {
    const status = ref("paciente");
    const statusPrev = ref(null);
    const getStatus = computed(() => status.value);
    const setStatus = (newStatus) => {
      status.value = newStatus;
    };
    const getStatusPrev = computed(() => statusPrev.value);
    const setStatusPrev = (newStatus) => {
      statusPrev.value = newStatus;
    };
    return { getStatus, setStatus, getStatusPrev, setStatusPrev };
  }
);
