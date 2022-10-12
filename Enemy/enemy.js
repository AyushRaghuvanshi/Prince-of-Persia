const canvas = document.getElementsByTagName("canvas")[0];
const canvasWidth = canvas.offsetWidth;
const canvasHeight = canvas.offsetHeight;
let healthbar = document.getElementsByTagName("div")[0];
healthbar.style.width = 0.2 * canvasWidth + "px";
let healthbar_width = healthbar.style.width;
console.log(healthbar_width);
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
  }
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
    if (Math.abs(this.x - player.x) <= 180) {
      enemyOnScreen[screenNumber - 1].isAttacking = true;
      enemyAttackStart = true;
      player.health -= 5;
      slashEnemy.play();
      if(enemy.isDirectionRight){
        enemy.x += 121;
      }
      return true;
    }
    enemyOnScreen[screenNumber - 1].isAttacking = false;
    enemyAttackStart = false;
    enemyAttackEnd = false;
    return false;
  }

  attack() {
    
    let step = parseInt(healthbar_width) / 9;
    console.log(healthbar.style.width - step);
    healthbar.style.width =
      parseFloat(healthbar.style.width) * (player.health / 100) + "px";
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
  console.log(enemy1.wherePlayer);
  let attackid = null;
  if (enemy1.health <= 0) {
    enemyOnScreen[screenNumber - 1].ishere = false;
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
