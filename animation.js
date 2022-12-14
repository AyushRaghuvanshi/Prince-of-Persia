// const canvas = document.getElementsByTagName("canvas")[0];
// const canvasWidth = canvas.offsetWidth;
// const canvasHeight = canvas.offsetHeight;
canvas.height = canvasHeight;
canvas.width = canvasWidth;
const ctx = canvas.getContext("2d");
let screenNumber = 1;
let backgrounds = [];
backgrounds.push(new Image());
backgrounds.push(new Image());
backgrounds.push(new Image());
backgrounds[0].src = "Backgrounds/1.png";
backgrounds[1].src = "Backgrounds/2.png";
backgrounds[2].src = "Backgrounds/4.png";
let playerImage = new Image();
playerImage.src = "Player/spritesheet.png";
let playerImagef = new Image();
playerImagef.src = "Player/spritesheetf.png";
let progressBarEmpty = new Image();
let progressBarFull = new Image();
progressBarEmpty.src = "UI/progress-bar-base.png";
progressBarFull.src = "UI/progress-bar-full.png";
let x = 0;
let playerX;
let playerY;
let enemyImage = new Image();
enemyImage.src = "Enemy/enemy.png";
let enemyImagef = new Image();
enemyImagef.src = "Enemy/enemyf.png";
let enemyX = 0;
let enemyY = 0;

let playerClimbY = 0;
let playerClimbX = 0;

let sword = {
  left: 0.7 * canvasWidth,
  top: 0.226 * canvasHeight,
  height: 0.15 * canvasHeight,
  width: 0.1 * canvasWidth,
};
let swordImage = new Image();
swordImage.src = "Player/sword.png";

function animate() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  animatePlayer();
  // ctx.drawImage(backgrounds[screenNumber - 1], 0, 0, canvasWidth, canvasHeight);

  // if(Math.floor(player.health)!=0){

  // console.log(player.health);
  if (
    player_bools.isDirectionRight &&
    !player_bools.isHitting &&
    !player.isClimbing
  ) {
    ctx.drawImage(
      playerImagef,
      playerX,
      playerY,
      66,
      85,
      player.x,
      player.y - player.height,
      100,
      100
    );
  } else if (
    !player_bools.isDirectionRight &&
    !player_bools.isHitting &&
    !player.isClimbing
  ) {
    ctx.drawImage(
      playerImage,
      playerX,
      playerY,
      66,
      85,
      player.x,
      player.y - player.height,
      100,
      100
    );
  } else if (
    player_bools.isDirectionRight &&
    player_bools.isHitting &&
    !player.isClimbing
  ) {
    ctx.drawImage(
      playerImagef,
      playerX,
      playerY,
      146,
      76,
      player.x,
      player.y - player.height,
      221,
      100
    );
  } else if (
    !player_bools.isDirectionRight &&
    player_bools.isHitting &&
    !player.isClimbing
  ) {
    ctx.drawImage(
      playerImage,
      playerX,
      playerY,
      146,
      76,
      player.x - 121,
      player.y - player.height,
      221,
      100
    );
  } else if (
    player_bools.isDirectionRight &&
    player.isClimbing &&
    player_bools.climb1
  ) {
    ctx.drawImage(
      playerImagef,
      playerX,
      playerY,
      50,
      113,
      player.x,
      player.y + playerClimbY,
      76,
      132
    );
  } else if (
    player_bools.isDirectionRight &&
    player.isClimbing &&
    player_bools.climb2
  ) {
    ctx.drawImage(
      playerImagef,
      playerX,
      playerY,
      63,
      113,
      player.x,
      player.y + playerClimbY,
      76,
      132
    );
  }

  //enemy
  animateEnemy();

  if (
    enemyOnScreen[screenNumber - 1].ishere &&
    !enemyOnScreen[screenNumber - 1].isAttacking &&
    !enemyOnScreen[screenNumber - 1].isDirectionRight
  ) {
    ctx.drawImage(
      enemyImage,
      0,
      0,
      66,
      85,
      enemyOnScreen[screenNumber - 1].x,
      enemyOnScreen[screenNumber - 1].y - 100,
      100,
      100
    );
  } else if (
    enemyOnScreen[screenNumber - 1].ishere &&
    enemyOnScreen[screenNumber - 1].isAttacking &&
    !enemyOnScreen[screenNumber - 1].isDirectionRight
  ) {
    ctx.drawImage(
      enemyImage,
      enemyX,
      enemyY,
      146,
      76,
      enemyOnScreen[screenNumber - 1].x - 121,
      enemyOnScreen[screenNumber - 1].y - 100,
      221,
      100
    );
  } else if (
    enemyOnScreen[screenNumber - 1].ishere &&
    !enemyOnScreen[screenNumber - 1].isAttacking &&
    enemyOnScreen[screenNumber - 1].isDirectionRight
  ) {
    ctx.drawImage(
      enemyImagef,
      1934,
      0,
      66,
      85,
      enemyOnScreen[screenNumber - 1].x,
      enemyOnScreen[screenNumber - 1].y - 100,
      100,
      100
    );
  } else if (
    enemyOnScreen[screenNumber - 1].ishere &&
    enemyOnScreen[screenNumber - 1].isAttacking &&
    enemyOnScreen[screenNumber - 1].isDirectionRight
  ) {
    ctx.drawImage(
      enemyImagef,
      enemyX,
      enemyY,
      146,
      76,
      enemyOnScreen[screenNumber - 1].x,
      enemyOnScreen[screenNumber - 1].y - 100,
      221,
      100
    );
  }

  if (enemyOnScreen[screenNumber - 1].ishere) {
    ctx.drawImage(
      progressBarEmpty,
      0,
      0,
      1500,
      100,
      enemyOnScreen[screenNumber - 1].x - 25,
      enemyOnScreen[screenNumber - 1].y - 150,
      150,
      10
    );
    ctx.drawImage(
      progressBarFull,
      0,
      0,
      enemyOnScreen[screenNumber - 1].health * 15,
      100,
      enemyOnScreen[screenNumber - 1].x - 25,
      enemyOnScreen[screenNumber - 1].y - 150,
      enemyOnScreen[screenNumber - 1].health * 1.5,
      10
    );
  }

  if (!player.haveSword && screenNumber == 1) {
    ctx.drawImage(swordImage, 0, 0, 250, 1093, sword.left, sword.top, 18, 80);
  }

  ctx.drawImage(backgrounds[screenNumber - 1], 0, 0, canvasWidth, canvasHeight);

  if (!enemyOnScreen[1].ishere && !enemyOnScreen[2].ishere) {
    ctx.font = "4rem serif";
    ctx.fillStyle = "white";
    ctx.fillText("You won", canvasWidth / 2 - 100, 200);
  }

  console.log(player.y);
  checkScreen();
  requestAnimationFrame(animate);
}

let atFloor = false;

let staggerFrames = { attack: 0, run: 0, climb: 0, enemyAttack: 0 };

function animatePlayer() {
  if (player_bools.left && !player_bools.isHitting && !player.isClimbing) {
    playerY = 85;
    playerX = Math.floor(staggerFrames.run++ / 4) * 66;
    if (staggerFrames.run == 52) {
      staggerFrames.run = 26;
    }
  } else if (
    player_bools.right &&
    !player_bools.isHitting &&
    !player.isClimbing
  ) {
    playerY = 85;
    playerX = 1934 - Math.floor(staggerFrames.run++ / 4) * 66;
    if (staggerFrames.run == 52) {
      staggerFrames.run = 26;
    }
  } else if (
    player_bools.isDirectionRight &&
    !player_bools.isHitting &&
    !player.isClimbing
  ) {
    playerY = 0;
    playerX = 1934;
  } else if (
    !player_bools.isDirectionRight &&
    !player_bools.isHitting &&
    !player.isClimbing
  ) {
    playerY = 0;
    playerX = 0;
  } else if (
    !player_bools.isDirectionRight &&
    player_bools.isHitting &&
    !player.isClimbing
  ) {
    if (staggerFrames.attack == 0 && player_bools.hittingEnd) {
      player_bools.hittingEnd = false;
      player_bools.isHitting = false;
      // player.x += 121;
    }
    if (player_bools.hittingStart) {
      playerX = Math.floor(staggerFrames.attack++ / 7) * 146;
    } else {
      playerX = Math.floor(staggerFrames.attack-- / 7) * 146;
    }
    playerY = 173;

    if (staggerFrames.attack == 21) {
      player_bools.hittingEnd = true;
      player_bools.hittingStart = false;
      staggerFrames.attack = 14;
    }
  } else if (
    player_bools.isDirectionRight &&
    player_bools.isHitting &&
    !player.isClimbing
  ) {
    if (staggerFrames.attack == 0 && player_bools.hittingEnd) {
      player_bools.hittingEnd = false;
      player_bools.isHitting = false;
    }
    if (player_bools.hittingStart) {
      playerX = 1854 - Math.floor(staggerFrames.attack++ / 7) * 146;
    } else {
      playerX = 1854 - Math.floor(staggerFrames.attack-- / 7) * 146;
    }
    playerY = 173;

    if (staggerFrames.attack == 21) {
      player_bools.hittingEnd = true;
      player_bools.hittingStart = false;
      staggerFrames.attack = 14;
    }
  } else if (
    player_bools.isDirectionRight &&
    player.isClimbing &&
    player_bools.climb1
  ) {
    playerY = 252;
    playerX = 1950 - Math.floor(staggerFrames.climb++ / 4) * 50;
    // player.x += 0.4;
    // player.y -= 10;
    if (staggerFrames.climb >= 32) {
      playerClimbY -= 2;
    }
    if (staggerFrames.climb == 64) {
      staggerFrames.climb = 0;
      player_bools.climb1 = false;
      player_bools.climb2 = true;
      player.x += 30;
    }
  } else if (
    player_bools.isDirectionRight &&
    player.isClimbing &&
    player_bools.climb2
  ) {
    playerClimbY = -100;
    playerY = 369;
    playerX = 1937 - Math.floor(staggerFrames.climb++ / 4) * 63;
    if (staggerFrames.climb == 76) {
      player_bools.climb2 = false;
      staggerFrames.climb = 0;
      player.isClimbing = false;
    }
  }
}

function animateEnemy() {
  if (enemyOnScreen[screenNumber - 1].ishere) {
    if (!enemyOnScreen[screenNumber - 1].isDirectionRight) {
      if (enemyOnScreen[screenNumber - 1].isAttacking) {
        if (staggerFrames.enemyAttack == 0 && enemyAttackEnd) {
          enemyAttackEnd = false;
          enemyAttackStart = false;
          enemyOnScreen[screenNumber - 1].isAttacking = false;
        }
        if (enemyAttackStart) {
          enemyX = Math.floor(staggerFrames.enemyAttack++ / 7) * 146;
        } else {
          enemyX = Math.floor(staggerFrames.enemyAttack-- / 7) * 146;
        }
        enemyY = 173;

        if (staggerFrames.enemyAttack == 21) {
          enemyAttackEnd = true;
          enemyAttackStart = false;
          staggerFrames.enemyAttack = 14;
        }
      } else {
        enemyX = 0;
        enemyY = 0;
      }
    } else {
      if (enemyOnScreen[screenNumber - 1].isAttacking) {
        if (staggerFrames.enemyAttack == 0 && enemyAttackEnd) {
          enemyAttackEnd = false;
          enemyAttackStart = false;
          enemyOnScreen[screenNumber - 1].isAttacking = false;
          // enemy.x -= 121;
        }
        if (enemyAttackStart) {
          enemyX = 1854 - Math.floor(staggerFrames.enemyAttack++ / 7) * 146;
        } else {
          enemyX = 1854 - Math.floor(staggerFrames.enemyAttack-- / 7) * 146;
        }
        enemyY = 173;

        if (staggerFrames.enemyAttack == 21) {
          enemyAttackEnd = true;
          enemyAttackStart = false;
          staggerFrames.enemyAttack = 14;
        }
      } else {
        enemyX = 0;
        enemyY = 0;
      }
    }
  }
}

animate();
