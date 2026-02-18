export function renderEditItinerary(container) {
  container.innerHTML = /*html*/ `
  
  <!-- Itinerary Editor -->
    <section class="container py-4">
      <div class="row justify-content-center">
        <div class="col-lg-10">
          <h2 class="mb-4">Edit Itinerary</h2>
          <div id="itinerary-shell"></div>
        </div>
      </div>
    </section>

    <!-- Toast to say when item has saved -->
    <div class="position-fixed top-0 end-0 p-3" style="z-index: 1080;">
      <div id="saveToast" class="toast align-items-center" role="status">
        <div class="d-flex">
          <div class="toast-body">Saved successfully!</div>
          <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
      </div>
    </div>

    <!-- Add Itinerary Modal -->
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

          <!-- Footer with function buttons -->
          <div class="modal-footer">
            <button class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
            <button id="save-itinerary-btn" class="btn btn-primary">Save</button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="dayModal" tabindex="-1">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Add a day to the holiday!</h5>
            <button class="btn-close" data-bs-dismiss="modal"></button>
          </div>

          <div class="modal-body">
            <div class="mb-3">
              <label class="form-label">Day title</label>
              <input id="day-title" class="form-control" placeholder="Day 1 – Arrival">
            </div>

            <div class="mb-3">
              <label class="form-label">Notes</label>
              <textarea id="day-notes" class="form-control" rows="3"></textarea>
            </div>
          </div>

          <div class="modal-footer">
            <button class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
            <button id="save-day-btn" class="btn btn-primary">Add day</button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="eventModal" tabindex="-1">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Add event</h5>
            <button class="btn-close" data-bs-dismiss="modal"></button>
          </div>

          <div class="modal-body">
            <div class="row g-3">
              <div class="col-md-8">
                <label class="form-label">Event name</label>
                <input id="event-name" class="form-control">
              </div>

              <div class="col-md-4">
                <label class="form-label">Rating (0–10)</label>
                <input id="event-rating" type="number" min="0" max="10" class="form-control">
              </div>

              <div class="col-md-6">
                <label class="form-label">Location</label>
                <input id="event-location" class="form-control">
              </div>

              <div class="col-md-3">
                <label class="form-label">Time spent (mins)</label>
                <input id="event-duration" type="number" min="0" class="form-control">
              </div>

              <div class="col-md-3">
                <label class="form-label">Money spent</label>
                <input id="event-cost" type="number" min="0" step="0.01" class="form-control">
              </div>

              <div class="col-12">
                <label class="form-label">Description</label>
                <textarea id="event-description" class="form-control" rows="3"></textarea>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
            <button id="save-event-btn" class="btn btn-primary">Add event</button>
          </div>
        </div>
      </div>
    </div>


  `;

  const itineraryShell = document.getElementById("itinerary-shell");

  const itineraryModal = new bootstrap.Modal(document.getElementById("itineraryModal"));
  const dayModal = new bootstrap.Modal(document.getElementById("dayModal"));
  const eventModal = new bootstrap.Modal(document.getElementById("eventModal"));

  const toastPopup = document.getElementById("saveToast");
  //create Toast and autohide it
  const saveToast = bootstrap.Toast.getOrCreateInstance(toastPopup, { autohide: true, delay: 1200})

  // Initialise itinerary
  let itinerary = null;

  //set the mode to create by default, check session for active Itinerary
  let itineraryMode = "create";

  const activeItineraryId = sessionStorage.getItem("active-itinerary-id");

  //try to get the itinerary from local storage
  itinerary = activeItineraryId ? loadItinerary(activeItineraryId) : null;

  if (itinerary) {
    //if itinerary is loaded, then display the itinerary with editing options
    itineraryMode = "edit";
    displayItineraryCard();
  } else {
    //if no itinerary already, then prompt user with itinerary modal
    displayEmpty();
    itineraryModal.show();
  }



  // build itinerary
  document.getElementById("save-itinerary-btn").onclick = () => {

    const data = {
      title: get("itinerary-title").trim() || "Untitled itinerary",
      country: get("itinerary-country").trim(),
      season: get("itinerary-season").trim(),
      duration: get("itinerary-duration").trim(),
      description: get("itinerary-description").trim(),
    };

    //if there isn't an itinerary then create one and change mode to edit
    if (!itinerary || itineraryMode === "create"){
      itinerary = {id: `itinerary_${Date.now()}`, ...data, days: []};
      itineraryMode = "edit";
    } else {
      //if itinerary already exists then update it
      Object.assign(itinerary, data);
    }

    //save, show, hide modal
    saveItinerary();
    displayItineraryCard();
    itineraryModal.hide();
  };


//btn eventlistener for the closest button to where was clicked
itineraryShell.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;

  //button to add a new day to itinerary
  if (btn.id === "add-day-btn") {
    clearDayForm();
    dayModal.show();
    return;
  }
});


//display default message when no itinerary is present
  function displayEmpty() {
    itineraryShell.innerHTML = /*html*/ `
    <div class="card">
      <div class="card-body">
        <p class="mb-3">Create an itinerary to start adding days.</p>
        <button id="create-itinerary-btn" class="btn btn-create">Create itinerary</button>
      </div>
    </div>
    `;

    document.getElementById("create-itinerary-btn").onclick = () => {
      clearItineraryForm();
      itineraryModal.show();
    }
  }


//display itinerary in a neat and tidy card
  function displayItineraryCard(){
    itineraryShell.innerHTML = /*html*/ `
      <div class="card">
        <div class="card-body d-flex justify-content-between align-items-start gap-3">
          <div>
            <h5 class="mb-1">${escapeHtml(itinerary.title)}</h5>
            <div class="text-muted small">
              ${itinerary.country ? escapeHtml(itinerary.country) : "No country"}
              ${itinerary.season ? " · " + escapeHtml(itinerary.season) : ""}
              ${itinerary.duration ? " · " + escapeHtml(itinerary.duration) + " days" : ""}
            </div>
            ${itinerary.description ? `<div class="mt-2">${escapeHtml(itinerary.description)}</div>` : ""}
          </div>

          <!-- edit button -->
          <button id="edit-itinerary-btn" class="btn btn-outline-secondary btn-sm" type="button">Edit</button>
        </div>
      </div>

      <div class="d-flex justify-content-between align-items-centre mt-4">
        <h4 class="mb-0">Days</h4>
        <button id="add-day-btn" class="btn btn-primary btn-sm" type="button">Add day</button>
      </div>
    `;

    document.getElementById("edit-itinerary-btn").onclick = () => {
      fillItineraryForm(itinerary);
      itineraryModal.show();
    }

  }

  function saveItinerary() {
    //add last updated 
    itinerary.updatedAt = Date.now();
    // add the itinerary to storage and set active itinerary id to current id
    localStorage.setItem(`itinerary_draft_${itinerary.id}`, JSON.stringify(itinerary))
    sessionStorage.setItem("active-itinerary-id", itinerary.id);

    saveToast.show();
  }

  function loadItinerary(id) {
    //retrieve the itinerary
    const rawItinerary = localStorage.getItem(`itinerary_draft_${id}`);
    //check if there is an itinerary
    if (!rawItinerary) return null;

    //parse the itinerary from storage
    try {
      return JSON.parse(rawItinerary);
    } catch (e) {
      return null;
    }
  }


  // pull string value from elements
  function get(id) {
    const el = document.getElementById(id);
    return el ? el.value || "" : "";
  }

  //fill the itinerary form when editing 
  function fillItineraryForm(itinerary) {
    document.getElementById("itinerary-title").value = itinerary.title || "";
    document.getElementById("itinerary-country").value = itinerary.country || "";
    document.getElementById("itinerary-season").value = itinerary.season || "";
    document.getElementById("itinerary-duration").value = itinerary.duration || "";
    document.getElementById("itinerary-description").value = itinerary.description || "";
  }

  //clear the form when user creates a new itinerary, removing old data
  function clearItineraryForm() {
    document.getElementById("itinerary-title").value ="";
    document.getElementById("itinerary-country").value = "";
    document.getElementById("itinerary-season").value =  "";
    document.getElementById("itinerary-duration").value =  "";
    document.getElementById("itinerary-description").value =  "";
  }

  function clearDayForm() {
    document.getElementById("day-title").value = "";
    document.getElementById("day-notes").value = "";
  }

  function clearEventForm() {
    document.getElementById("event-name").value = "";
    document.getElementById("event-location").value = "";
    document.getElementById("event-duration").value = "";
    document.getElementById("event-cost").value = "";
    document.getElementById("event-rating").value = "";
    document.getElementById("event-description").value = "";
  }


  // stop malicious html injection!
  function escapeHtml(str) {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }
}
