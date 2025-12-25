// 🔧 CREATOR OVERRIDE (NUR FÜR DICH)
const CREATOR_MODE = true;

// 🔓 Premium-Status
let isPremium =
  CREATOR_MODE ||
  localStorage.getItem("premium") === "true";

// 🔑 Gumroad-Redirect (falls du später willst)
const params = new URLSearchParams(window.location.search);
if (params.get("premium") === "true") {
  localStorage.setItem("premium", "true");
  isPremium = true;
  window.history.replaceState({}, document.title, window.location.pathname);
}

// 🔗 DOM
const dateEl = document.getElementById("date");
const titleEl = document.getElementById("title");
const textEl = document.getElementById("text");
const verseEl = document.getElementById("verse");
const blessingEl = document.getElementById("blessing");
const premiumBlock = document.getElementById("premiumBlock");

const today = new Date();

// 📅 Datum anzeigen
dateEl.textContent = today.toLocaleDateString("de-DE", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric"
});

let entries = [];

// 📦 Inhalte laden
fetch("./content.json", { cache: "no-store" })
  .then(res => res.json())
  .then(data => {
    entries = data;
    showToday();
  });

function showToday() {
  const index =
    Math.floor(today.getTime() / 86400000) % entries.length;

  const entry = entries[index];

  titleEl.textContent = entry.title;
  textEl.textContent = entry.text;

  if (isPremium) {
    // ✅ PREMIUM
    verseEl.textContent = entry.verse;
    blessingEl.textContent = entry.blessing;
    premiumBlock.style.display = "none";
  } else {
    // 🔒 FREE
    verseEl.textContent = "";
    blessingEl.textContent = "";
    premiumBlock.style.display = "block";
  }
}
