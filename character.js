const character = document.getElementById("character");

document.addEventListener("mousemove", (e) => {
  const centerX = window.innerWidth / 1;
  const centerY = window.innerHeight / 1;

  const offsetX = (e.clientX - centerX) * 0.01;
  const offsetY = (e.clientY - centerY) * 0.01;

  character.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
});
