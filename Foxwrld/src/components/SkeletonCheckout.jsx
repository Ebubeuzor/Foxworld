import React from 'react';

const SkeletonCheckout = () => {
  return (
    <div className="p-2">
      <section className="header flex mx-auto">
        {/* <button className="text-2xl" disabled>
          &#8592;
        </button> */}
        <div className="mx-auto fontBold text-4xl animate-pulse bg-gray-200 w-24 h-8 rounded"></div>
      </section>
      <div>
        <section>
          <div>
            <div className="shopping-bag uppercase my-14 text-center font-bold">
            {/* (<span className="animate-pulse bg-gray-200 w-12 h-6 rounded"></span>) */}
            </div>
            <div className="shopping-bag__container flex flex-wrap">
              <div className="shopping-bag__products md:w-2/4 h-full md:h-[50vh] overflow-y-scroll">
                <div className="animate-pulse bg-gray-200 w-full h-32 mb-2 rounded"></div>
                <div className="animate-pulse bg-gray-200 w-full h-32 mb-2 rounded"></div>
                <div className="animate-pulse bg-gray-200 w-full h-32 mb-2 rounded"></div>
                {/* More skeleton loaders */}
              </div>
              <div className="shopping-bag__payment bg-gray-100 w-full md:w-2/4 p-5 md:h-[30vh] m-3 md:m-0">
                <div className="animate-pulse bg-gray-200 w-1/2 h-6 mb-4 rounded"></div>
                <div className="animate-pulse bg-gray-200 w-3/4 h-6 mb-2 rounded"></div>
                <div className="animate-pulse bg-gray-200 w-2/4 h-6 mb-2 rounded"></div>
                <hr className="my-4" />
                <div className="animate-pulse bg-gray-200 w-1/3 h-6 mb-2 rounded"></div>
                <div className="animate-pulse bg-gray-200 w-1/2 h-8 mt-4 rounded"></div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SkeletonCheckout;
