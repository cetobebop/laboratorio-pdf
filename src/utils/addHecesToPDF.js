import { StandardFonts } from "pdf-lib";

import { drawHecesProperty } from "./drawHecesProperty.js";
import { drawHecesPropertyIterable } from "./drawHecesPropertyIterable.js";
import { ajustPropertyToSpecialName } from "./ajustPropertyToSpecialName.js";

import { changePDFPage } from "./changePDFPage.js";
import { joinPropertySameName } from "./joinPropertySameName.js";
import { manageStringLength } from "./manageStringLength.js";

const fontSize = 15;

export async function addHecesToPDF(pdfDoc, page, heces, anchors, positionY) {
  const { anchorX, anchorXCenter, anchorXRight, anchorY, size } = anchors;

  console.log("heces-start: ", positionY.value);

  const hecesPosition = {
    center: anchorXCenter + 20,
    left: anchorX - 10,
    right: anchorXRight + 80,
  };

  const fontFamilyBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  page.value.drawText("HECES", {
    x: size.width / 2 - 30,
    y: positionY.value,
    size: fontSize,
    font: fontFamilyBold,
  });

  positionY.value -= 25;

  page.value.drawText("EXAMEN MACROSCÓPICO", {
    x: anchorX - 25,
    y: positionY.value,
    size: fontSize - 3,
    font: fontFamilyBold,
  });

  positionY.value -= 15;

  if (heces?.micro?.left)
    heces.micro.left = joinPropertySameName(heces.micro.left);

  const linePropertyIndex = {
    left: {
      xStart: hecesPosition.left + 50,
      xEnd: hecesPosition.left + 155,
    },
    center: {
      xStart: hecesPosition.center + 65,
      xEnd: hecesPosition.center + 170,
    },
    right: {
      xStart: hecesPosition.right + 40,
      xEnd: hecesPosition.right + 80,
    },
  };

  const linePropertyMicroIndex = {
    left: {
      xStart: hecesPosition.left + 60,
      xEnd: hecesPosition.right + 80,
    },
  };

  let posMacro;

  for (let key in heces.macro) {
    let countMacro = 0;
    let lineY;
    const pos = hecesPosition[key];
    const valueMacro = heces.macro[key];

    const lineProperty = linePropertyIndex[key];

    for (let valueKey in valueMacro) {
      lineY = countMacro ? positionY.value - 25 : undefined;

      const propertyName = ajustPropertyToSpecialName(valueKey);
      drawHecesProperty(
        pdfDoc,
        page.value,
        propertyName,
        valueMacro[valueKey].toString(),
        pos,
        positionY.value + countMacro,
        { lineProperty, lineY }
      );

      countMacro -= 11;
    }
    posMacro = countMacro;
  }

  positionY.value += posMacro;

  positionY.value -= 25;

  page.value.drawText("EXAMEN MICROSCÓPICO", {
    x: anchorX - 25,
    y: positionY.value,
    size: 12,
    font: fontFamilyBold,
  });

  let posMicro;
  for (let key in heces.micro) {
    let countMicro = 0;
    const pos = hecesPosition[key];
    const valueMicro = heces.micro[key];

    const linePropertyMicro = linePropertyMicroIndex[key];

    for (let valueKey in valueMicro) {
      let validationArrayValue = Array.isArray(valueMicro[valueKey]);
      const propertyName = ajustPropertyToSpecialName(valueKey);
      let valueManage;
      if (!validationArrayValue) {
        valueManage = manageStringLength(valueMicro[valueKey], 87);
      } else {
        valueManage = valueMicro[valueKey].flatMap((e) =>
          manageStringLength(e, 87)
        );
      }
      if (!Array.isArray(valueManage))
        drawHecesProperty(
          pdfDoc,
          page.value,
          propertyName,
          valueManage.toString(),
          pos,
          positionY.value - 15 + countMicro,
          { lineProperty: linePropertyMicro }
        );
      else {
        for (let i = 0; i < valueManage.length; i++) {
          let firstIteration = !i;
          let lastIteration = i + 1 === valueManage.length;

          drawHecesPropertyIterable(
            pdfDoc,
            page.value,
            propertyName,
            valueManage[i].toString(),
            pos,
            positionY.value - 15 + countMicro,
            { lineProperty: linePropertyMicro, firstIteration, lastIteration }
          );

          if (!lastIteration) countMicro -= 11;
        }
      }

      countMicro -= 11;
    }
    posMicro = countMicro;
  }

  positionY.value += posMicro;

  positionY.value -= 50;

  console.log("heces-end: ", positionY.value);

  changePDFPage(positionY, anchorY, pdfDoc, 300, page);
}
