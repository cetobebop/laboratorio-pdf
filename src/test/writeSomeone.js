import { StandardFonts } from "pdf-lib";

export async function writeSome(
  pdfDoc,
  propertyName,
  anchorX,
  posY,
  page,
  positionY
) {
  const fontFamilyNormal = await pdfDoc.embedFont(StandardFonts.Helvetica);

  positionY.value = posY;

  page.value.drawText(propertyName, {
    x: anchorX,
    y: posY,
    size: 9,
    font: fontFamilyNormal,
  });
}
