import "./Locations.css";


function Carousel() {
  return (
    <>
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-ride="carousel"
      >
        <ol className="carousel-indicators">
          <li
            data-target="#carouselExampleIndicators"
            data-slide-to="0"
            className="active"
          ></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              className="d-block w-100"
              src="../Carousel/1.jpg"
              alt="First slide"
            />
            <a href="https://unsplash.com/@andrewcoop?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
              Andrew Coop
            </a>{" "}
            <a href="https://unsplash.com/collections/mYAr4QdJQsU/hospital?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
              Unsplash
            </a>
          </div>
          <div className="carousel-item">
            <img
              className="d-block w-100"
              src="./Carousel/2.jpg"
              alt="Second slide"
            />
            <a href="https://unsplash.com/@cdc?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
              CDC
            </a>{" "}
            <a href="https://unsplash.com/collections/32878401/arcastream?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
              Unsplash
            </a>
          </div>
          <div className="carousel-item">
            <img
              className="d-block w-100"
              src="./Carousel/3.jpg"
              alt="Third slide"
            />
            <a href="https://unsplash.com/@nci?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
              National Cancer Institute
            </a>{" "}
            <a href="https://unsplash.com/collections/mYAr4QdJQsU/hospital?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
              Unsplash
            </a>
          </div>
        </div>
        <a
          className="carousel-control-prev"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
    </>
  );
}

export default Carousel;
