export function renderDashboard(container) {
  container.innerHTML = `
    <section class="container py-4">
      <div class="row justify-content-center mb-4">
        <div class="col-12 col-lg-8">
          <h2 class="text-center mb-0">Dashboard</h2>
        </div>
      </div>

      <div class="row g-3 justify-content-center">

        <div class="col-12 col-md-6 col-lg-3">
          <button id="dashboard-btn-create" class="btn btn-create btn-lg w-100 py-4">
            Create Itinerary
          </button>
        </div>

        <div class="col-12 col-md-6 col-lg-3">
          <button id="dashboard-btn-edit" class="btn btn-edit btn-lg w-100 py-4">
            Edit Itinerary
          </button>
        </div>

        <div class="col-12 col-md-6 col-lg-3">
          <button id="dashboard-btn-publish" class="btn btn-publish btn-lg w-100 py-4">
            Publish Itinerary
          </button>
        </div>

        <div class="col-12 col-md-6 col-lg-3">
          <button id="dashboard-btn-delete" class="btn btn-delete btn-lg w-100 py-4">
            Delete Itinerary
          </button>
        </div>
      </div>
    </section>
  `;
}
