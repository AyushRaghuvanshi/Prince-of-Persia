ground = [
  {
    left: 0,
    top: 0.538 * canvasHeight,
    height: 0.462 * canvasHeight,
    width: 0.481 * canvasWidth,
  },
  {
    left: 0.481 * canvasWidth,
    top: 0.912 * canvasHeight,
    height: 0.085*canvasHeight,
    width: 0.579 * canvasWidth,
  },
];
let ground_index = 0;
function checkGround(x, y, height, width) {
  ground_index = whichGround(x);
  if (
    y <= ground[ground_index].top &&
    y <= ground[ground_index].height + ground[ground_index].top
  ) {
    return true;
  } else {
    return `${ground[ground_index].top}`;
  }
}
function whichGround(x) {
  for (let i = 0; i < ground.length; i++) {
    if (x >= ground[i].left && x <= ground[i].left + ground[i].width) {
      return i;
    }
  }
}
function checkWall(x, y) {
  for (let i = 0; i < ground.length; i++) {
    if (i == ground_index) {
      continue;
    }
    if (x >= ground[i].left && x <= ground[i].left + ground[i].width) {
      if (y > ground[i].top) {
        return false;
      }
    }
  }
  return true;
}
