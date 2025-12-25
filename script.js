const dateEl = document.getElementById("date");
const titleEl = document.getElementById("title");
const textEl = document.getElementById("text");
const verseEl = document.getElementById("verse");
const blessingEl = document.getElementById("blessing");

const today = new Date();

dateEl.textContent = today.toLocaleDateString("de-DE", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric"
});

let entries = [];

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

  if (verseEl && blessingEl) {
    verseEl.textContent = entry.verse;
    blessingEl.textContent = entry.blessing;
  }
}
