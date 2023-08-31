import React, { useState } from "react";

export default function ProductCard({
  image,
  alternateImage,
  title,
  color,
  category,
}) {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const renderImage = () => {
    if (hovered) {
      // Render the alternate image when hovered
      return (
        <img
          src={alternateImage}
          className="object-cover object-top md:w-[300px] md:h-[300px] md:object-cover w-full h-full mx-auto"
          alt={title}
        />
      );
    } else {
      // Render the default image
      return (
        <img src={image} className=" object-cover object-top md:w-[300px] md:h-[300px] md:object-cover w-full h-full mx-auto" alt={title} />
      );
    }
  };

  return (
    <div className="product-card w-40 h-96 m-2  md:w-96  md:h-[500px]">
      <div
        className="product-image relative w-full  h-[65%] pb-square"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="absolute top-0 left-0 right-0 bottom-0">
          {renderImage()}
        </div>
      </div>
      <div className="product-details text-center h-2/4 overflow-y-auto ">
        <h2 className="product-title text-[12px] mb-1 fontbold ">{title}</h2>
        <p className="product-color text-slate-400 fontThin text-[11px] mb-1">Color: {color}</p>
        <p className="product-category text-slate-400 fontThin text-[11px] uppercase">{category}</p>
      </div>
    </div>
  );
}
