const titles = [
    "DJfarent.github.io",
    "Chinese Kush rolling",
    "Pixelsurfing..",
    "Dirma",
];

let currentIndex = 0;

setInterval(() => {
    currentIndex = (currentIndex + 1) % titles.length;
    document.title = titles[currentIndex];
}, 2000);

document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
        document.title = titles[0];
        currentIndex = 0;
    }
});