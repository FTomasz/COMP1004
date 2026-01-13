import { register } from "../auth.js";


export function renderRegister(rootEl) {
  rootEl.innerHTML = `
    <form id="register-form">
      <input id="reg-username" />
      <input id="reg-password" type="password" />
      <button type="submit">Register</button>
    </form>
  `;

  //get references
  const form = rootEl.querySelector("#register-form");
  const usernameEl = rootEl.querySelector("#reg-username");
  const passwordEl = rootEl.querySelector("#reg-password");

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
    } catch (err) {
      console.error("Register failed:", err);
    }
  });
}
