import { StandardFonts } from "pdf-lib";

export async function drawHecesPropertyIterable(
  pdfDoc,
  page,
  propertyName,
  propertyValue,
  anchorX,
  posY,
  { lineProperty, lineY, firstIteration, lastIteration }
) {
  const fontFamilyNormal = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const lineYOptional = lineY || posY;

  if (firstIteration)
    page.drawText(propertyName + ":", {
      x: anchorX,
      y: posY,
      size: 9,
      font: fontFamilyNormal,
    });

  page.drawText(propertyValue, {
    x: lineProperty.xStart + 5,
    y: posY,
    size: 9,
    font: fontFamilyNormal,
  });

  if (lastIteration)
    page.drawLine({
      start: { x: lineProperty.xStart, y: lineYOptional - 2 },
      end: { x: lineProperty.xEnd, y: lineYOptional - 2 },
      thickness: 0.3,
    });
}
