let enemyOnScreen = [
  {
    ishere: false,
  },
  {
    ishere: true,
    x: 0.5 * canvasWidth,
    y: 0.912 * canvasHeight,
    health: 100,
  },
];

class enemy {
  constructor(x, y, health) {
    this.x = x;
    this.y = y;
    this.health = health;
  }
  get wherePlayer() {
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
    enemyOnScreen[screenNumber - 1].health -= 10;
    attackflag = true;
  }
}

attackflag = true;
var enemy1;
let id = null;
function enemy_creation(x, y, health) {
  enemy1 = new enemy(x, y, health);
  attackflag = true;
  if (id != null) {
    clearInterval(id);
  }
  id = setInterval(enemyController, 100);
}
function clearAnimation() {
  if (id != null) {
    clearInterval(id);
  }
}
function enemyController() {
  let attackid = null;
  if (enemy1.health <= 0) {
    enemyOnScreen[screenNumber - 1].ishere = false;
    clearInterval(id);
  }
  console.log(player.health, enemy1.health);

  if (enemy1.inProximity && attackflag && player.health > 0) {
    attackflag = false;
    attackid = setTimeout(enemy1.attack, 1000);
  } else {
    if (enemy1.inProximity != true) attackflag = true;
    if (attackid) {
      clearTimeout(attackid);
    }
  }
}
