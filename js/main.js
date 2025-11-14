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

// Also try to start video on first user interaction (for strict autoplay policies)
(function () {
  const vid = document.getElementById("hero-video");
  if (!vid) return;

  function tryPlayOnce() {
    vid.muted = true;
    const p = vid.play();
    if (p && p.catch) {
      p.catch(() => {});
    }
    window.removeEventListener("click", tryPlayOnce);
    window.removeEventListener("touchstart", tryPlayOnce);
  }

  window.addEventListener("click", tryPlayOnce, { once: true });
  window.addEventListener("touchstart", tryPlayOnce, { once: true });
})();

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

// -------------------------
// Audio playlist logic
// -------------------------
// -------------------------
// Audio playlist logic
// -------------------------
document.addEventListener("DOMContentLoaded", function () {
  const audio = document.getElementById("audio-player");
  const trackList = document.getElementById("track-list");
  const cover = document.getElementById("player-cover");
  const title = document.getElementById("player-title");

  if (!audio || !trackList) return;

  function loadTrack(item, autoplay) {
    const src = item.getAttribute("data-src");
    const trackTitle = item.getAttribute("data-title");
    const coverSrc = item.getAttribute("data-cover");

    if (!src) return;

    // Update active state
    document.querySelectorAll(".track-item").forEach(li => li.classList.remove("active"));
    item.classList.add("active");

    // Set audio
    audio.src = src;
    audio.load();

    // Update UI
    if (coverSrc) cover.src = coverSrc;
    if (trackTitle) title.textContent = trackTitle;

    if (autoplay) {
      const p = audio.play();
      if (p && p.catch) p.catch(() => {});
    }
  }

  // Load the first track automatically (no autoplay)
  const first = trackList.querySelector(".track-item");
  if (first) {
    loadTrack(first, false);
  }

  // When user clicks a track
  trackList.addEventListener("click", function (e) {
    const li = e.target.closest(".track-item");
    if (!li) return;
    loadTrack(li, true);
  });
});


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
