import { StandardFonts } from "pdf-lib";

export async function drawHecesProperty(
  pdfDoc,
  page,
  propertyName,
  propertyValue,
  anchorX,
  posY,
  { lineProperty, lineY }
) {
  const fontFamilyNormal = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const lineYOptional = lineY || posY;

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

  page.drawLine({
    start: { x: lineProperty.xStart, y: lineYOptional - 2 },
    end: { x: lineProperty.xEnd, y: lineYOptional - 2 },
    thickness: 0.3,
  });
  // page.drawLine({
  //   start: { x: anchorX, y: posY - 50 },
  //   end: { x: anchorX, y: posY - 55 },
  //   thickness: 1,
  // });
}
