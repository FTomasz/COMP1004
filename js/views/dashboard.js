export function renderDashboard(container) {
  container.innerHTML = /*html*/ `
    <section class="container py-4">
      <div class="row justify-content-center mb-4">
        <div class="col-12 col-lg-10">
          <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
            <h2 class="mb-0">Dashboard</h2>

            <div class="d-flex gap-2">
              <button id="dashboard-btn-create" class="btn btn-primary">
                Create Itinerary
              </button>
              <button id="dashboard-btn-publish" class="btn btn-publish">
                Publish Itinerary
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="row justify-content-center">
        <div class="col-12 col-lg-10">
          <div class="card">
            <div class="card-body">
              <h5 class="mb-3">Your itineraries</h5>
              <div id="itinerary-list" class="d-flex flex-column gap-2"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

  document.getElementById("dashboard-btn-create").addEventListener("click", () => {
    window.setView("editItinerary");
  });

  document.getElementById("dashboard-btn-publish").addEventListener("click", () => {
    window.setView("publishItinerary");
  });

  const itineraryList = document.getElementById("itinerary-list");
  const itineraries = getAllItineraries();

  //display current itineraries

  //if no itineraries then display saying no itineraries

  //for each itinerary display a card

  //function to get all the itineraries from storage
  


  function escapeHtml(str) {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }
}
