// ================================
// CONFIG
// ================================
const CREATOR_MODE = false;

// ================================
// ELEMENTS
// ================================
const dateEl = document.getElementById("date");
const titleEl = document.getElementById("title");
const textEl = document.getElementById("text");
const verseEl = document.getElementById("verse");
const blessingEl = document.getElementById("blessing");
const freeBlock = document.getElementById("freeBlock");
const premiumBlock = document.getElementById("premiumBlock");

// ================================
// DATE
// ================================
const today = new Date();
dateEl.textContent = today.toLocaleDateString("de-DE", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});

// ================================
// PREMIUM STATE
// ================================
let isPremium =
  CREATOR_MODE || localStorage.getItem("premium") === "true";

// Toggle mit Taste P
document.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() === "p") {
    isPremium = !isPremium;
    localStorage.setItem("premium", isPremium);
    render();
  }
});

// ================================
// CONTENT
// ================================
let entries = [];

fetch("./content.json", { cache: "no-store" })
  .then((res) => res.json())
  .then((data) => {
    entries = data;
    render();
  });

function render() {
  const index =
    Math.floor(today.getTime() / 86400000) % entries.length;

  const entry = entries[index];

  titleEl.textContent = entry.title;
  textEl.textContent = entry.text;

  if (isPremium) {
    verseEl.textContent = entry.verse;
    blessingEl.textContent = entry.blessing;
    premiumBlock.style.display = "block";
    freeBlock.style.display = "none";
  } else {
    premiumBlock.style.display = "none";
    freeBlock.style.display = "block";
  }
}
