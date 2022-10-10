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
// let b = new Image();
backgrounds[0].src = "Backgrounds/1.jpg";
backgrounds[1].src = "Backgrounds/2.jpg";
console.log(backgrounds);
let playerImage = new Image();
playerImage.src = "Player/player1.png";

function animate() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.drawImage(backgrounds[screenNumber - 1], 0, 0, canvasWidth, canvasHeight);
  ctx.drawImage(playerImage, player.x, player.y - player.height, 100, 100);
  checkScreen();

  requestAnimationFrame(animate);
}

function checkScreen() {
  if (player.x + player.width >= canvasWidth) {
    screenNumber++;
    clearInterval(gravtity);
    player.x = 5;

    gravtity = setInterval(movements, 10);
  } else if (player.x <= 0) {
    screenNumber--;

    player.x = canvasWidth - player.width - 5;
  }
}

animate();
