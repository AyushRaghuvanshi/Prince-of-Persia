class enemy {
  constructor() {
    this.x = 0.7 * canvasWidth;
    this.y = 0.912 * canvasHeight;
    this.health = 100;
  }
  get wherePlayer() {
    console.log("here");
    if (Math.abs(this.y - player.y) <= 5) {
      if (this.x > player.x) {
        return "left";
      } else {
        return "right";
      }
    } else {
      return "idle";
    }
  }
  get inProximity() {
    if (Math.abs(this.x - player.x) <= 20) {
      return true;
    }
    return false;
  }
  attack() {
    player.health -= 10;
    attackflag = true;
  }
}




attackflag = true;
const enemy1 = new enemy();
id = setInterval(enemyController, 100);
function enemyController() {
  let attackid = null;

  console.log(
    player.health,
    player.x,
    enemy1.x,
    player.y,
    enemy1.y,
    enemy1.wherePlayer,
    attackflag
  );
  if (enemy1.inProximity && attackflag) {
    attackflag = false;
    attackid = setTimeout(enemy1.attack, 1000);
  } else {
    if (enemy1.inProximity != true) attackflag = true;
    if (attackid) {
      clearTimeout(attackid);
    }
  }
}
