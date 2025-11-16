// -------------------------
// Hero video: desktop vs mobile source + autoplay debug version
// -------------------------
(function () {
  const heroVideo = document.getElementById("hero-video");
  if (!heroVideo) {
    console.log("DEBUG: No hero-video element found");
    return;
  }

  function pickHeroSrc() {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    const targetSrc = isMobile
      ? "assets/video/front_page_mobile.mp4"
      : "assets/video/front_page.mp4";

    console.log("DEBUG: pickHeroSrc() running. isMobile =", isMobile);
    console.log("DEBUG: targetSrc =", targetSrc);

    if (heroVideo.dataset.loadedSrc === targetSrc) {
      console.log("DEBUG: Source unchanged; not reloading.");
      return;
    }

    heroVideo.src = targetSrc;
    heroVideo.dataset.loadedSrc = targetSrc;
    heroVideo.load();

    console.log("DEBUG: Video src set to", heroVideo.src);

    heroVideo.muted = true;

    const playPromise = heroVideo.play();
    if (playPromise && playPromise.catch) {
      playPromise.catch((err) => {
        console.log("DEBUG: Autoplay blocked or failed:", err);
      });
    }
  }

  window.addEventListener("load", () => {
    console.log("DEBUG: window load fired");
    pickHeroSrc();
  });

  // Handle orientation/resize
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(pickHeroSrc, 200);
  });

  // Try playing on first interaction
  function tryPlayOnInteraction() {
    console.log("DEBUG: User interaction triggered play()");
    heroVideo.muted = true;
    heroVideo.play().catch(() => {});
    window.removeEventListener("click", tryPlayOnInteraction);
    window.removeEventListener("touchstart", tryPlayOnInteraction);
  }

  window.addEventListener("click", tryPlayOnInteraction, { once: true });
  window.addEventListener("touchstart", tryPlayOnInteraction, { once: true });
})();

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

// -------------------------
// Gigs table (auto-generated)
// -------------------------
document.addEventListener("DOMContentLoaded", function () {
  const gigs = [
     {
      code: "HV 11.23.25",
      event: "Hidden Villa event",
      location: "Los Altos Hills, CA",
      dateISO: "2025-11-23",
      dateLabel: "November 23, 2025",
    },
    {
      code: "School 10.21.25",
      event: "Woodside School – Gratitude Gathering for Annual Fund Kick Off",
      location: "Woodside, CA",
      dateISO: "2025-10-21",
      dateLabel: "October 21, 2025",
    },
    {
      code: "Picnic 10.12.25",
      event: "Peers Park Neighborhood Picnic",
      location: "Palo Alto, CA",
      dateISO: "2025-10-12",
      dateLabel: "October 12, 2025",
    },
    {
      code: "HV 10.3.25",
      event: "Hidden Villa – Fall Concert",
      location: "Los Altos Hills, CA",
      dateISO: "2025-10-03",
      dateLabel: "October 3, 2025",
    },
    {
      code: "DreamVols 9.4.25",
      event: "Dream Volunteers – Community Event",
      location: "Woodside, CA",
      dateISO: "2025-09-04",
      dateLabel: "September 4, 2025",
    },
    {
      code: "DreamVols 8.28.25",
      event: "Dream Volunteers – Summer Event",
      location: "Los Altos, CA",
      dateISO: "2025-08-28",
      dateLabel: "August 28, 2025",
    },
    {
      code: "HV 8.23.25",
      event: "Hidden Villa – Summer Outdoor Concert",
      location: "Los Altos Hills, CA",
      dateISO: "2025-08-23",
      dateLabel: "August 23, 2025",
    },
    {
      code: "BlockParty 6.8.25",
      event: "Evergreen Neighborhood Block Party",
      location: "Palo Alto, CA",
      dateISO: "2025-06-08",
      dateLabel: "June 8, 2025",
    },
    {
      code: "CSA 5.9.25",
      event: "CSA Community Services Agency – Spring Celebration",
      location: "Mountain View, CA",
      dateISO: "2025-05-09",
      dateLabel: "May 9, 2025",
    },
    {
      code: "CSA 4.27.25",
      event: "CSA Community Services Agency – Community Event",
      location: "Mountain View, CA",
      dateISO: "2025-04-27",
      dateLabel: "April 27, 2025",
    },
    {
      code: "HV 4.19.25",
      event: "Hidden Villa – Spring Concert",
      location: "Los Altos Hills, CA",
      dateISO: "2025-04-19",
      dateLabel: "April 19, 2025",
    },
    {
      code: "Hidden Villa 2.1.25",
      event: "Hidden Villa – Winter Show",
      location: "Los Altos Hills, CA",
      dateISO: "2025-02-01",
      dateLabel: "February 1, 2025",
    },
     {
      code: "The Village Chabad  12.15.24",
      event: "The Village Chabad – Chanukah 2024",
      location: "Portola Valley, CA",
      dateISO: "2024-12-15",
      dateLabel: "December 15, 2024",
    },
         {
      code: "Portola Vineyards  12.08.24",
      event: "Portola Vineyards",
      location: "Portola Valley, CA",
      dateISO: "2024-12-08",
      dateLabel: "December 8, 2024",
    },
        {
      code: "EPNAPicnic 10.13.24",
      event: "Peers Park Neighborhood Picnic",
      location: "Palo Alto, CA",
      dateISO: "2024-10-13",
      dateLabel: "October 13, 2024",
    },
    {
      code: "EPNAPicnic 10.1.23",
      event: "Peers Park Neighborhood Picnic",
      location: "Palo Alto, CA",
      dateISO: "2023-10-01",
      dateLabel: "October 1, 2023",
    },
    {
      code: "BlockParty 6.4.23",
      event: "Evergreen Neighborhood Block Party",
      location: "Palo Alto, CA",
      dateISO: "2023-06-04",
      dateLabel: "June 4, 2023",
    },
    {
      code: "Epidemiology 12.8.22",
      event: "Stanford Epidemiology – Holiday Event",
      location: "Stanford, CA",
      dateISO: "2022-12-08",
      dateLabel: "December 8, 2022",
    },
    {
      code: "EPNAPicnic 10.9.22",
      event: "Peers Park Neighborhood Picnic",
      location: "Palo Alto, CA",
      dateISO: "2022-10-09",
      dateLabel: "October 9, 2022",
    },
    {
      code: "CERAS 6.10.22",
      event: "Center for Education Research at Stanford Event",
      location: "Stanford, CA",
      dateISO: "2022-06-10",
      dateLabel: "June 10, 2022",
    },
    {
      code: "BlockParty 6.5.22",
      event: "Neighborhood Block Party",
      location: "Palo Alto, CA",
      dateISO: "2022-06-05",
      dateLabel: "June 5, 2022",
    },
    {
      code: "CERAS 5.19.22",
      event: "Center for Education Research at Stanford Event",
      location: "Stanford, CA",
      dateISO: "2022-05-19",
      dateLabel: "May 19, 2022",
    },
    {
      code: "CERAS 4.14.22",
      event: "Center for Education Research at Stanford Event",
      location: "Stanford, CA",
      dateISO: "2022-04-14",
      dateLabel: "April 14, 2022",
    },
    {
      code: "CERAS 3.10.22",
      event: "Center for Education Research at Stanford Event",
      location: "Stanford, CA",
      dateISO: "2022-03-10",
      dateLabel: "March 10, 2022",
    },
  ];

  // sort latest first by dateISO
  gigs.sort((a, b) => (a.dateISO < b.dateISO ? 1 : -1));

  const tbody = document.getElementById("gigs-body");
  if (!tbody) return;

  gigs.forEach((g) => {
    const tr = document.createElement("tr");

    const tdEvent = document.createElement("td");
    tdEvent.textContent = g.event;

    const tdLocation = document.createElement("td");
    tdLocation.textContent = g.location || "";

    const tdDate = document.createElement("td");
    tdDate.textContent = g.dateLabel;

    tr.appendChild(tdEvent);
    tr.appendChild(tdLocation);
    tr.appendChild(tdDate);
    tbody.appendChild(tr);
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

 

// -------------------------
// Mobile nav toggle + shrink-on-scroll header
// -------------------------
document.addEventListener("DOMContentLoaded", function () {
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks  = document.querySelector(".nav-links");
  const header    = document.querySelector(".site-header");
  const hero      = document.querySelector(".section-hero");

  // --- Mobile hamburger behavior ---
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      const isOpen = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Close menu after choosing a link (good on mobile)
    navLinks.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // --- Header stripe + logo shrink on scroll ---
  if (header && hero) {
    const heroHeight = hero.offsetHeight;

    function updateHeaderOnScroll() {
      const threshold = heroHeight * 0.25; // start effect after ~25% scroll
      if (window.scrollY > threshold) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }

    // Run once on load, then on scroll
    updateHeaderOnScroll();
    window.addEventListener("scroll", updateHeaderOnScroll);
  }
});

// Fade-in when page fully loaded
window.addEventListener("load", () => {
  document.body.classList.add("page-loaded");
});

