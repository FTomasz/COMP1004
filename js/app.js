import { isAuthenticated, logout } from "./auth.js";

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

function updateNavbar() {
  //establish if the user is logged in
  const loggedIn = isAuthenticated();

  //get references for parts of the navbar to change
  const navLogin =document.getElementById("nav-login");
  const navRegister = document.getElementById("nav-register");
  const navLogout = document.getElementById("nav-logout");
  const navDashboard = document.getElementById("nav-dashboard");

  //ensure they exist
  if (!navLogin || !navRegister || !navLogout) return;

  //change style to make them show/hide if based on whether the user is logged in or not
  navLogin.style.display = loggedIn ? "none" : "inline-block";
  navRegister.style.display = loggedIn ? "none" : "inline-block";
  navLogout.style.display = loggedIn ? "inline-block" : "none";
  navDashboard.style.display = loggedIn ? "inline-block" : "none";
}



window.addEventListener("DOMContentLoaded", () => {
  app = document.getElementById("app");
  //default
  setView("home");
  updateNavbar();

  //expose so can use globally (need for register to go to dashboard)
  window.setView = setView;
  window.updateNavbar = updateNavbar;


  //when clicked go to view
  document.getElementById("nav-home").addEventListener("click", () => setView("home"));
  document.getElementById("nav-login").addEventListener("click", () => setView("login"));
  document.getElementById("nav-register").addEventListener("click", () => setView("register"));
  document.getElementById("nav-dashboard").addEventListener("click", () => setView("dashboard"));

  
  document.getElementById("nav-logout").addEventListener("click", () => {
    //logout, refresh navbar and send user back to the homepage
    logout();
    updateNavbar();
    setView("home");
  });


});
