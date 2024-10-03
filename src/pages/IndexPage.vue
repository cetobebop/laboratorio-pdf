<template>
  <q-page class="">
    <the-exam-menu></the-exam-menu>
    <q-btn @click="onClick">press</q-btn>
    <a :href="urla" target="_blank">aaa</a>
  </q-page>
</template>

<script setup>
import { PDFDocument, StandardFonts, rgb, PageSizes } from "pdf-lib";
import { ref } from "vue";
import TheExamMenu from "src/components/TheExamMenu.vue";

const urla = ref(null);

async function onClick() {
  const pdfDoc = await PDFDocument.create();
  const fontFamilyBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontFamilyNormal = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const page = pdfDoc.addPage(PageSizes.Letter);
  const { width, height } = page.getSize();
  const fontSize = 15;

  const anchorX = width / 6.5;
  const anchorXCenter = width / 2 - 80;
  const anchorXRight = width - (anchorX + 170);
  const anchorY = height - height / 8;
  const posY = anchorY - 30;

  page.drawText("HEMATOLOGIA", {
    x: width / 2 - 60,
    y: anchorY,
    size: fontSize,
    font: fontFamilyBold,
    color: rgb(0, 0, 0),
  });

  function hematologyProperty(
    propertyName,
    propertyValue,
    unit,
    anchorX,
    posY
  ) {
    page.drawText(propertyName + ":", {
      x: anchorX,
      y: posY,
      size: 9,
      font: fontFamilyNormal,
      color: rgb(0, 0, 0),
    });

    page.drawText(propertyValue, {
      x: anchorX + 65,
      y: posY,
      size: 9,
      font: fontFamilyNormal,
      color: rgb(0, 0, 0),
    });

    page.drawLine({
      start: { x: anchorX + 60, y: posY - 2 },
      end: { x: anchorX + 135, y: posY - 2 },
      thickness: 0.3,
      color: rgb(0, 0, 0),
    });

    page.drawText(unit, {
      x: anchorX + 140,
      y: posY,
      size: 9,
      font: fontFamilyNormal,
      color: rgb(0, 0, 0),
    });
  }

  // page.drawLine({
  //   start: { x: width / 2, y: 0 },
  //   end: { x: width / 2, y: height },
  //   thickness: 0.3,
  //   color: rgb(0, 0, 0),
  // });

  hematologyProperty("Hemoglobina", "13,8", "g/dl", anchorX, posY);
  hematologyProperty("Hematocrito", "37", "%", anchorX, posY - 11);
  hematologyProperty("CHCM", "", "g%", anchorX, posY - 22);
  hematologyProperty("Leucocitos", "5 300", "xmm\u00B3", anchorX, posY - 33);
  hematologyProperty("Plaquetas", "260 000", "xmm\u00B3", anchorX, posY - 44);

  hematologyProperty("Neutrofilos", "54", "%", anchorXRight, posY);
  hematologyProperty("Linfositos", "45", "%", anchorXRight, posY - 11);
  hematologyProperty("Eosinófilos", "01", "%", anchorXRight, posY - 22);
  hematologyProperty("Monocitos", "", "%", anchorXRight, posY - 33);
  hematologyProperty("Cayado", "", "%", anchorXRight, posY - 44);

  // for (property in hematology) {
  //   const { propertyName, propertyValue } = property;

  //   hematologyProperty(
  //     propertyName,
  //     propertyValue.value,
  //     propertyValue.unit,
  //     anchorX,
  //     posY
  //   );
  // }

  // hematologyProperty("Hemoglobina", "13,8", "g/dl", anchorXCenter, posY);
  // hematologyProperty("Hematocrito", "37", "%", anchorXCenter, posY - 11);
  // hematologyProperty("CHCM", "", "g%", anchorXCenter, posY - 22);
  // hematologyProperty(
  //   "Leucocitos",
  //   "5 300",
  //   "xmm\u00B3",
  //   anchorXCenter,
  //   posY - 33
  // );
  // hematologyProperty(
  //   "Plaquetas",
  //   "260 000",
  //   "xmm\u00B3",
  //   anchorXCenter,
  //   posY - 44
  // );

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  urla.value = url;
}
</script>
