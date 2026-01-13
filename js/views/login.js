export function renderLogin(container) {
  container.innerHTML = `
    <section class="row justify-content-center">
      <div class="col-md-6 col-lg-4">
        <h2 class="mb-4 text-center">Login</h2>
        <form id="login-form">
          <div class="mb-3">
            <label class="form-label">Username</label>
            <input type="text" class="form-control" required>
          </div>

          <div class="mb-3">
            <label class="form-label">Password</label>
            <input type="password" class="form-control" required>
          </div>

          <button class="btn">
            Login
          </button>
        </form>
      </div>
    </section>
  `;
}
