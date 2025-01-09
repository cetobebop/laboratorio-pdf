<template>
  <div ref="element">
    <span>{{ testName }}</span>
    <span class="red"
      ><q-icon v-if="errorStatus" size="sm" name="error"
    /></span>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

defineProps({
  testName: String,
  errorStatus: { type: Boolean, default: false },
});

const element = ref(null);

const model = defineModel();

onMounted(() => {
  model.value = element.value;
});
</script>

<style scoped>
.red {
  color: #ff4545;
}

div {
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  background: white;
  border-radius: 5px;
  outline: none;
  border: rgba(0, 0, 0, 0.2) 1px solid;
  padding: 0 0 0 20px;
}

span {
  font-weight: 700;
  font-family: system-ui, -apple-system, Roboto;
  font-size: 1em;
  display: inline-block;
  margin-right: 6px;
}
</style>
