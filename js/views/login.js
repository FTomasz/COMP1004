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

  document.getElementById("login-form").addEventListener("submit", (e) => {
    // stop the browser refreshing
    e.preventDefault();
  });
}
