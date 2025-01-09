import { ref, computed, shallowRef, triggerRef } from "vue";
import { defineStore } from "pinia";

export const useValidatorInput = defineStore("validator", () => {
  const globalErrorStatus = ref(false);
  const listFormsWithInputErrors = shallowRef(new Map());
  const formHideStatus = ref("");
  const lastErrorForm = ref("");
  const errorFormBoolean = ref(false);
  const buttonGlobalValidationBoolean = ref(false);
  const inputNodes = ref([]);

  function setInputNodes(inputNode) {
    inputNodes.value.push(inputNode);
  }

  async function evaluateGlobalStatus() {
    let nodeStatus;

    const arrayNodes = Array.from(inputNodes.value);
    return new Promise((res) => {
      let status;

      const interval = setInterval(() => {
        nodeStatus = arrayNodes.map((e) => e.status);
        console.log(nodeStatus, " nodeStatus");
        if (nodeStatus.includes("bad")) {
          status = "bad";
          clearInterval(interval);
          res(status);
        } else if (!nodeStatus.includes("pending")) {
          status = "fine";
          clearInterval(interval);
          res(status);
        }
      }, 50);
    });
  }

  const getButtonGlobalValidationBoolean = computed(
    () => buttonGlobalValidationBoolean.value
  );

  function changeButtonGlobalValidationBoolean() {
    buttonGlobalValidationBoolean.value = !buttonGlobalValidationBoolean.value;
    console.log(globalErrorStatus.value, " globalerror");
  }

  const getLastErrorForm = computed(() => lastErrorForm.value);

  const getErrorBoolean = computed(() => errorFormBoolean.value);

  function setGlobalStatus(newStatus) {
    globalErrorStatus.value = newStatus;
  }

  const getGlobalStatus = computed(() => globalErrorStatus.value);

  function setFormHideStatus(formId) {
    formHideStatus.value = formId;
  }

  const getFormHideStatus = computed(() => formHideStatus.value);

  function findErrorForm(idForm) {
    return listFormsWithInputErrors.value.has(idForm);
  }

  function addErrorForm(idForm, idInput) {
    const queryFind = listFormsWithInputErrors.value.get(idForm);
    if (!queryFind?.size) {
      listFormsWithInputErrors.value.set(idForm, new Set([idInput]));
    } else listFormsWithInputErrors.value.set(idForm, queryFind.add(idInput));

    lastErrorForm.value = idForm;
    triggerRef(listFormsWithInputErrors);
  }

  function removeErrorForm(idForm, idInput, { changeErrorBoolean = false }) {
    const queryFind = listFormsWithInputErrors.value.get(idForm);

    if (queryFind?.size) {
      queryFind.delete(idInput);
      listFormsWithInputErrors.value.set(idForm, queryFind);

      if (!queryFind?.size) listFormsWithInputErrors.value.delete(idForm);
    } else listFormsWithInputErrors.value.delete(idForm);

    if (changeErrorBoolean) errorFormBoolean.value = !errorFormBoolean.value;
    triggerRef(listFormsWithInputErrors);
  }

  const getListformWithInputErrors = computed(
    () => listFormsWithInputErrors.value
  );
  const getListformWithInputErrorsLength = computed(
    () => listFormsWithInputErrors.value.size
  );

  return {
    setGlobalStatus,
    getGlobalStatus,
    getListformWithInputErrors,
    getListformWithInputErrorsLength,
    getErrorBoolean,
    getButtonGlobalValidationBoolean,
    changeButtonGlobalValidationBoolean,
    findErrorForm,
    addErrorForm,
    removeErrorForm,
    setFormHideStatus,
    setInputNodes,
    evaluateGlobalStatus,
    getFormHideStatus,
    getLastErrorForm,
  };
});
