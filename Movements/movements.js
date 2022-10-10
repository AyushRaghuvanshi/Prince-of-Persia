let player = {
  x: 550,
  y: 0,
  health: 100,
  height: 100,
  width: 100,
};
let player_bools = {
  left: false,
  right: false,
  up: false,
  down: false,
  isDirectionRight: true,
};
let upflag = true;
let gravtity = setInterval(movements, 10);
let velocity = 0;
let playerSpeed = 3;

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    player_bools.left = true;
    player_bools.isDirectionRight = false;
    player_bools.right = false;
  }
  if (event.key === "ArrowRight") {
    player_bools.right = true;
    player_bools.isDirectionRight = true;
    player_bools.left = false;
  }
  if (event.key === "ArrowUp") {
    player_bools.up = true;
  }
  if (event.key === "f") {
    hit();
  }
});

document.addEventListener("keyup", (event) => {
  if (event.key === "ArrowLeft") {
    player_bools.left = false;
  }
  if (event.key === "ArrowRight") {
    player_bools.right = false;
  }
  if (event.key === "ArrowUp") {
    player_bools.up = false;
  }
});
function movements() {
  if (checkRoof(player.x, player.y + 1)) {
    velocity = 0;
  }
  if (
    player_bools.left &&
    checkWall(player.x - playerSpeed, player.y, player.width)
  ) {
    player.x -= playerSpeed;
  }
  if (
    player_bools.right &&
    checkWall(player.x + playerSpeed, player.y, player.width)
  ) {
    player.x += playerSpeed;
  }
  if (player_bools.up) {
    if (upflag) {
      velocity = -10;
      upflag = false;
      setTimeout(() => {
        upflag = true;
      }, 500);
    }
  }
  player.y += velocity;
  let condition = checkGround(player.x, player.y, 100, 100);
  if (condition === true) {
    velocity++;
  } else {
    player.y = parseInt(condition) + 1;
    velocity = 0;
  }
}
function hit() {
  if (enemy1.inProximity) {
    enemy1.health -= 10;
  }
}

function checkScreen() {
  if (player.x + player.width >= canvasWidth && screenNumber < ground.length) {
    screenNumber++;
    player.x = 5;
  } else if (player.x <= 0 && screenNumber > 1) {
    screenNumber--;
    player.x = canvasWidth - player.width - 5;
  }
}
