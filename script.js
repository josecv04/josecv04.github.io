// Theme toggle + copy helpers
(function () {
  const root = document.documentElement;
  const btn = document.getElementById("themeBtn");
  const year = document.getElementById("year");

  if (year) year.textContent = String(new Date().getFullYear());

  const saved = localStorage.getItem("theme");
  if (saved === "light" || saved === "dark") root.dataset.theme = saved;

  function currentTheme() {
    return root.dataset.theme === "light" ? "light" : "dark";
  }

  function setTheme(next) {
    if (next === "light") root.dataset.theme = "light";
    else delete root.dataset.theme;
    localStorage.setItem("theme", next);
    if (btn) btn.querySelector(".btn-icon").textContent = next === "light" ? "☀" : "☾";
  }

  if (btn) btn.querySelector(".btn-icon").textContent = currentTheme() === "light" ? "☀" : "☾";

  if (btn) {
    btn.addEventListener("click", () => {
      const next = currentTheme() === "light" ? "dark" : "light";
      setTheme(next);
    });
  }

  document.querySelectorAll("[data-copy]").forEach((el) => {
    el.addEventListener("click", async () => {
      const value = el.getAttribute("data-copy") || "";
      try {
        await navigator.clipboard.writeText(value);
        const old = el.textContent;
        el.textContent = "Copied ✓";
        setTimeout(() => (el.textContent = old), 900);
      } catch (e) {
        window.prompt("Copy this:", value);
      }
    });
  });
})();
