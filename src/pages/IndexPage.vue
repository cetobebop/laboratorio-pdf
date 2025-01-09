<template>
  <q-page class="">
    <the-exam-menu></the-exam-menu>
  </q-page>
</template>

<script setup>
import TheExamMenu from "src/components/TheExamMenu.vue";
import { ref, watch, watchEffect } from "vue";

import { useValidatorInput } from "src/stores/inputValidator";

const validatorInput = useValidatorInput();

const channelListFormWithInputError = ref(new Map());

watchEffect(() => {
  channelListFormWithInputError.value =
    validatorInput.getListformWithInputErrorsLength;
});

watch(channelListFormWithInputError, async () => {
  if (!channelListFormWithInputError.value)
    validatorInput.setGlobalStatus(false);
  else if (channelListFormWithInputError.value)
    validatorInput.setGlobalStatus(true);
});
</script>
