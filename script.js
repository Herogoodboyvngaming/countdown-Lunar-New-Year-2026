// Countdown đến Giao thừa: 00:00:00 ngày 17/02/2026 (Asia/Ho_Chi_Minh)
const GIAO_THUA = new Date("2026-02-17T00:00:00+07:00").getTime();

const daysEl    = document.getElementById("days");
const hoursEl   = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

const toggleBtn = document.getElementById("musicToggle");

let player;
let isPlaying = false;

// Tạo YouTube Player khi API sẵn sàng
function onYouTubeIframeAPIReady() {
  player = new YT.Player('youtube-player', {
    height: '0',
    width: '0',
    videoId: 'H0k7ISW6KGo',  // Video nhạc Tết không lời 2026 hay nhất
    playerVars: {
      'autoplay': 0,          // Không tự phát lúc đầu
      'loop': 1,
      'playlist': 'H0k7ISW6KGo',  // Loop video
      'controls': 0,
      'showinfo': 0,
      'rel': 0,
      'modestbranding': 1,
      'mute': 0
    },
    events: {
      'onReady': onPlayerReady
    }
  });
}

function onPlayerReady(event) {
  // Player sẵn sàng, volume thấp cho nền
  event.target.setVolume(30);  // Volume 30% (thấp để làm nền)
}

// Nút bật/tắt nhạc
toggleBtn.addEventListener("click", () => {
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

// Countdown function (giữ nguyên)
function updateCountdown() {
  const now = new Date().getTime();
  const distance = GIAO_THUA - now;

  if (distance <= 0) {
    daysEl.textContent = "CHÚC";
    hoursEl.textContent = "MỪNG";
    minutesEl.textContent = "NĂM";
    secondsEl.textContent = "MỚI";
    return;
  }

  const days    = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours   = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  daysEl.textContent    = String(days).padStart(2, "0");
  hoursEl.textContent   = String(hours).padStart(2, "0");
  minutesEl.textContent = String(minutes).padStart(2, "0");
  secondsEl.textContent = String(seconds).padStart(2, "0");
}

setInterval(updateCountdown, 1000);
updateCountdown();
