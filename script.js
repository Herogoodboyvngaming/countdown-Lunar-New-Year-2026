// Ngày Giao thừa chuẩn (17/02/2026 00:00:00 VN)
const GIAO_THUA = new Date("2026-02-17T00:00:00+07:00").getTime();

const daysEl    = document.getElementById("days");
const hoursEl   = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

const toggleBtn = document.getElementById("musicToggle");
const canvas    = document.getElementById("fireworks-canvas");
const ctx       = canvas.getContext("2d");

let player;
let isPlaying = false;
let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// Resize canvas responsive
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// YouTube Player API - load khi cần (lazy)
function onYouTubeIframeAPIReady() {
  player = new YT.Player('youtube-player', {
    height: '0',
    width: '0',
    videoId: 'dVpSEOeql0w', // Nhạc Tết 2026 Remix bạn gửi
    playerVars: {
      autoplay: 0,
      loop: 1,
      playlist: 'dVpSEOeql0w',
      controls: 0,
      showinfo: 0,
      modestbranding: 1,
      rel: 0,
      fs: 0,
      iv_load_policy: 3, // Giảm ads/invasive
      disablekb: 1
    },
    events: {
      onReady: (e) => {
        e.target.setVolume(25); // Volume nền
      }
    }
  });
}

// Nút bật/tắt nhạc
toggleBtn.addEventListener("click", () => {
  if (!player) return; // Chờ API load
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

// Countdown mượt
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
  daysEl.textContent    = String(Math.floor(distance / 86400000)).padStart(2, "0");
  hoursEl.textContent   = String(Math.floor((distance % 86400000) / 3600000)).padStart(2, "0");
  minutesEl.textContent = String(Math.floor((distance % 3600000) / 60000)).padStart(2, "0");
  secondsEl.textContent = String(Math.floor((distance % 60000) / 1000)).padStart(2, "0");
}
setInterval(updateCountdown, 1000);
updateCountdown();

// Canvas pháo hoa siêu nhẹ (adaptive mobile)
let particles = [];
const maxParticles = isMobile ? 25 : 40; // Giảm trên mobile để mượt

function createFirework() {
  if (particles.length > maxParticles * 3) return; // Giới hạn
  const x = Math.random() * canvas.width;
  const y = Math.random() * (canvas.height * 0.4);
  const hue = Math.random() * 360;
  const count = isMobile ? 20 + Math.random() * 15 : 30 + Math.random() * 20;
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 / count) * i;
    const speed = 1.8 + Math.random() * 2.5;
    particles.push({
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 1,
      hue,
      alpha: 1,
      life: 60 + Math.random() * 50
    });
  }
}

function animate() {
  ctx.fillStyle = "rgba(0,0,0,0.12)"; // Clear nhẹ
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p, i) => {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.06; // gravity nhẹ
    p.alpha -= 0.018;
    p.life--;

    if (p.life <= 0 || p.alpha <= 0) {
      particles.splice(i, 1);
      return;
    }

    ctx.beginPath();
    ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(\( {p.hue},100%,65%, \){p.alpha})`;
    ctx.fill();
  });

  requestAnimationFrame(animate);
}

setInterval(createFirework, isMobile ? 2500 : 1800); // Chậm hơn trên mobile
animate();
