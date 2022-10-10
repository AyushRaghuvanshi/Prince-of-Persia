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
backgrounds[0].src = "Backgrounds/1.png";
backgrounds[1].src = "Backgrounds/2.png";
let playerImage = new Image();
playerImage.src = "Player/spritesheet.png";
let playerImagef = new Image();
playerImagef.src = "Player/spritesheetf.png";
let x = 0;
let playerX;
let playerY;

function animate() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  
  if(player_bools.isDirectionRight && !player_bools.isHitting){
    ctx.drawImage(playerImagef, playerX, playerY, 66, 85, player.x, player.y - player.height, 100, 100);
  }
  else if(!player_bools.isDirectionRight && !player_bools.isHitting){
    ctx.drawImage(playerImage, playerX, playerY, 66, 85, player.x, player.y - player.height, 100, 100);
  }
  else if(player_bools.isDirectionRight && player_bools.isHitting){
    ctx.drawImage(playerImagef, playerX, playerY, 146, 76, player.x, player.y - player.height, 221, 100);
  }
  else if(!player_bools.isDirectionRight && player_bools.isHitting){
    ctx.drawImage(playerImage, playerX, playerY, 146, 76, player.x, player.y - player.height, 221, 100);
  }
  
  console.log(player_bools.isDirectionRight, player_bools.left, player_bools.right);
  ctx.drawImage(backgrounds[screenNumber - 1], 0, 0, canvasWidth, canvasHeight);
  animatePlayer();
  checkScreen();
  requestAnimationFrame(animate);
}

let animationSpeed = {attack: 0, run: 0};
function animatePlayer(){
  if (player.health <= 0) {
    return;
  }
  
  if(player_bools.left && !player_bools.isHitting){
    playerY = 85;
    playerX = Math.floor(x++/4)*66;
    if(x==52)x=26;
  }
  else if(player_bools.right && !player_bools.isHitting){
    playerY = 85;
    playerX = 1934 - Math.floor(x++/4)*66;
    if(x==52)x=26;
  }
  else if(player_bools.isDirectionRight && !player_bools.isHitting){
    playerY = 0;
    playerX = 1934;
  }
  else if(!player_bools.isDirectionRight && !player_bools.isHitting){
    playerY = 0;
    playerX = 0;
  }
  else if(!player_bools.isDirectionRight && player_bools.isHitting){
    if(animationSpeed.attack==0 && player_bools.hittingEnd){
      player_bools.hittingEnd = false;
      player_bools.isHitting = false;
    }
    if(player_bools.hittingStart){
      playerX = Math.floor(animationSpeed.attack++/8)*146;
    }
    else{
      playerX = Math.floor(animationSpeed.attack--/8)*146;
    }
    playerY = 173;
    
    if(animationSpeed.attack==24){
      player_bools.hittingEnd = true;
      player_bools.hittingStart = false;
    }
  }
}

animate();
