import { login } from "../auth.js";

export function renderLogin(container) {
  container.innerHTML = /*html*/ `
    <section class="row justify-content-center">
      <div class="col-md-6 col-lg-4">
        <h2 class="mb-4 text-center">Login</h2>

        <form id="login-form">
          <div class="mb-3">
            <label class="form-label">Username</label>
            <input id="username" type="text" class="form-control" required>
          </div>

          <div class="mb-3">
            <label class="form-label">Password</label>
            <input id="password" type="password" class="form-control" required>
          </div>

          <button type="submit" class="btn btn-secondary w-100 mt-3">Login</button>
        </form>
      </div>
    </section>
  `;

  const form = document.getElementById("login-form")
  const usernameEl = document.getElementById("username");
  const passwordEl = document.getElementById("password");


  //set listener for the button
  form.addEventListener("submit", (e) => {
    // stop the browser refreshing
    e.preventDefault();
    const username = usernameEl.value.trim();
    const password = passwordEl.value;
    //if no username or password then break
    if (!username || !password) return;

    //check login details
    try {
      const res = login({username, password});

      if (res?.token) localStorage.setItem("auth_token", res.token);
      if (res?.user) localStorage.setItem("auth_user", JSON.stringify(res.user));


      //ensure that the function exists in the scope before calling it
      if (typeof window.setView === "function") window.setView("dashboard");
    } catch (err) {
      console.error("Login failed:", err);
    }

    
  });
}
