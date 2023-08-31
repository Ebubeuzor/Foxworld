import React from "react";

const SkeletonLoader = ({ count }) => {
  const skeletonLoaders = [];

  for (let i = 0; i < count; i++) {
    skeletonLoaders.push(
      <div key={i} className="product-card w-40 h-96 m-2 md:w-96 md:h-[500px]">
        <div className="product-image relative w-full h-[65%] pb-square bg-gray-300"></div>
        <div className="product-details text-center h-2/4 overflow-y-auto">
          <h2 className="product-title text-[12px] mb-1 font-bold bg-gray-300 h-4 w-3/4 mx-auto mt-4"></h2>
          <p className="product-color text-slate-400 font-light text-[11px] mb-1 bg-gray-300 h-3 w-2/4 mx-auto"></p>
          <p className="product-category text-slate-400 font-light text-[11px] uppercase bg-gray-300 h-3 w-3/4 mx-auto"></p>
        </div>
      </div>
    );
  }

  return <div className="flex flex-wrap justify-center">{skeletonLoaders}</div>;
};

export default SkeletonLoader;
