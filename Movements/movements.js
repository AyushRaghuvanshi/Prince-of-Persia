let player = {
  x: 250,
  y: 0,
  health: 100,
};
let player_bools = {
  left: false,
  right: false,
  up: false,
  down: false,
};
let upflag = true;
let gravtity = setInterval(movements, 10);
let velocity = 0;

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    player_bools.left = true;
  }
  if (event.key === "ArrowRight") {
    player_bools.right = true;
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
  if (player_bools.left && checkWall(player.x - 6, player.y)) {
    player.x -= 6;
  }
  if (player_bools.right && checkWall(player.x + 6, player.y)) {
    player.x += 6;
  }
  if (player_bools.up) {
    if (upflag) {
      velocity = -15;
      upflag = false;
    }
  }

  player.y += velocity;
  let condition = checkGround(player.x, player.y, 100, 100);

  if (condition === true) {
    velocity++;
  } else {
    upflag = true;
    player.y = parseInt(condition) + 1;
    velocity = 0;
  }
}
function hit() {
  if (enemy1.inProximity) {
    enemy1.health -= 10;
  }
}
