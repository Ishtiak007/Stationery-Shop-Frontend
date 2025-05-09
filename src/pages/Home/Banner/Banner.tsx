"use client";

import { Carousel } from "antd";
import banner1 from "../../../assets/images/banner1.jpg";
import banner2 from "../../../assets/images/banner2.jpg";
import banner3 from "../../../assets/images/banner3.jpg";
import banner4 from "../../../assets/images/banner4.jpg";
import banner5 from "../../../assets/images/banner5.jpg";
import { Link } from "react-router-dom";

const Banner = () => {
  const images = [banner1, banner2, banner3, banner4, banner5];

  return (
    <div className="relative">
      <Carousel
        autoplay
        className="mySwiper h-full overflow-hidden font-orbitron"
      >
        {images.map((image, index) => (
          <div key={index}>
            <div
              className="w-full h-[400px] md:h-[500px] lg:h-[700px] bg-cover bg-center bg-transparent"
              style={{
                backgroundImage: `url(${image})`,
                filter: "brightness(1.3)",
              }}
            />
          </div>
        ))}
      </Carousel>

      {/* Banner Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black font-orbitron bg-opacity-60 font-bold">
        {/* Text */}
        <div className="relative z-0 text-center max-w-4xl px-4 text-[10px] md:text-base lg:text-4xl font-orbitron font-bold">
          <h2 className="pb-2">
            <span className="text-[#f5e7c8] pr-2">
              One-Stop Destination for All Your Stationery Needs!
            </span>
          </h2>
          <p className="text-[12px] md:text-[15px] mb-6">
            Find top-quality notebooks, pens, and office supplies at great
            prices. Perfect for school, work, and creativity – shop now!
          </p>
        </div>

        {/* Search Bar */}
        <div className="flex z-20 items-center justify-center max-w-lg md:w-full text-[10px] md:text-sm lg:text-base">
          <Link to="/register">
            <button type="submit" className="banner-button">
              Join Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
