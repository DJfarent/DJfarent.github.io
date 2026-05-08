const characterElement = document.getElementById("character");

const characterImages = {
  left: "2.png",
  center: "1.png",
  right: "3.png"
};

const characterScales = {
  left: 1.45,
  center: 1.5,
  right: 1.5
};

let currentCharacterState = "center";
characterElement.src = characterImages.center;
characterElement.style.setProperty("--char-scale", characterScales.center);

document.addEventListener("mousemove", (event) => {
  const mouseX = event.clientX;
  const viewportWidth = window.innerWidth;

  const leftBoundary = viewportWidth * 0.37;
  const rightBoundary = viewportWidth * 0.63;

  let newCharacterState;
  if (mouseX < leftBoundary) {
    newCharacterState = "left";
  } else if (mouseX > rightBoundary) {
    newCharacterState = "right";
  } else {
    newCharacterState = "center";
  }

  if (newCharacterState !== currentCharacterState) {
    currentCharacterState = newCharacterState;
    characterElement.src = characterImages[newCharacterState];
    characterElement.style.setProperty("--char-scale", characterScales[newCharacterState]);
  }
});
