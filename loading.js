window.addEventListener("DOMContentLoaded", () => {

  const lines = document.querySelectorAll(".load-line");
  const loadingScreen = document.getElementById("loading-screen");

  let index = 0;

  function showLine(){

    if(index < lines.length){

      lines[index].classList.add("show");
      index++;

      setTimeout(showLine, 350);

    } else {

      setTimeout(()=>{

        loadingScreen.style.opacity = "0";
        loadingScreen.style.transition = "opacity 0.6s";

        setTimeout(()=>{
          loadingScreen.remove();
        },600);

      },600);

    }
  }

  showLine();

});


// loads stuff from index into here animation stuff 