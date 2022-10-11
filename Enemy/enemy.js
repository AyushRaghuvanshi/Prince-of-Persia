const canvas = document.getElementsByTagName("canvas")[0];
const canvasWidth = canvas.offsetWidth;
const canvasHeight = canvas.offsetHeight;

let enemyOnScreen = [
  {
    ishere: false,
  },
  {
    ishere: true,
    x: 0.5 * canvasWidth,
    y: 0.912 * canvasHeight,
    health: 100,
    isAttacking: false,
    isDirectionRight: false,
  },
];

let enemyAttackStart = false;
let enemyAttackEnd = false;

class enemy {
  constructor(x, y, health) {
    this.x = x;
    this.y = y;
    this.health = health;
  }
  get wherePlayer() {
    if (Math.abs(this.y - player.y) <= 5) {
      if (this.x > player.x) {
        enemyOnScreen[screenNumber - 1].isAttacking = true;
        enemyOnScreen[screenNumber - 1].isDirectionRight = false;
        enemyAttackStart = true;
        return "left";
      } else {
        enemyOnScreen[screenNumber - 1].isAttacking = true;
        enemyOnScreen[screenNumber - 1].isDirectionRight = true;
        enemyAttackStart = true;
        return "right";
      }
    } else {
      enemyOnScreen[screenNumber - 1].isAttacking = false;
      enemyAttackStart = false;
      enemyAttackEnd = false;
      return "idle";
    }
  }
  get inProximity() {
    if (Math.abs(this.x - player.x) <= 300) {
      return true;
    }
    enemyOnScreen[screenNumber - 1].isAttacking = false;
    return false;
  }

  attack() {
    player.health -= 10;
    enemyAttackStart = true;
    enemyOnScreen[screenNumber - 1].isAttacking = true;
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
