import { router } from "./router.js";

// Intercept SPA links
document.addEventListener("click", (e) => {
  const link = e.target.closest("a[data-link]");
  if (!link) return;

  e.preventDefault();
  history.pushState(null, "", link.getAttribute("href"));
  router();
});

// Handle back / forward buttons
window.addEventListener("popstate", router);

// Initial render
router();
