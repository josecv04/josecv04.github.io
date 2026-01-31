// Theme toggle + small UX helpers
(function () {
  const root = document.documentElement;
  const btn = document.getElementById("themeBtn");
  const year = document.getElementById("year");

  // Year
  if (year) year.textContent = String(new Date().getFullYear());

  // Load theme
  const saved = localStorage.getItem("theme");
  if (saved === "light" || saved === "dark") {
    root.dataset.theme = saved;
  }

  function currentTheme() {
    return root.dataset.theme === "light" ? "light" : "dark";
  }

  function setTheme(next) {
    if (next === "light") root.dataset.theme = "light";
    else delete root.dataset.theme; // default dark
    localStorage.setItem("theme", next);
    if (btn) btn.querySelector(".btn-icon").textContent = next === "light" ? "☀" : "☾";
  }

  // Init icon
  if (btn) btn.querySelector(".btn-icon").textContent = currentTheme() === "light" ? "☀" : "☾";

  // Toggle
  if (btn) {
    btn.addEventListener("click", () => {
      const next = currentTheme() === "light" ? "dark" : "light";
      setTheme(next);
    });
  }

  // Copy buttons
  document.querySelectorAll("[data-copy]").forEach((el) => {
    el.addEventListener("click", async () => {
      const value = el.getAttribute("data-copy") || "";
      try {
        await navigator.clipboard.writeText(value);
        const old = el.textContent;
        el.textContent = "Copied ✓";
        setTimeout(() => (el.textContent = old), 900);
      } catch (e) {
        // fallback: prompt
        window.prompt("Copy this:", value);
      }
    });
  });
})();
