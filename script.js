// Config
const messages = [
  "20/10 vui vẻ nhé vợ yêu!",
  "Chúc em, người phụ nữ tuyệt vời nhất đời anh luôn xinh đẹp, hạnh phúc và khoẻ mạnh mỗi ngày.",
  "Cảm ơn em vì đã đến và mãi là bến bình yên cho anh quay về.",
  "Yêu em nhiều! ❤️"
];
const youtubeVideoUrl = "https://www.youtube.com/embed/2Vv-BfVoq4g?autoplay=1&rel=0"; // default: Perfect - Ed Sheeran (official video id).
// Note: autoplay may be blocked by some browsers; clicking Play will try to start playback.
// You can replace the URL above with any embeddable YouTube link you prefer.

// Elements
const playBtn = document.getElementById("playBtn");
const card = document.getElementById("card");
const messagesContainer = document.getElementById("messages");
const ytIframe = document.getElementById("yt-iframe");
const overlay = document.getElementById("overlay");

// Create floating hearts (tim bay)
function spawnHeart() {
  const h = document.createElement("div");
  h.className = "heart";
  const size = Math.floor(Math.random() * 16) + 12;
  h.style.width = `${size}px`;
  h.style.height = `${size}px`;
  h.style.left = Math.random() * 100 + "%";
  h.style.bottom = "-20px";
  h.style.animationDuration = (6 + Math.random() * 6) + "s";
  overlay.appendChild(h);
  setTimeout(()=> h.remove(), 12000);
}

// spawn hearts periodically
let heartInterval;
function startHearts(){ heartInterval = setInterval(spawnHeart, 600); }
function stopHearts(){ clearInterval(heartInterval); }

// Reveal messages one by one
function showMessages() {
  card.classList.remove("hidden");
  messagesContainer.innerHTML = "";
  messages.forEach((text, idx) => {
    const el = document.createElement("div");
    el.className = "message-line";
    el.innerHTML = text.replace(/(Bảo Vy)/g, '<strong>$1</strong>');
    messagesContainer.appendChild(el);
    setTimeout(()=> {
      el.style.opacity = 1;
      el.style.transform = "translateY(0)";
    }, 800 + idx * 1800);
  });
}

// Play / start sequence
let started = false;
playBtn.addEventListener("click", ()=> {
  if (started) return;
  started = true;
  // start hearts
  startHearts();
  // set YouTube iframe src and try to autoplay
  ytIframe.src = youtubeVideoUrl;
  // show messages
  showMessages();
  // change button
  playBtn.textContent = "Đang chạy...";
  playBtn.disabled = true;
});

// Accessibility: allow Enter to trigger
playBtn.addEventListener("keyup", (e)=> { if(e.key === 'Enter') playBtn.click(); });

// Small touch: click anywhere stops hearts after 40s to reduce CPU
setTimeout(()=> { setTimeout(stopHearts, 40000); }, 1000);