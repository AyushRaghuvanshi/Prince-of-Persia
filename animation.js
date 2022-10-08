const canvas = document.getElementsByTagName("canvas")[0];
const canvasWidth = canvas.offsetWidth;
const canvasHeight = canvas.offsetHeight;
canvas.height = canvasHeight;
canvas.width = canvasWidth;
const ctx = canvas.getContext("2d");
let screen = 1;
let backgrounds = [];
backgrounds.push(new Image());
// let b = new Image();
backgrounds[0].src = "Backgrounds/1.jpg"

function animate(){
    ctx.clearRect(0,0, canvasWidth, canvasHeight);
    ctx.drawImage(backgrounds[0], 0, 0, canvasWidth, canvasHeight)
    requestAnimationFrame(animate);

}
console.log(canvasHeight, canvasWidth);

animate();