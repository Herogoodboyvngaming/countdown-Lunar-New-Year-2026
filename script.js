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

// Danh sách background Tết đẹp (luân phiên)
const backgrounds = [
  "url('https://images.unsplash.com/photo-1673355801566-296921bc92e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80') center/cover no-repeat fixed",  // Hoa mai vàng
  "url('https://images.unsplash.com/photo-1673355818213-b8a14a80fd69?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80') center/cover no-repeat fixed",  // Đèn lồng + hoa đào
  "url('https://images.unsplash.com/photo-1673355824433-d41b5920ca94?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80') center/cover no-repeat fixed",  // Pháo hoa Tết
  "url('https://images.unsplash.com/photo-1741121624468-32a795d62da0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80') center/cover no-repeat fixed"   // Nền đỏ vàng truyền thống
];

let currentBgIndex = 0;

// Nút Change Background
const changeBgBtn = document.getElementById("changeBgBtn");
const body = document.getElementById("body");

changeBgBtn.addEventListener("click", () => {
  currentBgIndex = (currentBgIndex + 1) % backgrounds.length;
  body.style.background = backgrounds[currentBgIndex];
});

// YouTube Player & Volume
let player;
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
      iv_load_policy: 3
    },
    events: { onReady: (e) => e.target.setVolume(100) }
  });
}

const toggleBtn = document.getElementById("musicToggle");
const volumeSlider = document.getElementById("volumeSlider");
let isPlaying = false;

toggleBtn.addEventListener("click", () => {
  if (!player) return;
  if (isPlaying) {
    player.pauseVideo();
    toggleBtn.textContent = "Bật Nhạc Tết ♫";
    toggleBtn.classList.remove("active");
  } else {
    player.playVideo();
    toggleBtn.textContent = "Tắt Nhạc Tết ♫";
    toggleBtn.classList.add("active");
  }
  isPlaying = !isPlaying;
});

volumeSlider.addEventListener("input", () => {
  if (player) player.setVolume(volumeSlider.value);
});

// Canvas hoa mai bay khi click
const canvas = document.getElementById("petals-canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener("resize", () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; });

let petals = [];
const petalColors = ['#FFD700', '#FFC107', '#FFEB3B', '#FFCC00'];

function createPetals(x, y, count = 12) {
  for (let i = 0; i < count; i++) {
    petals.push({
      x: x,
      y: y,
      size: 10 + Math.random() * 15,
      vx: (Math.random() - 0.5) * 6,
      vy: - (5 + Math.random() * 8),
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 10,
      alpha: 1,
      color: petalColors[Math.floor(Math.random() * petalColors.length)],
      life: 120 + Math.random() * 80
    });
  }
}

document.addEventListener("click", (e) => {
  createPetals(e.clientX, e.clientY);
});

function animatePetals() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  petals.forEach((p, i) => {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.15;
    p.rotation += p.rotSpeed;
    p.alpha -= 0.008;
    p.life--;
    if (p.life <= 0 || p.alpha <= 0) { petals.splice(i, 1); return; }
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation * Math.PI / 180);
    ctx.globalAlpha = p.alpha;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.moveTo(0, -p.size);
    ctx.lineTo(p.size * 0.5, p.size * 0.3);
    ctx.lineTo(-p.size * 0.5, p.size * 0.3);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  });
  requestAnimationFrame(animatePetals);
}
animatePetals();
