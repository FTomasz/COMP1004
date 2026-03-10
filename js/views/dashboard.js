export function renderDashboard(container) {
  container.innerHTML = /*html*/ `
    <section class="container py-4">
      <div class="row justify-content-center mb-4">
        <div class="col-12 col-lg-10">
          <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
            <h2 class="mb-0">Dashboard</h2>

            <div class="d-flex gap-2">
              <button id="dashboard-btn-create" class="btn btn-dashboard">
                Create Itinerary
              </button>
              <button id="dashboard-btn-publish" class="btn btn-dashboard btn-publish">
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
  if (itineraries.length === 0) {
    itineraryList.innerHTML = /*html*/ `
      <div class="card">
        <div class="card-body">
          <div class="text-muted">
            No itineraries yet
          </div>
        </div>
      </div>
    `;
    return;
  }

  //for each itinerary display a card
  itineraryList.innerHTML = itineraries
  .sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0))
  .map((itinerary) => displayItineraryCard(itinerary))
  .join("");


  //map edit button to each itinerary, set the active itinerary id
  //add listener to each button

  itineraryList.querySelectorAll("[data-edit-id]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-edit-id");
      sessionStorage.setItem("active-itinerary-id", id);
      window.setView("editItinerary");
    });
  });

  itineraryList.querySelectorAll("[data-delete-id]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-delete-id");
      localStorage.removeItem(`itinerary_draft_${id}`);
      renderDashboard(container);
    });
  });

  function displayItineraryCard(itinerary) {
    const itineraryParts = [];

    if (itinerary.country) itineraryParts.push(escapeHtml(itinerary.country));
    if (itinerary.season) itineraryParts.push(escapeHtml(itinerary.season));
    if (itinerary.month) itineraryParts.push(escapeHtml(itinerary.month));
    if (itinerary.duration) itineraryParts.push(`${escapeHtml(itinerary.duration)} days`);

    const data = itineraryParts.join(" · ");
    const daysCount = (itinerary.days || []).length;

    return /*html*/ `
      <div class="card">
        <div class="card-body d-flex justify-content-between align-items-start gap-3">
          <div>
            <h5 class="mb-1">${escapeHtml(itinerary.title || "Untitled itinerary")}</h5>
            <div class="text-muted small">
              ${data ? data : "No details"} · ${daysCount} day(s)
            </div>
            ${itinerary.description ? `<div class="mt-2">${escapeHtml(itinerary.description)}</div>` : ""}
          </div>
          <div class="d-flex gap-2">
          <button class="btn btn-outline-secondary btn-sm edit-button" data-edit-id="${itinerary.id}" type="button">
            Edit
          </button>
          <button class="btn btn-outline-secondary btn-sm delete-button" data-delete-id="${itinerary.id}" type="button">
            Delete
          </button>
          </div>
        </div>
      </div>
    `;
  }

  //function to get all the itineraries from storage
  function getAllItineraries() {
    //array for list of itineraries
    const out = [];
    //loop through every item in local storage
    for (let i = 0; i < localStorage.length; i++){
      const itineraryKey = localStorage.key(i);
      //if itinerary key then proceed else loop
      if(!itineraryKey || !itineraryKey.startsWith("itinerary_draft_")) continue;

      try {
        //pull data from localstorage and push it to the out array
        const raw = localStorage.getItem(itineraryKey);
        const parsed = JSON.parse(raw);

        if (parsed && parsed.id) out.push(parsed);
      } catch (e) {}
    }
    return out;
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
