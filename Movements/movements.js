let player = {
  x: 250,
  y: 0,
};
let upflag = true;
let gravtity = setInterval(movements, 10);
let velocity = 0;

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    player.x--;
  }
  if (event.key === "ArrowRight") {
    player.x++;
  }
  if (event.key === "ArrowUp") {
    if (upflag) {
      velocity = -10;
      upflag = false;
    }
  }
  if (event.key === "ArrowDown") {
  }
});

function movements() {
  player.y += velocity;
  let condition = checkGround(player.x, player.y, 100, 100);
  console.log(player.y, velocity, condition);
  if (condition === true) {
    
    velocity++;
  } else {
    upflag=true;
    player.y = parseInt(condition) + 1;
    velocity = 0;
  }
}