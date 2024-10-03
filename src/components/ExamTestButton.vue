<template>
  <div>
    <span>{{ testName }}</span>
  </div>
</template>

<script setup>
defineProps({
  testName: String,
});
</script>

<style scoped>
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
}
</style>
