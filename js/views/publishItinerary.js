export function renderPublishItinerary(container) {
  const id = sessionStorage.getItem("active-itinerary-id");
  const itinerary = JSON.parse(localStorage.getItem(`itinerary_draft_${id}`));

  container.innerHTML = /*html*/ `
    <section class="container py-4">
      <div class="row justify-content-center mb-4">
        <div class="col-12 col-lg-10">
          <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
            <h2 class="mb-0">Publish Itinerary</h2>

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
              <h5 class="mb-3">${escapeHtml(itinerary.title)}</h5>
              <div id="itinerary-preview" class="d-flex flex-column gap-2"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

  const preview = document.getElementById("itinerary-preview");

  if (!itinerary){
    preview.innerHTML =  `<div class="card"><div class="card-body text-muted"> Error: No itinerary found.</div></div>`
    return;
  }

  preview.innerHTML = /*html*/ `
    <div class="card">
      <div class="card-body d-flex flex-column gap-4">

        <!-- main holiday overview -->
        <div class="d-flex gap-4">
          <div class = "d-flex flex-column gap-1">
            Country: ${escapeHtml(itinerary.country)}<br>
            Season: ${escapeHtml(itinerary.season)}<br>
            Duration: ${escapeHtml(itinerary.duration)} days!
          </div>
          <div class="border-start ps-4">
            <p class="mb-0">${escapeHtml(itinerary.description)}</p>
          </div>
        </div>
        
        <!-- days and events -->
        <hr class="m-0">

        ${displayDays(itinerary.days || [])}

      </div>
    </div>
  `;

  document.getElementById("pdf-publish-btn").addEventListener("click", () => {
    window.print();
  });

}


function displayDays(days) {
  if (!days.length) {
    return `<p class="text-muted fst-italic mb-0">No days planned yet.</p>`;
  }

  return `<div class="d-flex flex-column gap-4">${days.map((day, index) => displayDayCard(day, index)).join("")}</div>`;
}

function displayDayCard(day, index) {
  const title = day.title ? escapeHtml(day.title) : `Day ${index + 1}`;
  const notes = day.notes ? escapeHtml(day.notes) : "";

  return /*html*/ `
    <div>
      <h5 class="mb-1">${title}</h5>
      <div class="text-muted mb-3">${notes}</div>

      ${displayEvents(day.events || [])}
    </div>
  `;
}

function displayEvents(events) {
  if (!events.length) {
    return `<div class="text-muted small fst-italic">No events for this day.</div>`;
  }

  return `<div class="list-group">${events.map(displayEventItem).join("")}</div>`;
}

function displayEventItem(event) {
  const name = escapeHtml(event.name || "Untitled event");
  const location = event.location ? escapeHtml(event.location) : "";
  const rating = (event.rating   !== "" && event.rating != null) ? escapeHtml(event.rating) : "";
  const duration = (event.duration !== "" && event.duration != null) ? escapeHtml(event.duration) : "";
  const cost = (event.cost !== "" && event.cost != null) ? escapeHtml(event.cost) : "";
  const description = event.description ? escapeHtml(event.description) : "";

  const meta = [];
  if (location) meta.push(`Location: ${location}`);
  if (duration !== "") meta.push(`Time spent: ${duration} mins`);
  if (cost !== "") meta.push(`Money spent: £${cost}`);
  if (rating !== "") meta.push(`Rating: ${rating}/10`);

  return /*html*/ `
    <div class="list-group-item">
      <div class="fw-semibold">${name}</div>
      ${meta.length ? `<div class="text-muted small">${meta.join(" · ")}</div>` : ""}
      ${description ? `<div class="mt-2">${description}</div>` : ""}
    </div>
  `;
}
//reuse code from edit itinerary removing all the editing buttons etc.

//show days and events, add all text to one card so its easier to export afterwards


function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}