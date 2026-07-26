const photo = document.querySelector("#couple-photo");
const photoPlaceholder = document.querySelector("#photo-placeholder");

function showPhoto() {
  photo.hidden = false;
  photoPlaceholder.hidden = true;
}

function showPhotoPlaceholder() {
  photo.hidden = true;
  photoPlaceholder.hidden = false;
}

photo.addEventListener("load", showPhoto);
photo.addEventListener("error", showPhotoPlaceholder);

if (photo.complete) {
  if (photo.naturalWidth > 0) showPhoto();
  else showPhotoPlaceholder();
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.12 },
);

document.querySelectorAll(".reveal").forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index % 5, 3) * 80}ms`;
  revealObserver.observe(element);
});

const eventDate = new Date("2026-09-06T18:00:00+03:00");
const countdownNodes = {
  days: document.querySelector("#days"),
  hours: document.querySelector("#hours"),
  minutes: document.querySelector("#minutes"),
  seconds: document.querySelector("#seconds"),
};

function updateCountdown() {
  const remaining = Math.max(0, eventDate.getTime() - Date.now());
  const values = {
    days: Math.floor(remaining / 86_400_000),
    hours: Math.floor((remaining % 86_400_000) / 3_600_000),
    minutes: Math.floor((remaining % 3_600_000) / 60_000),
    seconds: Math.floor((remaining % 60_000) / 1_000),
  };

  Object.entries(values).forEach(([unit, value]) => {
    countdownNodes[unit].textContent = String(value).padStart(unit === "days" ? 3 : 2, "0");
  });
}

updateCountdown();
setInterval(updateCountdown, 1_000);

const petalsContainer = document.querySelector("#petals");
const petalColors = ["#d6ab9a", "#c9b28d", "#aeb39f", "#e5c9bb"];
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function createPetal() {
  if (reduceMotion.matches || document.hidden) return;

  const petal = document.createElement("i");
  const size = 6 + Math.random() * 8;
  petal.className = "petal";
  petal.style.left = `${Math.random() * 100}vw`;
  petal.style.width = `${size}px`;
  petal.style.height = `${size * 1.35}px`;
  petal.style.background = petalColors[Math.floor(Math.random() * petalColors.length)];
  petal.style.setProperty("--drift", `${-70 + Math.random() * 140}px`);
  petal.style.animationDuration = `${7 + Math.random() * 7}s`;
  petalsContainer.appendChild(petal);
  petal.addEventListener("animationend", () => petal.remove());
}

setInterval(createPetal, 650);
