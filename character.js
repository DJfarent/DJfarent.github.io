const character = document.getElementById("character");

const images = {
  left: "2.png",
  center: "1.png",
  right: "3.png"
};

character.src = images.center;

let currentState = "center";

const scales = {
  left: 1.45,
  center: 1.5,
  right: 1.5
};

document.addEventListener("mousemove", (e) => {
  const x = e.clientX;
  const width = window.innerWidth;

  let newState;
  const leftEdge = width * 0.37;
  const rightEdge = width * 0.63;

  if (x < leftEdge) {
    newState = "left";
  } else if (x > rightEdge) {
    newState = "right";
  } else {
    newState = "center";
  }

  if (newState !== currentState) {
    currentState = newState;
    character.src = images[newState];
    character.style.setProperty("--char-scale", scales[newState]);
  }
});

character.src = images.center;
character.style.setProperty("--char-scale", scales.center);
