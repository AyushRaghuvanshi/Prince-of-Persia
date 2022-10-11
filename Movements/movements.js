// const canvas = document.getElementsByTagName("canvas")[0];
// const canvasWidth = canvas.offsetWidth;
// const canvasHeight = canvas.offsetHeight;

let player = {
  x: 550,
  y: 0,
  health: 100,
  height: 100,
  width: 100,
  haveSword: false,
  isClimbing: false,
};
let player_bools = {
  left: false,
  right: false,
  up: false,
  down: false,
  isDirectionRight: true,
  isHitting: false,
  hittingStart: false,
  hittingEnd: false,
  climb1: false,
  climb2: false,
};
let upflag = true;
let gravity = setInterval(movements, 10);
let velocity = 0;
let playerSpeed = 3;
let movePlayerToRoof = false;


document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft" && !player_bools.isHitting) {
    player_bools.left = true;
    player_bools.isDirectionRight = false;
    player_bools.right = false;
  }
  if (event.key === "ArrowRight" && !player_bools.isHitting) {
    player_bools.right = true;
    player_bools.isDirectionRight = true;
    player_bools.left = false;
  }
  if (event.key === "ArrowUp" && !player_bools.isHitting) {
    player_bools.up = true;
  }
  if (event.key === "f" && !player_bools.isHitting) {
    if (player.haveSword) {
      player_bools.isHitting = true;
      player_bools.left = false;
      player_bools.right = false;
      player_bools.hittingStart = true;
      // if(!player_bools.isDirectionRight){
      // player.x -= 121;
      // }
      hit();
    }
  }
});

document.addEventListener("keyup", (event) => {
  if (event.key === "ArrowLeft") {
    player_bools.left = false;
  }
  if (event.key === "ArrowRight") {
    player_bools.right = false;
  }
  if (event.key === "ArrowUp" && !player.isClimbing) {
    player_bools.up = false;
  }
});
function movements() {
  if (checkProp(player.x, player.y)) {
    player.haveSword = true;
    
  }
  if (player.health <= 0) {
    clearInterval(gravity);
    playerDead();
  }
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
    let climb = checkIfClimbable(
      player.x,
      player.y,
      player.height,
      player.width
    );
    if (climb !== false) {
      movePlayerToRoof = climb;
      player.y = climb - 100;
      upflag=false;
      setTimeout(() => {
        movePlayerToRoof = false;
        player.isClimbing = false;
        player_bools.climb1 = false;
        player_bools.up = false;
        upflag=true;
      }, 2000);
      player_bools.isDirectionRight = true;
      if (!player.isClimbing) {
        player_bools.climb1 = true;
      }
      player.isClimbing = true;
      player.y = climb;
      // player.x += 10;
    } else if (upflag) {
      // player.isClimbing = false;
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
    enemyOnScreen[screenNumber - 1].health -= 10;
    enemy1.health -= 10;
  }
}

function checkScreen() {
  if (player.x + player.width >= canvasWidth && screenNumber <= ground.length) {
    screenNumber++;
    if (enemyOnScreen[screenNumber - 1].ishere == true) {
      enemy_creation(
        enemyOnScreen[screenNumber - 1].x,
        enemyOnScreen[screenNumber - 1].y,
        enemyOnScreen[screenNumber - 1].health
      );
    } else {
      clearAnimation();
    }
    player.x = 5;
  } else if (player.x <= 0 && screenNumber > 1) {
    screenNumber--;
    if (enemyOnScreen[screenNumber - 1].ishere == true) {
      enemy_creation(
        enemyOnScreen[screenNumber - 1].x,
        enemyOnScreen[screenNumber - 1].y,
        enemyOnScreen[screenNumber - 1].health
      );
    } else {
      clearAnimation();
    }
    player.x = canvasWidth - player.width - 5;
  }
}
function playerDead() {
  console.log("dead");
}
