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

	if (player_bools.isDirectionRight && !player_bools.isHitting) {
		ctx.drawImage(playerImagef, playerX, playerY, 66, 85, player.x, player.y - player.height, 100, 100);
	} 
  else if (!player_bools.isDirectionRight && !player_bools.isHitting) {
		ctx.drawImage(playerImage, playerX, playerY, 66, 85, player.x, player.y - player.height, 100, 100);
	} 
  else if (player_bools.isDirectionRight && player_bools.isHitting) {
		ctx.drawImage(playerImagef, playerX, playerY, 146, 76, player.x, player.y - player.height, 221, 100);
	} 
  else if (!player_bools.isDirectionRight && player_bools.isHitting) {
		ctx.drawImage(playerImage, playerX, playerY, 146, 76, player.x-121, player.y - player.height, 221, 100);
    
	}
  console.log(playerX, 146);

  

	ctx.drawImage(backgrounds[screenNumber - 1], 0, 0, canvasWidth, canvasHeight);
	animatePlayer();
	checkScreen();
	requestAnimationFrame(animate);
}

let staggerFrames = { attack: 0, run: 0 };

function animatePlayer() {
	// if (player.health <= 0) {
	// 	return;
	// }

	if (player_bools.left && !player_bools.isHitting) {
		playerY = 85;
		playerX = Math.floor(staggerFrames.run++ / 4) * 66;
		if (staggerFrames.run == 52) {
			staggerFrames.run = 26;
		}
	}
  else if (player_bools.right && !player_bools.isHitting) {
		playerY = 85;
		playerX = 1934 - Math.floor(staggerFrames.run++ / 4) * 66;
		if (staggerFrames.run == 52) {
			staggerFrames.run = 26;
		}
	}
  else if (player_bools.isDirectionRight && !player_bools.isHitting) {
		playerY = 0;
		playerX = 1934;
	} 
  else if (!player_bools.isDirectionRight && !player_bools.isHitting) {
		playerY = 0;
		playerX = 0;
	} 
  else if (!player_bools.isDirectionRight && player_bools.isHitting) {
		if (staggerFrames.attack == 0 && player_bools.hittingEnd) {
			player_bools.hittingEnd = false;
			player_bools.isHitting = false;
      // player.x += 121;
		}
		if (player_bools.hittingStart) {
			playerX = Math.floor(staggerFrames.attack++ / 7) * 146;
		} 
    else {
			playerX = Math.floor(staggerFrames.attack-- / 7) * 146;
		}
		playerY = 173;

		if (staggerFrames.attack == 21) {
			player_bools.hittingEnd = true;
			player_bools.hittingStart = false;
      staggerFrames.attack = 14;
		}
	}
  else if (player_bools.isDirectionRight && player_bools.isHitting) {
		if (staggerFrames.attack == 0 && player_bools.hittingEnd) {
			player_bools.hittingEnd = false;
			player_bools.isHitting = false;
		}
		if (player_bools.hittingStart) {
			playerX = 1854 -  Math.floor(staggerFrames.attack++ / 7) * 146;
		} 
    else {
			playerX = 1854 - Math.floor(staggerFrames.attack-- / 7) * 146;
		}
		playerY = 173;

		if (staggerFrames.attack == 21) {
			player_bools.hittingEnd = true;
			player_bools.hittingStart = false;
      staggerFrames.attack = 14;
		}
	}
}

animate();
