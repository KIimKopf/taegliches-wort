// ================================
// CONFIG
// ================================
const CREATOR_MODE = false; // lokal true erlaubt

// ================================
// ELEMENTS (SAFE)
// ================================
const dateEl = document.getElementById("date");
const titleEl = document.getElementById("title");
const textEl = document.getElementById("text");
const verseEl = document.getElementById("verse");
const blessingEl = document.getElementById("blessing");
const premiumBlock = document.getElementById("premiumBlock");

// ================================
// DATE
// ================================
const today = new Date();
if (dateEl) {
  dateEl.textContent = today.toLocaleDateString("de-DE", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// ================================
// PREMIUM STATUS
// ================================
let isPremium =
  CREATOR_MODE || localStorage.getItem("premium") === "true";

// Gumroad Rückkehr
const params = new URLSearchParams(window.location.search);
if (params.get("premium") === "true") {
  localStorage.setItem("premium", "true");
  isPremium = true;
  history.replaceState({}, "", location.pathname);
}

// ================================
// CONTENT
// ================================
let entries = [];

fetch("./content.json", { cache: "no-store" })
  .then((res) => res.json())
  .then((data) => {
    entries = data;
    showToday();
  });

function showToday() {
  if (!entries.length) return;

  const index =
    Math.floor(today.getTime() / 86400000) % entries.length;

  const entry = entries[index];

  if (titleEl) titleEl.textContent = entry.title;
  if (textEl) textEl.textContent = entry.text;

  if (isPremium) {
    if (verseEl) verseEl.textContent = entry.verse;
    if (blessingEl) blessingEl.textContent = entry.blessing;
    if (premiumBlock) premiumBlock.style.display = "none";
  } else {
    if (verseEl) verseEl.textContent = "";
    if (blessingEl) blessingEl.textContent = "";
    if (premiumBlock) premiumBlock.style.display = "block";
  }
}

// ================================
// DEV PREMIUM TOGGLE (Taste P)
// ================================
window.addEventListener("keydown", (e) => {
  if (e.key === "p" || e.key === "P") {
    const current = localStorage.getItem("premium") === "true";
    localStorage.setItem("premium", (!current).toString());
    console.log("🔁 Premium jetzt:", !current);
    location.reload();
  }
});
