import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const loadFoodItems = async () => {
    try {
      let response = await fetch("http://localhost:5000/api/auth/foodData", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      let data = await response.json();
      setFoodItems(data[0] || []);
      setFoodCat(data[1] || []);
    } catch (error) {
      console.error("Failed to fetch food data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFoodItems();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
        <div className="carousel-inner" id='carousel'>
          <div className="carousel-caption" style={{ zIndex: "9" }}>
            <div className="d-flex justify-content-center">
              <input
                className="form-control me-2 w-75 bg-white text-dark"
                type="search"
                placeholder="Search in here..."
                aria-label="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="btn text-white bg-danger" onClick={() => setSearch('')}>X</button>
            </div>
          </div>
          <div className="carousel-item active">
            <img src="https://static.vecteezy.com/system/resources/previews/025/477/796/non_2x/traditional-indian-dishes-above-view-generative-ai-photo.jpg" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="Indian dishes" />
          </div>
          <div className="carousel-item">
            <img src="https://rare-gallery.com/uploads/posts/841861-Fish-Food-Vegetables-Tomatoes-Salmon-Plate.jpg" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="Fish and vegetables" />
          </div>
          <div className="carousel-item">
            <img src="https://tb-static.uber.com/prod/image-proc/processed_images/2604792c7778f76d9bcc414eba0f67f8/16bb0a3ab8ea98cfe8906135767f7bf4.jpeg" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="Food plate" />
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
      <div className='container'>
        {foodCat.length > 0 ? (
          foodCat.map((data) => (
            <div className='row mb-3' key={data._id}>
              <div className='fs-3 m-3'>
                {data.CategoryName}
              </div>
              <hr id="hr-success" style={{ height: "4px", backgroundImage: "-webkit-linear-gradient(left, rgb(0, 255, 137), rgb(0, 0, 0))" }} />
              {foodItems.length > 0 ? (
                foodItems.filter(
                  (items) => items.CategoryName === data.CategoryName && items.name.toLowerCase().includes(search.toLowerCase())
                ).map((filterItems) => (
                  <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                    <Card foodName={filterItems.name} item={filterItems} options={filterItems.options[0]} ImgSrc={filterItems.img} />
                  </div>
                ))
              ) : (
                <div>No Such Data</div>
              )}
            </div>
          ))
        ) : (
          <div>No Categories Found</div>
        )}
      </div>
      <Footer />
    </div>
  );
}
