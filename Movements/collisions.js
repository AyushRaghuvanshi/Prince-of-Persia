climableArea = [
  [
    {
      destination: 0.325 * canvasHeight,
      left: 0.32 * canvasWidth,
      top: 0.33 * canvasHeight,
      height: 0.27 * canvasHeight,
      width: 0.1 * canvasWidth,
    },
  ],
  [],
  []
];
props = [
  [
    {
      left: 0.7 * canvasWidth,
      top: 0.2 * canvasHeight,
      height: 0.15 * canvasHeight,
      width: 0.1 * canvasWidth,
    },
  ],
];
ground = [
  [
    {
      left: 0 * canvasWidth,
      top: 0 * canvasHeight,
      height: 0.6 * canvasHeight,
      width: 0.01 * canvasWidth,
    },
    {
      left: 0.32 * canvasWidth,
      top: 0.325 * canvasHeight,
      height: 0.025 * canvasHeight,
      width: 0.5 * canvasWidth,
    },
    {
      left: 0.866 * canvasWidth,
      top: 0 * canvasHeight,
      height: 0.62 * canvasHeight,
      width: 0.2 * canvasWidth,
    },
    {
      left: 0.59 * canvasWidth,
      top: 0.35 * canvasHeight,
      height: 0.27 * canvasHeight,
      width: 0.28 * canvasWidth,
    },
    {
      left: 0,
      top: 0.537 * canvasHeight,
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
  [
    {
      left: 0,
      top: 0.912 * canvasHeight,
      height: 0.085 * canvasHeight,
      width: 0.315 * canvasWidth,
    },
    {
      left: 0.315 * canvasWidth,
      top: 0.62 * canvasHeight,
      height: 0.293 * canvasHeight,
      width: 0.685 * canvasWidth,
    }
  ]
];
let added = false;
function sword() {
  let sword = new Image();
  sword.src = "../UI/dagger.png";
  if (screenNumber == 1 && player.haveSword == false && added == false) {
    let sword = new Image();
    sword.style.height = 100 + "px";
    sword.style.width = "auto";
    sword.src = "../UI/dagger.png";
    sword.style.position = "absolute";
    sword.style.left = props[0][0].left + 50 + "px";
    sword.style.top = props[0][0].top - 10 + "px";
    added = true;

    document.getElementsByTagName("span")[0].appendChild(sword);
  } else if (screenNumber != 1 || player.haveSword != false) {
    try {
      let x = document.getElementsByTagName("span")[0];
      x.removeChild(x.firstChild);
    } catch (e) {
      console.log(e);
    }
  }
}
// for (let i = 0; i < ground[screenNumber - 1].length; i++) {
//   let x = document.createElement("div");
//   x.style.left = ground[screenNumber - 1][i].left + "px";
//   x.style.top = ground[screenNumber - 1][i].top + "px";
//   x.style.height = ground[screenNumber - 1][i].height + "px";
//   x.style.width = ground[screenNumber - 1][i].width + "px";
//   x.style.position = "absolute";
//   x.style.backgroundColor = "pink";
//   x.style.opacity = "0.5";
//   let y = document.getElementsByTagName("div")[0];
//   y.appendChild(x);
// }





function checkProp(x, y) {
  if (screenNumber == 1) {
    //  console.log(left, top, height, width,x,y);
    if (x + 100 > sword.left && x + 100 < sword.left + sword.width) {
      if (y < sword.top + sword.height) {
        return true;
      }
    }
  }
  return false;
}
function checkIfClimbable(x, y, height, width) {
  for (let i = 0; i < climableArea[screenNumber - 1].length; i++) {
    if (
      x > climableArea[screenNumber - 1][i].left &&
      x <
        climableArea[screenNumber - 1][i].left +
          climableArea[screenNumber - 1][i].width &&
      y > climableArea[screenNumber - 1][i].top
    ) {
      return climableArea[screenNumber - 1][i].destination;
    }
  }
  return false;
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
    if (
      x >= ground[screenNumber - 1][i].left &&
      x <=
        ground[screenNumber - 1][i].left + ground[screenNumber - 1][i].width &&
      y < ground[screenNumber - 1][i].top + ground[screenNumber - 1][i].height
    ) {
      console.log(i);
      return i;
    }
  }
  return -1;
}

function checkWall(x, y, width) {
  for (let i = 0; i < ground[screenNumber - 1].length; i++) {
    if (i == ground_index) {
      continue;
    }
    if (
      x + width >= ground[screenNumber - 1][i].left &&
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
    if (y <= ground[i].top) {
      if (x >= ground[i].left && x <= ground[i].left + ground[i].width) {
        return true;
      }
    }
  }
  return false;
}
