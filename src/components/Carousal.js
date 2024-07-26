import React from 'react'

export default function Carousal() {
  return (
    <div>
      <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit:"contain !important"}} >
  <div className="carousel-inner" id='carousel'>
    <div className="carousel-caption" style={{zIndex: "10"}}>
    <form className="d-flex">
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
      <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button>
    </form>
    </div>
    <div className="carousel-item active">
      <img src="https://static.vecteezy.com/system/resources/previews/025/477/796/non_2x/traditional-indian-dishes-above-view-generative-ai-photo.jpg" className="d-block w-100" style={{filter: "brightness(30%)"}} alt="..." />
    </div>
    <div className="carousel-item">
      <img src="https://rare-gallery.com/uploads/posts/841861-Fish-Food-Vegetables-Tomatoes-Salmon-Plate.jpg" className="d-block w-100" style={{filter: "brightness(30%)"}} alt="..." />
    </div>
    <div className="carousel-item">
      <img src="https://tb-static.uber.com/prod/image-proc/processed_images/2604792c7778f76d9bcc414eba0f67f8/16bb0a3ab8ea98cfe8906135767f7bf4.jpeg" className="d-block w-100" style={{filter: "brightness(30%)"}} alt="..." />
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
</div>
    </div>
  )
}
