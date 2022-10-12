let button = document.getElementsByTagName("button")[0];
button.onclick = () => {
  console.log("here");
  window.location.assign("game.html");
};
let audiom = new Audio("UI/intro.mp3");
audiom.autoplay=true;
audiom.play();
