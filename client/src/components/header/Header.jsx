import React from 'react'
import "./header.css";

function Header() {
  return (
    <div>
      <h3 class="animate-charcter"> MOMENTS</h3>
      <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval="2000">
            <img src="https://media.tacdn.com/media/attractions-splice-spp-674x446/06/71/ae/2c.jpg" className="d-block " alt="..." />
            <div className="carousel-caption d-none d-md-block text-left">
              <h5>Visit To Akshardham!!</h5>
              <span className="date">rishabh, 25 April 2022</span>
              <p className='desc'>My visit to this glorious Akshardham Mandir was truly an amazing experience. From the temple complex to the thrilling boat ride to the marvelous water show- everything was perfect. Akshardham Mandir is a prime example of how talented the craftsmen of our country is. The design and craftwork are so beautifully and delicately made, that there is no doubt that all of those men and women did it in the name of God. </p>
            </div>
          </div>
          <div className="carousel-item">
            <img src="https://images.hindustantimes.com/tech/img/2021/09/24/original/iPhone_13_Pro_Max_(4)_1632469213724.jpg" className="d-block" alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <h5>Finally Bought It!!</h5>
              <span className="date">rishabh, 04 May 2022</span>
              <p className='desc'>Buying a phone from my earning was a dream for me. After doing internship in a well known Product Based Company, I finally accomplished my dream of purchasing a phone and it was not just an ordinary smartphone, I bought Iphone 13 Pro Max and so happy rn.... </p>
            </div>
          </div>
          <div className="carousel-item">
            <img src="https://live.staticflickr.com/2625/3735169357_f4f95dfb44_b.jpg" className="d-block " alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <h5>A Beautiful Sunset</h5>
              <span className="date">mayank, 04 May 2022</span>
              <p className='desc'>Finally it rained in Delhi and it seems like the heat waves are disappeared. This evening, I was going through Rashtrapati Bhawan and the sky was looking amazing so I captured this moment. Hope, everyone find this one appealing....</p>
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  )
}

export default Header