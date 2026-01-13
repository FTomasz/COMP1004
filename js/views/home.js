export function renderHome(container) {
  container.innerHTML = `
    <section class="text-center">
      <h1>Holiday Itinerary Sharing</h1>
      <p>
        Create and share structured holiday plans.
      </p>

      <a href="/login" data-link class="btn">
        Login
      </a>
    </section>
  `;
}
