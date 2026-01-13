import { renderHome } from "./views/home.js";
import { renderLogin } from "./views/login.js";

const routes = {
  "/": renderHome,
  "/login": renderLogin
};

export function router() {
  const app = document.getElementById("app");
  const path = window.location.pathname;

  const view = routes[path] || renderHome;
  view(app);
}
