const toggle = document.getElementById("modeToggle");
const character = document.getElementById("character");

let current = "smog";

toggle.addEventListener("click", () => {

  character.style.opacity = 0;

  setTimeout(() => {

    if (current === "smog") {
      character.src = "zelenomash.png";
      toggle.textContent = "ZELENOMASH";
      current = "zelenomash";
    } else {
      character.src = "smog.png";
      toggle.textContent = "SMOG";
      current = "smog";
    }

    character.style.opacity = 1;

  }, 200);
});
