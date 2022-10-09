ground = [
  [
    {
      left: 0.375 * canvasWidth,
      top: 0.325 * canvasHeight,
      height: 0.025 * canvasHeight,
      width: 0.5 * canvasWidth,
    },
    {
      left: 0,
      top: 0.538 * canvasHeight,
      height: 0.462 * canvasHeight,
      width: 0.481 * canvasWidth,
    },
    {
      left: 0.481 * canvasWidth,
      top: 0.912 * canvasHeight,
      height: 0.085 * canvasHeight,
      width: 0.579 * canvasWidth,
    },
  ],
  [
    {
      left: 0,
      top: 0.912 * canvasHeight,
      height: 0.085 * canvasHeight,
      width: canvasWidth,
    },
  ],
];
for (let i = 0; i < ground[screenNumber - 1].length; i++) {
  let x = document.createElement("div");
  x.style.left = ground[screenNumber - 1][i].left + "px";
  x.style.top = ground[screenNumber - 1][i].top + "px";
  x.style.height = ground[screenNumber - 1][i].height + "px";
  x.style.width = ground[screenNumber - 1][i].width + "px";
  x.style.position = "absolute";
  x.style.backgroundColor = "pink";
  x.style.opacity = "0.5";
  let y = document.getElementsByTagName("div")[0];
  y.appendChild(x);
}

let ground_index = 0;
function checkGround(x, y, height, width) {
  ground_index = whichGround(x, y, height);

  if (
    y <= ground[screenNumber - 1][ground_index].top &&
    y <=
      ground[screenNumber - 1][ground_index].height +
        ground[screenNumber - 1][ground_index].top
  ) {
    return true;
  } else {
    return `${ground[screenNumber - 1][ground_index].top}`;
  }
}

function whichGround(x, y, height) {
  for (let i = 0; i < ground[screenNumber - 1].length; i++) {
    console.log(
      y < ground[screenNumber - 1][i].top,
      y,
      ground[screenNumber - 1][i].top
    );

    if (
      x >= ground[screenNumber - 1][i].left &&
      x <=
        ground[screenNumber - 1][i].left + ground[screenNumber - 1][i].width &&
      y < ground[screenNumber - 1][i].top
    ) {
      console.log(i);
      return i;
    }
  }
}

function checkWall(x, y) {
  for (let i = 0; i < ground[screenNumber - 1].length; i++) {
    if (i == ground_index) {
      continue;
    }
    if (
      x >= ground[screenNumber - 1][i].left &&
      x <= ground[screenNumber - 1][i].left + ground[screenNumber - 1][i].width
    ) {
      if (
        y > ground[screenNumber - 1][i].top &&
        y - 10 <
          ground[screenNumber - 1][i].top + ground[screenNumber - 1][i].height
      ) {
        return false;
      }
    }
  }
  return true;
}

function checkRoof(x, y) {
  for (let i = 0; i < ground.length; i++) {
    if (y >= ground[i].top) {
      if (x >= ground[i].left && x <= ground[i].left + ground[i].width) {
        return true;
      }
    }
  }
  return false;
}
