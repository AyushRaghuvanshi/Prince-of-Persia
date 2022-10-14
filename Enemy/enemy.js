const canvas = document.getElementsByTagName("canvas")[0];
const canvasWidth = canvas.offsetWidth;
const canvasHeight = canvas.offsetHeight;
let enemies_died = 0;
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
  {
    ishere: true,
    x: 0.75 * canvasWidth,
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
        enemyOnScreen[screenNumber - 1].isDirectionRight = false;
        return "left";
      } else {
        enemyOnScreen[screenNumber - 1].isDirectionRight = true;
        return "right";
      }
    } else {
      return "idle";
    }
  }
  get inProximity() {
    if (Math.abs(this.x - player.x) <= 180 && !player.isDead) {
      enemyOnScreen[screenNumber - 1].isAttacking = true;
      enemyAttackStart = true;
      slashEnemy.play();

      // if(enemy.isDirectionRight){
      //   enemy.x += 121;
      // }
      return true;
    }
    enemyOnScreen[screenNumber - 1].isAttacking = false;
    enemyAttackStart = false;
    enemyAttackEnd = false;
    return false;
  }

  attack() {
    player.health -= 10;
    healthBar.value = player.health;
    // healthBarWidth -= healthStep;
    // healthBar.style.width = healthBarWidth;
    // let step = parseInt(healthbar_width) / 15;
    // console.log(healthbar.style.width - step);
    // healthbar.style.width =
    //   parseFloat(healthbar.style.width) -step + "px";
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
  id = setInterval(enemyController, 1000);
}
function clearAnimation() {
  if (id != null) {
    clearInterval(id);
  }
}
function enemyController() {
  enemy1.wherePlayer;
  let attackid = null;
  if (enemy1.health <= 0) {
    enemyOnScreen[screenNumber - 1].ishere = false;
    enemies_died++;
    if (attackid) {
      clearTimeout(attackid);
    }
    clearInterval(id);
  }
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
