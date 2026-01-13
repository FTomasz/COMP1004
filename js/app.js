import { renderHome } from "./views/home.js";
import { renderLogin } from "./views/login.js";
import { renderDashboard } from "./views/dashboard.js";
import { renderRegister } from "./views/register.js";

let app;

//change page being viewed function
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

window.addEventListener("DOMContentLoaded", () => {
  app = document.getElementById("app");
  //default
  setView("home");

  //when clicked go to view
  document.getElementById("nav-home").addEventListener("click", () => setView("home"));
  document.getElementById("nav-login").addEventListener("click", () => setView("login"));
  document.getElementById("nav-register").addEventListener("click", () => setView("register"));
  document.getElementById("nav-dashboard").addEventListener("click", () => setView("dashboard"));
});
