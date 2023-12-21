import React from "react";

const SkeletonProductDetails = () => {
  return (
    <div className="pt-36">
      <div className="product-details flex flex-wrap">
        <div className="w-full lg:w-2/4 h-full md:h-100vh relative justify-center slideshow">
          <div className="h-[50vh] md:h-[50vh] w-full bg-gray-300"></div>
        </div>
        <div className="w-full lg:w-2/4 details px-8">
          <div>
            <div className="product-info py-6 border-b-2">
              <div className="product-info-panel pb-10">
                <div className="h-6 w-3/4 bg-gray-300 mb-3"></div>
                <div className="h-4 w-1/2 bg-gray-300"></div>
              </div>
            </div>
            <div className="color-picker py-8 border-b-2">
              <div className="color-picker__info flex items-center mb-4">
                <div className="h-4 w-1/5 bg-gray-300"></div>
              </div>
              <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
              <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
              <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
            </div>
            <div className="product-dimensions border-b-2 py-10">
              <div className="product-dimensions-header">
                <div className="h-4 w-1/4 bg-gray-300 mb-4"></div>
              </div>
              <div className="product-dimensions-content">
                <div className="product-dimensions-content-wrapper">
                  <div className="product-dimensions-content-description my-4">
                    <div className="h-4 w-5/6 bg-gray-300"></div>
                    <div className="h-4 w-3/4 bg-gray-300 mt-2"></div>
                    <div className="h-4 w-4/5 bg-gray-300 mt-2"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="product-sizes py-8">
              <div className="h-4 w-1/4 bg-gray-300 mb-4"></div>
              <div className="h-6 w-1/4 bg-gray-300 mb-2"></div>
              <div className="size-options flex">
                <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
                <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
                <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
              </div>
            </div>
            {/* Notification placeholder */}
            <div className="w-[300px] py-2 px-3 bg-gray-300 rounded fixed right-4 bottom-4 z-50"></div>
            <div className="products-action--panel py-8">
              <div className="h-12 w-3/4 bg-gray-300 mb-4"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonProductDetails;
