// Countdown chuẩn
const GIAO_THUA = new Date("2026-02-17T00:00:00+07:00").getTime();
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

function updateCountdown() {
  const now = Date.now();
  const distance = GIAO_THUA - now;
  if (distance <= 0) {
    daysEl.textContent = "CHÚC";
    hoursEl.textContent = "MỪNG";
    minutesEl.textContent = "NĂM";
    secondsEl.textContent = "MỚI";
    return;
  }
  daysEl.textContent = String(Math.floor(distance / 86400000)).padStart(2, "0");
  hoursEl.textContent = String(Math.floor((distance % 86400000) / 3600000)).padStart(2, "0");
  minutesEl.textContent = String(Math.floor((distance % 3600000) / 60000)).padStart(2, "0");
  secondsEl.textContent = String(Math.floor((distance % 60000) / 1000)).padStart(2, "0");
}
setInterval(updateCountdown, 1000);
updateCountdown();

// Background luân phiên
const backgrounds = [
  "url('https://images.unsplash.com/photo-1673355801566-296921bc92e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80') center/cover no-repeat fixed",
  "url('https://images.unsplash.com/photo-1673355818213-b8a14a80fd69?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80') center/cover no-repeat fixed",
  "url('https://images.unsplash.com/photo-1673355824433-d41b5920ca94?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80') center/cover no-repeat fixed",
  "url('https://images.unsplash.com/photo-1741121624468-32a795d62da0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80') center/cover no-repeat fixed"
];

let currentBgIndex = 0;
document.getElementById("changeBgBtn").addEventListener("click", () => {
  currentBgIndex = (currentBgIndex + 1) % backgrounds.length;
  document.getElementById("body").style.background = backgrounds[currentBgIndex];
});

// YouTube Music - Fix cho mobile
let player;
let playerReady = false;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('youtube-player', {
    height: '0',
    width: '0',
    videoId: 'dVpSEOeql0w',
    playerVars: {
      autoplay: 0,
      loop: 1,
      playlist: 'dVpSEOeql0w',
      controls: 0,
      showinfo: 0,
      modestbranding: 1,
      rel: 0,
      fs: 0,
      iv_load_policy: 3,
      playsinline: 1
    },
    events: {
      'onReady': onPlayerReady,
      'onError': (e) => {
        console.error("YouTube Error:", e.data);
        alert("Lỗi phát nhạc: " + e.data + ". Thử reload trang hoặc bấm nút lại!");
      }
    }
  });
}

function onPlayerReady(event) {
  playerReady = true;
  event.target.setVolume(100);
  console.log("YouTube ready! Bấm nút để phát.");
}

const toggleBtn = document.getElementById("musicToggle");
const volumeSlider = document.getElementById("volumeSlider");
let isPlaying = false;

toggleBtn.addEventListener("click", () => {
  if (!player || !playerReady) {
    alert("Nhạc đang load... Chờ 3-5s rồi bấm lại nhé! (Trên mobile cần tương tác trước)");
    return;
  }
  if (isPlaying) {
    player.pauseVideo();
    toggleBtn.textContent = "Bật Nhạc Tết ♫";
    toggleBtn.classList.remove("active");
  } else {
    // Trick mobile: Mute tạm rồi unmute để bypass block
    player.mute();
    player.playVideo();
    setTimeout(() => {
      if (player && player.unMute) player.unMute();
    }, 500);
    toggleBtn.textContent = "Tắt Nhạc Tết ♫";
    toggleBtn.classList.add("active");
  }
  isPlaying = !isPlaying;
});

volumeSlider.addEventListener("input", () => {
  if (player && playerReady) {
    player.setVolume(volumeSlider.value);
  }
});

// Canvas 🌸 bay khi bấm màn hình
const canvas = document.getElementById("emoji-canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

let emojis = [];

function createEmojis(x, y, count = 10) {
  for (let i = 0; i < count; i++) {
    emojis.push({
      x: x,
      y: y,
      size: 35 + Math.random() * 40,
      vx: (Math.random() - 0.5) * 10,
      vy: - (10 + Math.random() * 15),
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 15,
      alpha: 1,
      life: 80 + Math.random() * 120
    });
  }
}

document.addEventListener("click", (e) => {
  createEmojis(e.clientX, e.clientY);
});

function animateEmojis() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  emojis.forEach((e, i) => {
    e.x += e.vx;
    e.y += e.vy;
    e.vy += 0.2;
    e.rotation += e.rotSpeed;
    e.alpha -= 0.012;
    e.life--;

    if (e.life <= 0 || e.alpha <= 0) {
      emojis.splice(i, 1);
      return;
    }

    ctx.save();
    ctx.translate(e.x, e.y);
    ctx.rotate(e.rotation * Math.PI / 180);
    ctx.globalAlpha = e.alpha;
    ctx.font = `${e.size}px serif`;
    ctx.fillStyle = '#FFD700';
    ctx.textAlign = 'center';
    ctx.fillText('🌸', 0, 0);
    ctx.restore();
  });

  requestAnimationFrame(animateEmojis);
}
animateEmojis();
