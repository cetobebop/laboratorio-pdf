import { StandardFonts } from "pdf-lib";

import { ajustPropertyToSpecialName } from "./ajustPropertyToSpecialName.js";
import { changePDFPage } from "./changePDFPage.js";
import { drawOrinaProperty } from "./drawOrinaProperty.js";
import { manageStringLength } from "./manageStringLength.js";
import { drawOrinaPropertyKeyIterable } from "./drawOrinaPropertyKeyIterable.js";
import { addSpacesToArray } from "./addSpacesToArray.js";

export async function addOrinaToPDF(pdfDoc, page, orina, anchors, positionY) {
  const { anchorX, anchorXCenter, anchorXRight, anchorY, size } = anchors;

  const orinaPosition = {
    left: anchorX,
    right: anchorXRight - 20,
  };

  const fontSize = 15;

  const fontFamilyBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  page.value.drawText("ORINA", {
    x: size.width / 2 - 30,
    y: positionY.value,
    size: fontSize,
    font: fontFamilyBold,
  });

  positionY.value -= 25;

  page.value.drawText("CARACTERÍSTICAS FÍSICAS", {
    x: anchorX - 25,
    y: positionY.value,
    size: fontSize - 3,
    font: fontFamilyBold,
  });

  const linePropertyFisicasIndex = {
    left: {
      xStart: orinaPosition.left + 30,
      xEnd: orinaPosition.left + 180,
    },
    right: {
      xStart: orinaPosition.right + 50,
      xEnd: orinaPosition.right + 180,
    },
  };

  const linePropertyQuimicasIndex = {
    left: {
      xStart: orinaPosition.left + 70,
      xEnd: orinaPosition.left + 180,
    },
    right: {
      xStart: orinaPosition.right + 70,
      xEnd: orinaPosition.right + 180,
    },
  };

  const linePropertyMicroIndex = {
    left: {
      xStart: orinaPosition.left + 75,
      xEnd: orinaPosition.left + 180,
    },
    right: {
      xStart: orinaPosition.right + 75,
      xEnd: orinaPosition.right + 180,
    },
  };

  positionY.value -= 15;
  let posFisicas;
  for (let key in orina.fisicas) {
    let countFisicas = 0;
    const pos = orinaPosition[key];
    const valueFisicas = orina.fisicas[key];

    const lineProperty = linePropertyFisicasIndex[key];

    for (let valueKey in valueFisicas) {
      const propertyName = ajustPropertyToSpecialName(valueKey);
      drawOrinaProperty(
        pdfDoc,
        page.value,
        propertyName,
        valueFisicas[valueKey].toString(),
        pos,
        positionY.value + countFisicas,
        { lineProperty }
      );

      countFisicas -= 11;
    }

    posFisicas = countFisicas;
  }
  positionY.value += posFisicas;
  positionY.value -= 10;

  page.value.drawText("CARACTERÍSTICAS QUÍMICAS", {
    x: anchorX - 25,
    y: positionY.value,
    size: fontSize - 3,
    font: fontFamilyBold,
  });

  positionY.value -= 15;

  const lengthIndex = new Map();
  let posQuimicas;
  for (let key in orina.quimicas) {
    let countQuimicas = 0;
    let iteration = 0;
    const pos = orinaPosition[key];
    const valueQuimicas = orina.quimicas[key];

    const lineProperty = linePropertyQuimicasIndex[key];
    for (let valueKey in valueQuimicas) {
      const index = "_" + iteration;

      const propertyName = ajustPropertyToSpecialName(valueKey);
      let propertyNameManage = manageStringLength(propertyName, 13);
      let arrValidation = Array.isArray(propertyNameManage);

      if (lengthIndex.has(index)) {
        const arr = !arrValidation ? [propertyNameManage] : propertyNameManage;

        propertyNameManage = addSpacesToArray(arr, lengthIndex.get(index));
        arrValidation = true;
      }

      if (!arrValidation) {
        drawOrinaProperty(
          pdfDoc,
          page.value,
          propertyNameManage,
          valueQuimicas[valueKey].toString(),
          pos,
          positionY.value + countQuimicas,
          { lineProperty }
        );

        countQuimicas -= 11;
      } else {
        if (!lengthIndex.has(index)) {
          lengthIndex.set(index, propertyNameManage.length);
        }
        for (let i = 0; i < propertyNameManage.length; i++) {
          let firstIteration = !i;
          let lastIteration = i + 1 === propertyNameManage.length;

          drawOrinaPropertyKeyIterable(
            pdfDoc,
            page.value,
            propertyNameManage[i],
            valueQuimicas[valueKey].toString(),
            pos,
            positionY.value + countQuimicas,
            { lineProperty, firstIteration, lastIteration }
          );

          countQuimicas -= 11;
        }
      }
      iteration++;
    }
    posQuimicas = countQuimicas;
  }

  positionY.value += posQuimicas;
  positionY.value -= 10;

  page.value.drawText("CARACTERÍSTICAS MICROSCOPICAS", {
    x: anchorX - 25,
    y: positionY.value,
    size: fontSize - 3,
    font: fontFamilyBold,
  });

  positionY.value -= 15;

  const lengthIndexMicro = new Map();
  let posMicro;
  for (let key in orina.micro) {
    let countMicro = 0;
    let iteration = 0;
    const pos = orinaPosition[key];
    const valueMicro = orina.micro[key];

    const lineProperty = linePropertyMicroIndex[key];
    for (let valueKey in valueMicro) {
      const index = "_" + iteration;

      const propertyName = ajustPropertyToSpecialName(valueKey);
      let propertyNameManage = manageStringLength(propertyName, 15);
      let arrValidation = Array.isArray(propertyNameManage);

      if (lengthIndexMicro.has(index)) {
        const arr = !arrValidation ? [propertyNameManage] : propertyNameManage;

        propertyNameManage = addSpacesToArray(arr, lengthIndexMicro.get(index));
        arrValidation = true;
      }

      if (!arrValidation) {
        drawOrinaProperty(
          pdfDoc,
          page.value,
          propertyNameManage,
          valueMicro[valueKey].toString(),
          pos,
          positionY.value + countMicro,
          { lineProperty }
        );

        countMicro -= 11;
      } else {
        if (!lengthIndexMicro.has(index)) {
          lengthIndexMicro.set(index, propertyNameManage.length);
        }
        for (let i = 0; i < propertyNameManage.length; i++) {
          let firstIteration = !i;
          let lastIteration = i + 1 === propertyNameManage.length;

          if (
            (lastIteration && propertyNameManage[i]) ||
            (!propertyNameManage[i + 1] && propertyNameManage[i])
          )
            propertyNameManage[i] += ":";

          drawOrinaPropertyKeyIterable(
            pdfDoc,
            page.value,
            propertyNameManage[i],
            valueMicro[valueKey].toString(),
            pos,
            positionY.value + countMicro,
            { lineProperty, firstIteration, lastIteration }
          );

          countMicro -= 11;
        }
      }
      iteration++;
    }
    posMicro = countMicro;
  }

  positionY.value += posMicro;
  positionY.value -= 30;

  changePDFPage(positionY, anchorY, pdfDoc, 200, page);
}
