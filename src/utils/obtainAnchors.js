export function obtainExamAnchors(size) {
  const anchorX = size.width / 6.5;
  const anchorY = size.height - size.height / 11;
  const anchorXCenter = size.width / 2 - 80;
  const anchorXRight = size.width - (anchorX + 170);

  return {
    anchorX,
    anchorY,
    anchorXCenter,
    anchorXRight,
    size,
  };
}
