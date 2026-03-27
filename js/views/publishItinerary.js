export function renderPublishItinerary(container) {
  container.innerHTML = /*html*/ `
    <section class="container py-4">
      <div class="row justify-content-center mb-4">
        <div class="col-12 col-lg-10">
          <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
            <h2 class="mb-0">Dashboard</h2>

            <div class="d-flex gap-2">
              <button id="facebook-publish-btn" class="btn publish-button">
                Facebook
              </button>
              <button id="x-publish-btn" class="btn publish-button">
                X
              </button>
              <button id="pdf-publish-btn" class="btn publish-button">
                Print
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="row justify-content-center">
        <div class="col-12 col-lg-10">
          <div class="card">
            <div class="card-body">
              <h5 class="mb-3">Preview itinerary</h5>
              <div id="itinerary-preview" class="d-flex flex-column gap-2"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}



function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}