export function renderEditItinerary(container) {
  container.innerHTML = /*html*/ `
  
    <section class="container py-4">
      <div class="row justify-content-center">
        <div class="col-lg-10">
          <h2 class="mb-4">Edit Itinerary</h2>
          <div id="itinerary-shell"></div>

          <button id="open-itinerary-modal" class="btn btn-primary mt-3">Create / Edit Itinerary</button>
        </div>
      </div>
    </section>

    <div class="modal fade" id="itineraryModal" tabindex="-1">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Itinerary details</h5>
            <button class="btn-close" data-bs-dismiss="modal"></button>
          </div>

          <div class="modal-body">
            <div class="row g-3">
              <div class="col-md-6">
                <label class="form-label">Itinerary title</label>
                <input id="itinerary-title" class="form-control">
              </div>

              <div class="col-md-6">
                <label class="form-label">Country</label>
                <input id="itinerary-country" class="form-control">
              </div>

              <div class="col-md-6">
                <label class="form-label">Season</label>
                <select id="itinerary-season" class="form-select">
                  <option value="" selected>Select</option>
                  <option value="Spring">Spring</option>
                  <option value="Summer">Summer</option>
                  <option value="Autumn">Autumn</option>
                  <option value="Winter">Winter</option>
                </select>
              </div>

              <div class="col-md-6">
                <label class="form-label">Duration (days)</label>
                <input id="itinerary-duration" type="number" min="1" class="form-control">
              </div>

              <div class="col-12">
                <label class="form-label">Description</label>
                <textarea id="itinerary-description" class="form-control" rows="3"></textarea>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
            <button id="save-itinerary-btn" class="btn btn-primary">Save</button>
          </div>
        </div>
      </div>
    </div>
  `;

  const itineraryShell = document.getElementById("itinerary-shell");
  const itineraryModal = new bootstrap.Modal(document.getElementById("itineraryModal"));

  let itinerary = null;

  document.getElementById("open-itinerary-modal").onclick = () => {
    itineraryModal.show();
  };

  document.getElementById("save-itinerary-btn").onclick = () => {
    itinerary = {
      id: `itinerary_${Date.now()}`,
      title: get("itinerary-title").trim() || "Untitled itinerary",
      country: get("itinerary-country").trim(),
      season: get("itinerary-season").trim(),
      duration: get("itinerary-duration").trim(),
      description: get("itinerary-description").trim(),
      days: [],
    };

    itineraryShell.innerHTML = /*html*/ `
      <div class="card">
        <div class="card-body">
          <h5 class="mb-1">${escapeHtml(itinerary.title)}</h5>
          <div class="text-muted small">${escapeHtml(itinerary.country)} ${escapeHtml(itinerary.season)}</div>
          ${itinerary.description ? `<div class="mt-2">${escapeHtml(itinerary.description)}</div>` : ""}
        </div>
      </div>
    `;

    itineraryModal.hide();
  };

  function get(id) {
    const el = document.getElementById(id);
    return el ? el.value || "" : "";
  }

  function escapeHtml(str) {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }
}
