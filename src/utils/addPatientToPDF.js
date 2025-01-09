import { StandardFonts } from "pdf-lib";
import moment from "moment";

import { changePDFPage } from "./changePDFPage.js";

const fontSize = 15;

export async function addPatientToPDF(
  pdfDoc,
  page,
  patient,
  anchors,
  positionY
) {
  const { anchorX, anchorXCenter, anchorXRight, anchorY, size } = anchors;

  if (positionY.value > 200) positionY.value = 190;

  const patientPosition = {
    center: anchorXCenter,
    left: anchorX,
    right: anchorXRight,
  };

  const date = moment(patient?.patient?.date).format("DD/MM/YYYY");

  const linePropertyX = {
    xStart: patientPosition.left - 20,
    xEnd: size.width - patientPosition.left + 20,
  };

  const fontFamilyBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontFamilyNormal = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const firstYPoint = positionY.value;
  lineX(page, positionY.value, linePropertyX);

  positionY.value -= 50;

  page.value.drawText(`S`, {
    x: patientPosition.left,
    y: positionY.value,
    size: fontSize + 25,
    font: fontFamilyNormal,
  });

  page.value.drawText(`LABORATORIO CLINICO "SAN CARLOS"`, {
    x: size.width / 2 - 130,
    y: positionY.value,
    size: fontSize,
    font: fontFamilyBold,
  });

  positionY.value -= 15;

  page.value.drawText(
    `Calle congresillo N: 18. Cariaco - Edo Sucre. Tlf. 02945552022`,
    {
      x: size.width / 2 - 120,
      y: positionY.value,
      size: fontSize - 5,
      font: fontFamilyNormal,
    }
  );

  positionY.value -= 40;

  page.value.drawText(`C`, {
    x: size.width / 2 - 170,
    y: positionY.value,
    size: fontSize + 25,
    font: fontFamilyNormal,
  });

  console.log(patient.patient);
  page.value.drawText(
    `Paciente: ${!patient.patient.name ? "" : patient.patient.name}`,
    {
      x: size.width / 2 - 115,
      y: positionY.value,
      size: fontSize - 4,
      font: fontFamilyNormal,
    }
  );

  positionY.value -= 20;
  page.value.drawText(`Fecha: ${date}`, {
    x: size.width / 2 - 115,
    y: positionY.value,
    size: fontSize - 4,
    font: fontFamilyNormal,
  });

  page.value.drawText(
    `Nro: ${!patient.patient.nro ? "" : patient.patient.nro}`,
    {
      x: patientPosition.right + 95,
      y: positionY.value,
      size: fontSize - 4,
      font: fontFamilyNormal,
    }
  );

  positionY.value -= 35;

  lineY(page, linePropertyX.xStart, firstYPoint, positionY.value);
  lineY(page, linePropertyX.xEnd, firstYPoint, positionY.value);
  lineX(page, positionY.value, linePropertyX);

  changePDFPage(positionY, anchorY, pdfDoc, 20, page);
}

function lineX(page, xPos, lineProperty) {
  page.value.drawLine({
    start: { x: lineProperty.xStart, y: xPos },
    end: { x: lineProperty.xEnd, y: xPos },
    thickness: 0.3,
  });
}

function lineY(page, sideX, startY, endY) {
  page.value.drawLine({
    start: { x: sideX, y: startY },
    end: { x: sideX, y: endY },
    thickness: 0.3,
  });
}
