ground = [
  {
    left: 0,
    top: 500,
    height: 500,
    width: 1024,
  },
];

function checkGround(x, y, height, width) {
  let i = 0;
  if (
    x >= ground[i].left &&
    x <= ground[i].left + ground[i].width &&
    y <= ground[i].top &&
    y <= ground[i].height + ground[i].top
  ) {
    return true;
  }
  return `${ground[i].top}`;
}
