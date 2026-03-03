export function renderHome(container) {
  
  container.innerHTML = /*html*/ `
    <section class="home-section text-center py-4">
      <h1>Plan. Share. Explore.</h1>
      <p>
        Create and share structured holiday plans.
      </p>
      <div class="container mt-5">

    <!-- Image carousel to show holiday pictures -->
      <div id="myCarousel" class="carousel slide" data-bs-ride="carousel" data-interval="4000">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="images/hol1.webp" class="d-block w-100" alt="Image of the Eiffel tower">
          </div>
          <div class="carousel-item">
            <img src="images/hol2.jpg" class="d-block w-100" alt="Image of the great wall of China">
          </div>
          <div class="carousel-item">
            <img src="images/hol3.avif" class="d-block w-100" alt="Image of a sunny beach in Greece">
          </div>
        </div>

        <!-- Controls -->
        <a class="carousel-control-prev" href="#myCarousel" role="button" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </a>
        <a class="carousel-control-next" href="#myCarousel" role="button" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </a>
      </div>
    </div>

    </section>
  `;
}
