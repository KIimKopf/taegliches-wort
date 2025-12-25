fetch("content.json")
  .then(r => r.json())
  .then(data => {
    const i = Math.floor(Date.now() / 86400000) % data.length;
    const e = data[i];

    document.getElementById("title").textContent = e.title;
    document.getElementById("text").textContent = e.text;
    document.getElementById("verse").textContent = e.verse;
    document.getElementById("blessing").textContent = e.blessing;
    document.getElementById("date").textContent =
      new Date().toLocaleDateString("de-DE", {
        weekday: "long", day: "numeric", month: "long", year: "numeric"
      });
  });
