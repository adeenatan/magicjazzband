// Try to ensure hero video plays (muted) as background
window.addEventListener("load", function () {
  const vid = document.getElementById("hero-video");
  if (!vid) return;

  vid.muted = true; // just in case
  const playPromise = vid.play();
  if (playPromise !== undefined) {
    playPromise.catch(function (err) {
      // If autoplay is blocked, we just silently keep the poster/fallback image.
      console.log("Hero video autoplay was blocked:", err);
    });
  }
});

// Mobile nav toggle
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  // Close menu when clicking a link (mobile)
  navLinks.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      navLinks.classList.remove("open");
    }
  });
}

// Audio playlist logic
const audio = document.getElementById("audio-player");
const trackList = document.getElementById("track-list");
const playerTitle = document.getElementById("player-title");
const playerSubtitle = document.getElementById("player-subtitle");
const playerCover = document.getElementById("player-cover");

if (audio && trackList) {
  trackList.addEventListener("click", (e) => {
    const item = e.target.closest(".track-item");
    if (!item) return;

    const src = item.dataset.src;
    const title = item.dataset.title || "";
    const subtitle = item.dataset.subtitle || "";
    const cover = item.dataset.cover || "";

    // Update audio source
    audio.pause();
    audio.setAttribute("src", src);
    audio.load();

    // Update text and cover
    if (playerTitle) playerTitle.textContent = title;
    if (playerSubtitle) playerSubtitle.innerHTML = subtitle;
    if (playerCover && cover) playerCover.setAttribute("src", cover);

    // Highlight active track
    trackList.querySelectorAll(".track-item").forEach((li) => {
      li.classList.toggle("active", li === item);
    });

    // Play only when user clicked (no autoplay on load)
    audio.play().catch(() => {
      // Ignore play promise failure (e.g., browser restrictions)
    });
  });
}

// Contact form status handling (optional nicer UX)
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", function (e) {
    // Let the browser actually submit to Formspree
    formStatus.textContent = "Sending...";
    setTimeout(() => {
      // After navigation, user may not see this, but fine.
      formStatus.textContent = "";
    }, 2000);
  });
}

// Year in footer
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}
