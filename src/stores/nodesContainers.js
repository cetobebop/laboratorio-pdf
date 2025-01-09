import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useNodesContainer = defineStore("nodesContainer", () => {
  const indexNodes = ref(new Map());

  function setIndexNodes(idContainer, node) {
    const nodes = indexNodes.value.get(idContainer);
    if (!nodes) return indexNodes.value.set(idContainer, new Set([node]));
    indexNodes.value.set(idContainer, nodes.add(node));
  }

  const getIndexNodes = computed(() => indexNodes.value);

  return { setIndexNodes, getIndexNodes };
});
