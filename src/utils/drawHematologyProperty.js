import { StandardFonts } from "pdf-lib";

export async function drawHematologyProperty(
  pdfDoc,
  page,
  propertyName,
  propertyValue,
  unit,
  anchorX,
  posY
) {
  const fontFamilyNormal = await pdfDoc.embedFont(StandardFonts.Helvetica);

  page.drawText(propertyName + ":", {
    x: anchorX,
    y: posY,
    size: 9,
    font: fontFamilyNormal,
  });

  page.drawText(propertyValue, {
    x: anchorX + 65,
    y: posY,
    size: 9,
    font: fontFamilyNormal,
  });

  page.drawLine({
    start: { x: anchorX + 60, y: posY - 2 },
    end: { x: anchorX + 135, y: posY - 2 },
    thickness: 0.3,
  });

  page.drawText(unit, {
    x: anchorX + 140,
    y: posY,
    size: 9,
    font: fontFamilyNormal,
  });
}
