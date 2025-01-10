import { defineStore } from "pinia";
import { computed, ref } from "vue";
import moment from "moment";

import { createPDFExam, newPage } from "src/utils/handlerPDFExam";
import { obtainExamAnchors } from "src/utils/obtainAnchors";
import { hecesHandler } from "src/handlers/hecesHandler";
import { hematologyHandler } from "src/handlers/hematologyHandler";
import { orinaHandler } from "src/handlers/orinaHandler";
import { patientHandler } from "src/handlers/patientHandler";

export const useExamStore = defineStore("ExamStore", () => {
  const examUrl = ref(null);
  const patientUnformatted = ref({
    date: moment().format("YYYY-MM-DD"),
    period: "Años",
  });
  const hematologyUnformatted = ref({});
  const hecesUnformatted = ref({ macro: {}, micro: {} });
  const orinaUnformatted = ref({ fisicas: {}, quimicas: {}, micro: {} });
  const globalDelete = ref(false);

  const positionY = ref(null);
  const page = ref(null);

  function resetExamValues() {
    patientUnformatted.value = {
      date: moment().format("YYYY-MM-DD"),
      period: "Años",
    };
    hematologyUnformatted.value = {};
    hecesUnformatted.value = { macro: {}, micro: {} };
    orinaUnformatted.value = { fisicas: {}, quimicas: {}, micro: {} };
    globalDelete.value = !globalDelete.value;
  }

  async function joinExam() {
    const pdfDoc = await createPDFExam();

    page.value = newPage(pdfDoc);
    const size = page.value.getSize();

    const anchors = obtainExamAnchors(size);

    positionY.value = anchors.anchorY;

    await hematologyHandler(
      hematologyUnformatted.value,
      pdfDoc,
      page,
      anchors,
      positionY
    );

    await hecesHandler(
      hecesUnformatted.value,
      pdfDoc,
      page,
      anchors,
      positionY
    );

    await orinaHandler(
      orinaUnformatted.value,
      pdfDoc,
      page,
      anchors,
      positionY
    );

    await patientHandler(
      patientUnformatted.value,
      pdfDoc,
      page,
      anchors,
      positionY
    );

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    examUrl.value = url;
  }

  const getGlobalDelete = computed(() => globalDelete.value);

  return {
    patientUnformatted,
    orinaUnformatted,
    hecesUnformatted,
    hematologyUnformatted,
    examUrl,
    getGlobalDelete,
    joinExam,
    resetExamValues,
  };
});
