document.addEventListener("DOMContentLoaded", function () {
  const loadingScreen = document.getElementById("loading-screen");
  const loadingLines = document.querySelectorAll(".load-line");

  let lineDelay = 0;
  loadingLines.forEach((line, index) => {
    setTimeout(() => {
      line.classList.add("show");
      lineDelay += 250; 
    }, index * 250);
  });

  const totalLoadingTime = loadingLines.length * 250; 
  setTimeout(() => {
    loadingScreen.style.opacity = "0";
    loadingScreen.style.pointerEvents = "none";
    loadingScreen.style.transition = "opacity 0.5s ease";
  }, totalLoadingTime);
});
