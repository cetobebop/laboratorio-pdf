import { StandardFonts } from "pdf-lib";

import { drawHematologyProperty } from "./drawHematologyProperty.js";
import { ajustPropertyToSpecialName } from "./ajustPropertyToSpecialName.js";
import { injectProperty } from "./injectProperty.js";
import { fillOutExam } from "./fillOutExam.js";
import { fillHematologyData } from "src/data/fillExamData.js";
import { changePDFPage } from "./changePDFPage.js";

const fontSize = 15;

export async function addHematologyToPDF(
  pdfDoc,
  page,
  hematology,
  anchors,
  positionY
) {
  const { anchorX, anchorXCenter, anchorXRight, anchorY, size } = anchors;

  console.log("hematology-start: ", positionY.value);

  const hemotologyPosition = {
    center: anchorXCenter,
    left: anchorX,
    right: anchorXRight,
  };

  const fontFamilyBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  page.value.drawText("HEMATOLOGIA", {
    x: size.width / 2 - 60,
    y: positionY.value,
    size: fontSize,
    font: fontFamilyBold,
  });

  positionY.value -= 30;

  let i;
  for (let key in hematology) {
    let count = 0;
    const pos = hemotologyPosition[key];

    const value = hematology[key];

    for (let valueKey in value) {
      const propertyName = ajustPropertyToSpecialName(valueKey);

      drawHematologyProperty(
        pdfDoc,
        page.value,
        propertyName,
        value[valueKey].value.toString(),
        value[valueKey].unit,
        pos,
        positionY.value + count
      );

      count -= 11;
    }
    i = count;
  }
  positionY.value += i;

  positionY.value -= 50;

  console.log("hematology-end: ", positionY.value);

  changePDFPage(positionY, anchorY, pdfDoc, 300, page);
}
