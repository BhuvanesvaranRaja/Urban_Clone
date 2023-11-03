import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ImageCarsoule = ({ images }) => {
  return (
    <Carousel
      autoPlay
      showArrows={true}
      infiniteLoop={true}
      interval={"2000"}
      transitionTime="1000"
      showStatus={false}
      showIndicators={true}
      showThumbs={false}>
      {images.map((image, index) => (
        <div key={index}>
          <img alt="center_images" src={image.image} />
        </div>
      ))}
    </Carousel>
  );
};

export default ImageCarsoule;
