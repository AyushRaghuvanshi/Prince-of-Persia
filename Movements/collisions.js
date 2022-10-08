ground = [
  {
    left: 0,
    top: 500,
    height: 500,
    width: 1024,
  },
];
const a = document.createElement("div");
a.style.height = ground[0].height + "px";
a.style.width = ground[0].width + "px";
a.style.top = ground[0].top + "px";
a.style.left = ground[0].left + "px";
a.style.backgroundColor = "black";
a.style.position = "absolute";
const x = document.getElementById("ground");
console.log(x);
x.appendChild(a);
console.log(x);
function checkGround(x, y, height, width) {
  let i = 0;
  if (
    x >= ground[i].left &&
    x <= ground[i].left + ground[i].width &&
    y <= ground[i].top &&
    y <= ground[i].height + ground[i].top
  ) {
    return true;
  }
  return `${ground[i].top}`;
}
