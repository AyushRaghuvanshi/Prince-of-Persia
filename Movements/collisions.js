ground = [
  {
    left: 0,
    top: 0.412*canvasHeight,
    height: 0.588*canvasHeight,
    width: 0.481*canvasWidth
  },
  {
    left: 0.481*canvasWidth,
    top: 0.9*canvasHeight,
    height: 100,
    width: 1000
  }
];

function checkGround(x, y, height, width) {
  let i = 0;
  console.log(    x >= ground[i].left,    x <= ground[i].left + ground[i].width,     y <= ground[i].top, y <= ground[i].height + ground[i].top);
  if (
    x <= ground[i].left ||
    x >= ground[i].left + ground[i].width||
    y <= ground[i].top ||
    y <= ground[i].height + ground[i].top
  ) {
    
    return true;
    
  }
  return `${ground[i].top}`;
}

console.log(ground[0].left + ground[0].width);
