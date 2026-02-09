window.addEventListener("load", () => {
  const left = document.querySelector(".image.left");
  const right = document.querySelector(".image.right");
  const socials = document.querySelector(".socials");

  setTimeout(() => left.classList.add("show"), 200);
  setTimeout(() => right.classList.add("show"), 500);

  window.addEventListener("scroll", () => {
    if (window.scrollY > window.innerHeight * 0.35) {
      left.classList.add("shrink");
      right.classList.add("shrink");
      socials.classList.add("show");
    } else {
      left.classList.remove("shrink");
      right.classList.remove("shrink");
      socials.classList.remove("show");
    }
  });
});
