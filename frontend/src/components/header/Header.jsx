import React from 'react'
import "./header.css";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function Header() {
  return (
    <div className='header'>
      <h3 className="animate-charcter">MOMENTS</h3>
      <Carousel
        showArrows={true}
        showStatus={false}
        showIndicators={true}
        infiniteLoop={true}
        showThumbs={false}
        autoPlay={true}
        >
        <div className='carousel-item'>
          <img alt="Slide 1" src="https://media.tacdn.com/media/attractions-splice-spp-674x446/06/71/ae/2c.jpg" />
          <div className="carousel-caption">
            <h1>Visit To Akshardham!!</h1>
            <span className="date">---rishabh, 25 April 2022</span>
            <p className='desc'>My visit to this glorious Akshardham Mandir was truly an amazing experience. From the temple complex to the thrilling boat ride to the marvelous water show- everything was perfect. Akshardham Mandir is a prime example of how talented the craftsmen of our country is. The design and craftwork are so beautifully and delicately made, that there is no doubt that all of those men and women did it in the name of God. </p>
          </div>
        </div>
        <div className='carousel-item'>
          <img alt="Slide 2" src="https://cdn.pixabay.com/photo/2021/09/25/17/43/iphone-13-6655518_1280.jpg" />
          <div className="carousel-caption">
            <h1>Finally Bought It!!</h1>
            <span className="date">--rishabh, 04 May 2022</span>
            <p className='desc'>Buying a phone from my earning was a dream for me. After doing internship in a well known Product Based Company, I finally accomplished my dream of purchasing a phone and it was not just an ordinary smartphone, I bought Iphone 13 Pro Max and so happy rn.... </p>
          </div>
        </div>
        <div className='carousel-item'>
          <img alt="Slide 3" src="https://cdn.pixabay.com/photo/2016/09/14/19/49/sunset-1670219_1280.jpg" />
          <div className="carousel-caption">
            <h1>A Beautiful Sunset</h1>
            <span className="date">--mayank, 04 May 2022</span>
            <p className='desc'>Finally it rained in Delhi and it seems like the heat waves are disappeared. This evening, I was going through Rashtrapati Bhawan and the sky was looking amazing so I captured this moment. Hope, everyone find this one appealing....</p>
          </div>
        </div>
      </Carousel>
    </div>

  )
}



export default Header