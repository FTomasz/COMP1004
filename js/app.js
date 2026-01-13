import { renderHome } from "./views/home.js";
import { renderLogin } from "./views/login.js";
// import { renderDashboard } from "./views/dashboard.js";
// import { renderRegister } from "./views/register.js";

let app;

function setView(viewName) {
  switch (viewName) {
    case "home":
      renderHome(app);
      break;

    case "login":
      renderLogin(app);
      break;

    case "register":
      renderRegister(app);
      break;

    case "dashboard":
      renderDashboard(app);
      break;

    default:
      renderHome(app);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  app = document.getElementById("app");

  setView("home");

  document.getElementById("nav-home")
    .addEventListener("click", () => setView("home"));

  document.getElementById("nav-login")
    .addEventListener("click", () => setView("login"));

  document.getElementById("nav-register")
    .addEventListener("click", () => setView("register"));

  document.getElementById("nav-dashboard")
    .addEventListener("click", () => setView("dashboard"));
});
