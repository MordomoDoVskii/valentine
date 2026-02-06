/* Valentine Script - With Custom Message */

document.addEventListener("DOMContentLoaded", function () {

  // Elements
  const title = document.getElementById("title");
  const subtitle = document.getElementById("subtitle");
  const gif = document.getElementById("gif");

  const yesBtn = document.getElementById("yesBtn");
  const noBtn = document.getElementById("noBtn");

  const result = document.getElementById("result");

  const music = document.getElementById("music");
  const musicBtn = document.getElementById("musicBtn");

  if (!yesBtn || !noBtn || !musicBtn) {
    alert("Some elements missing!");
    return;
  }

  /* =====================
      MUSIC
  ====================== */

  let musicOn = false;

  async function startMusic() {
    try {
      await music.play();
      musicOn = true;
      musicBtn.textContent = "🔊 Music: On";
    } catch (e) {}
  }

  function stopMusic() {
    music.pause();
    musicOn = false;
    musicBtn.textContent = "🔈 Music: Off";
  }

  musicBtn.addEventListener("click", async function (e) {
    e.stopPropagation();

    if (!musicOn) {
      await startMusic();
    } else {
      stopMusic();
    }
  });

  document.addEventListener("click", function () {
    if (!musicOn) startMusic();
  }, { once:true });


  /* =====================
      GIFS
  ====================== */

  const happyGif =
    "https://media.giphy.com/media/MDJ9IbxxvDUQM/giphy.gif";

  const sadGifs = [
    "https://media.giphy.com/media/ROF8OQvDmxytW/giphy.gif",
    "https://media.giphy.com/media/l2QDM9Jnim1YVILXa/giphy.gif",
    "https://media.giphy.com/media/OPU6wzx8JrHna/giphy.gif",
    "https://media.giphy.com/media/3o6wrvdHFbwBrUFenu/giphy.gif",
    "https://media.giphy.com/media/ISOckXUybVfQ4/giphy.gif"
  ];

  let lastSadIndex = -1;


  /* =====================
      TEXTS
  ====================== */

  const noTexts = [
    "Are you sure? 🥺",
    "Really sure? 😳",
    "Please no 😭",
    "I’ll cry 💔",
    "Think again 😔",
    "Come on 😩",
    "I love you 💕",
    "Just say yes 😍"
  ];

  let noCount = 0;

  let yesScale = 1;
  let noScale = 1;


  /* =====================
      YES BUTTON
  ====================== */

  yesBtn.addEventListener("click", function () {

    startMusic();

    // CUSTOM MESSAGE
    title.textContent = "OBRIGADO SUA CABRAAAA 💖💘💕🌹💌";
    subtitle.textContent = "You just made me the happiest person alive 😭❤️";

    result.innerHTML =
      "<b>Happy Valentine’s Day 💝✨</b><br>Te amo muito 💕💖";

    gif.src = happyGif;

    // Remove NO
    noBtn.style.display = "none";

    // Center YES
    yesBtn.style.position = "relative";
    yesBtn.style.left = "50%";
    yesBtn.style.transform = "translateX(-50%) scale(1.2)";

    yesBtn.textContent = "YES 💞";

    // Disable more clicks
    yesBtn.style.pointerEvents = "none";

    // Effects
    startRain();
  });


  /* =====================
      NO BUTTON
  ====================== */

  noBtn.addEventListener("click", function () {

    startMusic();

    const text =
      noTexts[Math.min(noCount, noTexts.length - 1)];

    title.textContent = text;
    subtitle.textContent = "Be honest… you love me 😘";

    // Random sad gif (no repeat)
    let index;

    do {
      index = Math.floor(Math.random() * sadGifs.length);
    } while (index === lastSadIndex);

    lastSadIndex = index;

    gif.src = sadGifs[index];

    // Resize
    yesScale += 0.25;
    noScale -= 0.15;

    if (noScale < 0.25) noScale = 0.25;

    yesBtn.style.transform = "scale(" + yesScale + ")";
    noBtn.style.transform = "scale(" + noScale + ")";

    if (yesScale >= 1.8) {
      noBtn.style.pointerEvents = "none";
      noBtn.style.opacity = "0.4";
    }

    noCount++;
  });


  /* =====================
      HEART + FLOWER RAIN
  ====================== */

  function startRain() {

    const icons =
      ["💖","💕","💘","💗","💓","🌸","🌹","🌷","✨","💝","💌"];

    for (let i = 0; i < 80; i++) {

      const item = document.createElement("div");

      item.textContent =
        icons[Math.floor(Math.random() * icons.length)];

      item.style.position = "fixed";
      item.style.left = Math.random() * 100 + "vw";
      item.style.top = "-40px";

      item.style.fontSize =
        (14 + Math.random() * 26) + "px";

      item.style.zIndex = "9999";
      item.style.pointerEvents = "none";

      item.style.transition =
        "transform 3.5s linear, opacity 3.5s linear";

      document.body.appendChild(item);

      setTimeout(() => {

        item.style.transform =
          "translateY(120vh) rotate(" +
          (Math.random()*360) + "deg)";

        item.style.opacity = "0";

      }, 50);

      setTimeout(() => {
        item.remove();
      }, 3800);
    }
  }

});
