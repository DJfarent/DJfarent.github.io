document.addEventListener("DOMContentLoaded", function () {
  const pluvElement = document.getElementById("pluv");
  const pluvBubbleElement = document.getElementById("pluv-bubble");

  if (!pluvElement || !pluvBubbleElement) return;

  const pluvMessages = [
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
    "High Five!", "You Shall Not Pass!", "Im Not A Cat", "Whats Your Name?", "I like SubRosa", "Heard of standard procedures?",
    "Rise and shine…", "Im a fan of Monsota", "I love OXS", "Heard of Nexaco?", "Yeah I LOVE WORLDMODE", "Alex Austin.. Whens the update?",
    "I like Unturned", "Teamfortress is fun", "I Main Spy", "I love RocketJumping", "Speedrunning is fun", "TrickStab!!", "ab di", "doo doo", "ab dulek",
    "uhh","I would love a AS-VAL","I've been thinking about making a game for abit.","Please subscribe @Farten1","RIP H4RMY.","Tarkov offsets","damianek","Nutella Tricks Class",
    "By Any Means", "Standard Procedures", "I like physics based games", "Valve Frame", "Heard of Beta Decay?","We dont talk about jamal","Headphones","Strike Force Heroes",
    "I hate this they keep clicking me over and over"
  ];

  let isFlipping = true;
  let pluvFlipTimer = null;

  pluvElement.addEventListener("click", function () {
    isFlipping = false;

    const randomMessage = pluvMessages[Math.floor(Math.random() * pluvMessages.length)];
    pluvBubbleElement.textContent = randomMessage;
    pluvBubbleElement.style.opacity = "1";
 //pluv turning
    pluvElement.style.transition = "transform 0.2s";
    pluvBubbleElement.style.transition = "transform 0.2s";
    pluvElement.style.transform = "translateY(-15px)";
    pluvBubbleElement.style.transform = "translateY(-15px)";

    setTimeout(function () {
      pluvElement.style.transform = "translateY(0)";
      pluvBubbleElement.style.transform = "translateY(0)";
      isFlipping = true;
    }, 200);

    clearTimeout(window._pluvMessageTimer);
    window._pluvMessageTimer = setTimeout(function () {
      pluvBubbleElement.style.opacity = "0";
    }, 2200);
  });

  function randomlyFlipPluv() {
    if (!isFlipping) return; 

    if (Math.random() > 0.5) {
      pluvElement.style.transform = "scaleX(-1)";
    } else {
      pluvElement.style.transform = "scaleX(1)";
    }
  }

  setInterval(randomlyFlipPluv, 2500);
}); //pluv randomly flipping interval
