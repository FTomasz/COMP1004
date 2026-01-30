import { register } from "../auth.js";


export function renderRegister(container) {
  container.innerHTML = /*html*/`
    <section class="row justify-content-center">
      <div class="col-md-6 col-lg-4">
        <h2 class="mb-4 text-center">Register</h2>
          <form id="register-form">
          <div class="mb-3">
            <label class="form-label">Username</label>
            <input id="reg-username" type="text" class="form-control" required/>
          </div>

          <div class="mb-3">
            <label class="form-label">Password</label>
            <input id="reg-password" type="password" class="form-control" required/>
          </div>
          <button type="submit" class="btn btn-secondary w-100 mt-3">Register</button>
          </form>
      </div>
    </section>
  `;

  //get references
  const form = container.querySelector("#register-form");
  const usernameEl = container.querySelector("#reg-username");
  const passwordEl = container.querySelector("#reg-password");

  //listen to the submit button on the form
  form.addEventListener("submit", (e) => {
    //stop refreshing
    e.preventDefault();

    //get values from the form
    const username = usernameEl.value.trim();
    const password = passwordEl.value;
    if (!username || !password) return; //if not there then break

    try {
      //register in local storage
      const res = register({ username, password });

      //if authentication token and data was returned then store it in local storage
      if (res?.token) localStorage.setItem("auth_token", res.token);
      if (res?.user) localStorage.setItem("auth_user", JSON.stringify(res.user));

      //send user to the dashboard after they have registered
      window.setView("dashboard");
    } catch (err) {
      console.error("Register failed:", err);
    }
  });
}
