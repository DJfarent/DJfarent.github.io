document.addEventListener("DOMContentLoaded", function () {
  var pluv = document.getElementById("pluv");
  var bubble = document.getElementById("pluv-bubble");

  if (!pluv || !bubble) return;

  var messages = [
   "Hi", "Under Maintenance", "Nice Site", "Hello", "Dont Click Me", "Meow",
  "Hello There", "Pls Fix Bugs", "My Name Is Pluv!", "Sadsalat Hello?", "Z-Cici", "Z-Shitty",
  "Go Sub To @farten1", "Im Ginger", "Im Made With CSS And JS!", "Im Your Friend", "Watch Out!",
  "Click Me If You Dare", "I See You", "I Like Cookies", "Have You Tried HL2?", "Follow The Crow",
  "Bork Bork", "Im Thinking...", "Insert Witty Comment Here", "Press Buttons", "Is It Snack Time?",
  "Purr...", "404 Fun Not Found", "I Like 4:3 Screens", "Beep Boop", "I Love Friends!", "Dont Forget To Blink",
  "I See A Bug", "Wanna Play A Game?", "Stay Hydrated", "Keep Scrolling", "Hello, Human",
  "Not All Heroes Wear Capes", "I Am Watching You...", "Pluv Loves You", "Im Invisible Sometimes",
  "Do You Like Memes?", "Time For Tea", "I Sing In My Free Time", "Oops, Wrong Button", "Im Sleepy",
  "Yay! You Clicked Me", "Be Careful!", "I Have Secrets", "You Found Me!", "Do A Barrel Roll",
  "Catch Me If You Can", "I Like Pixel Art", "Keep Calm And Game On", "I Am 1337", "Hello From The Other Side",
  "Click Me Again!", "Boo!", "Follow The Light", "I Eat Bugs (Virtual Ones)", "I Am A CSS Wizard",
  "I Come In Peace", "Pssst... Wanna Secret?", "I Like Potatoes", "Ssshhh...", "Beware The Code",
  "High Five!", "You Shall Not Pass!", "Im Not A Cat", "Whats Your Name?", "I like SubRosa", "Heard of standard procedures",
  "Rise and shine…", "Im a fan of Monsota", "I love OXS", "Heard of Nexaco?", "Yeah I LOVE WORLDMODE", "Alex Austin.. Whens the update?",
  "I like Unturned", "Teamfortress is fun", "I Main Spy", "I love RocketJumping", "Speedrunning is fun", "TrickStab!!"
  ];

  var flipping = true;

  pluv.addEventListener("click", function () {
    flipping = false;

    var msg = messages[Math.floor(Math.random() * messages.length)];
    bubble.textContent = msg;
    bubble.style.opacity = "1";

    pluv.style.transition = "transform 0.2s";
    bubble.style.transition = "transform 0.2s";

    // Move Pluv
    pluv.style.transform = "translateY(-15px)";
    bubble.style.transform = "translateY(-15px)";

    setTimeout(function () {
      pluv.style.transform = "translateY(0)";
      bubble.style.transform = "translateY(0)";
      flipping = true;
    }, 200);

    clearTimeout(window._pluvTimer);
    window._pluvTimer = setTimeout(function () {
      bubble.style.opacity = "0";
    }, 2200);
  });

  function randomFlip() {
    if (!flipping) return;
    if (Math.random() > 0.5) {
      pluv.style.transform = "scaleX(-1)";
    } else {
      pluv.style.transform = "scaleX(1)";
    }
  }

  setInterval(randomFlip, 2500);
});
