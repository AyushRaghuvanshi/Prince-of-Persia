const canvas = document.getElementsByTagName("canvas")[0];
const canvasWidth = canvas.offsetWidth;
const canvasHeight = canvas.offsetHeight;
canvas.height = canvasHeight;
canvas.width = canvasWidth;
const ctx = canvas.getContext("2d");
let screenNumber = 1;
let backgrounds = [];
backgrounds.push(new Image());
backgrounds.push(new Image());
backgrounds[0].src = "Backgrounds/1.jpg";
backgrounds[1].src = "Backgrounds/2.jpg";
let playerImage = new Image();
playerImage.src = "Player/spritesheet.png";
let playerImagef = new Image();
playerImagef.src = "Player/spritesheetf.png";
let x = 0;
let playerX;
let playerY;

function animate() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.drawImage(backgrounds[screenNumber - 1], 0, 0, canvasWidth, canvasHeight);
  if (player_bools.isDirectionRight) {
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
  } else {
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
  }

  animatePlayer();
  checkScreen();
  requestAnimationFrame(animate);
}

function animatePlayer() {
  if (player.health <= 0) {
    return;
  }
  if (player_bools.left) {
    playerY = 85;
    playerX = Math.floor(x++ / 4) * 66;
    if (x == 52) x = 26;
  } else if (player_bools.right) {
    playerY = 85;
    playerX = 1934 - Math.floor(x++ / 4) * 66;
    if (x == 52) x = 26;
  } else if (player_bools.isDirectionRight) {
    playerY = 0;
    playerX = 1934;
  } else if (!player_bools.isDirectionRight) {
    playerY = 0;
    playerX = 0;
  }
}

animate();
