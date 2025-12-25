// ================================
// CONFIG
// ================================
const CREATOR_MODE = false; // 🔴 NUR lokal true, NIE live

// ================================
// ELEMENTS (safe grabs)
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
if (dateEl) {
  const today = new Date();
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

// Gumroad Rückkehr (?premium=true)
const params = new URLSearchParams(window.location.search);
if (params.get("premium") === "true") {
  localStorage.setItem("premium", "true");
  isPremium = true;
  history.replaceState({}, "", location.pathname);
}

// ================================
// PREMIUM PAGE PROTECTION
// ================================
if (
  document.body.classList.contains("premium-page") &&
  !isPremium
) {
  window.location.href = "./index.html";
}

// ================================
// CONTENT
// ================================
let entries = [];

fetch("./content.json", { cache: "no-store" })
  .then((res) => {
    if (!res.ok) throw new Error("content.json not found");
    return res.json();
  })
  .then((data) => {
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error("content.json empty");
    }
    entries = data;
    showToday();
  })
  .catch((err) => {
    console.error("Content load failed:", err);
  });

// ================================
// RENDER
// ================================
function showToday() {
  const today = new Date();
  const index =
    Math.floor(today.getTime() / 86400000) % entries.length;

  const entry = entries[index];

  if (titleEl) titleEl.textContent = entry.title || "";
  if (textEl) textEl.textContent = entry.text || "";

  if (isPremium) {
    if (verseEl) verseEl.textContent = entry.verse || "";
    if (blessingEl) blessingEl.textContent = entry.blessing || "";
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


