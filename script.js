// Aktivieren, damit du Premium siehst (nur für dich)
const CREATOR_MODE = true;

// Elemente
const dateEl = document.getElementById("date");
const titleEl = document.getElementById("title");
const textEl = document.getElementById("text");
const verseEl = document.getElementById("verse");
const blessingEl = document.getElementById("blessing");
const premiumBlock = document.getElementById("premiumBlock");

// Heutiges Datum anzeigen
const today = new Date();
dateEl.textContent = today.toLocaleDateString("de-DE", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric"
});

// Status
let isPremium =
  CREATOR_MODE || localStorage.getItem("premium") === "true";

// Wenn Parameter ?premium=true vorhanden → dauerhaft freischalten
const params = new URLSearchParams(window.location.search);
if (params.get("premium") === "true") {
  localStorage.setItem("premium", "true");
  isPremium = true;
  window.history.replaceState({}, document.title, window.location.pathname);
}

// Inhalte laden
let entries = [];
fetch("./content.json", { cache: "no-store" })
  .then(res => res.json())
  .then(data => {
    entries = data;
    showToday();
  })
  .catch(err => console.error("Fehler beim Laden:", err));

function showToday() {
  if (!entries.length) return;

  const index = Math.floor(today.getTime() / 86400000) % entries.length;
  const entry = entries[index];
  showEntry(entry);
}

function showEntry(entry) {
  titleEl.textContent = entry.title || "";
  textEl.textContent = entry.text || "";

  if (isPremium) {
    if (verseEl) verseEl.textContent = entry.verse || "";
    if (blessingEl) blessingEl.textContent = entry.blessing || "";
    premiumBlock.querySelector(".blurred").style.filter = "none";
    premiumBlock.querySelector(".premium-box").style.display = "none";
  } else {
    if (verseEl) verseEl.textContent = "Ein Gedanke, der tiefer geht…";
    if (blessingEl) blessingEl.textContent = "Ein Segen, der bleibt…";
    premiumBlock.querySelector(".blurred").style.filter = "blur(6px)";
    premiumBlock.querySelector(".premium-box").style.display = "block";
  }
}
