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
  if (enemy1.health <= 0) {
    clearInterval(id);
  }
  console.log(player.health, enemy1.health);
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
