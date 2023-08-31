import React, { useState, useEffect } from "react";
import Header from "../Navigation/Header";
import pyjamas from "../../assets/pjamas1.jpeg";
import jacket from "../../assets/jacket1.jpeg";
import jacke2 from "../../assets/jacket2.jpeg";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import axiosClient from "../../axoisClient";
import { useStateContext } from "../../context/ContextProvider";
import SkeletonProductDetails from "../SkeletonProductDetails";

export default function ProductDetails({ updateCartCount,product }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const {setNotification,notification,inCart,setIncart } = useStateContext();


  const {id} = useParams();
  
  
  useEffect(() => {
    axiosClient.get(`/products/${id}`)
      .then(({ data }) => {
        // console.log("product page json", JSON.stringify(data));
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      });
  }, [id]);

  const handleSlideChange = (index) => {
    setActiveIndex(index);
  };

  const handleAddToCart = () => {
    updateCartCount((prevCount) => prevCount + 1);
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const images = product?.image
    ? product.image.map((item) => ({ src: item.image, alt: `Image ${item.id}` }))
    : [];

  const handleNextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const addToCart = (e) => {
    e.preventDefault();
  
    const newCartItem = {
      product_id: product.id,
      size: selectedSize
    };
  
    axiosClient.post('/order', newCartItem)
    .then(({data}) => {
        axiosClient.get('/userCart')
        .then(({data}) => {
          setIncart(data.data)
          setNotification("Product has been sucessfully added")
        }).catch((e) => {
          console.log(e);
        })
    }).catch((error) => console.log(error))
  };

  return (
    <div>
      <Header color="black" />
      <div className="pt-36">
        <div className="product-details flex flex-wrap">
          <div className="w-full lg:w-2/4 h-full md:h-100vh relative justify-center slideshow">
            <button
              className="prev-arrow absolute left-10 top-32 md:top-2/3"
              onClick={handlePrevSlide}
            >
              <span className="text-3xl text-slate-300">&lt;</span>
            </button>
            <button
              className="next-arrow absolute top-32 md:top-2/3 right-10"
              onClick={handleNextSlide}
            >
              <span className="text-3xl text-slate-300">&gt;</span>
            </button>
              <img
              src={images[activeIndex].src}
              alt={images[activeIndex].alt}
              className="product-image cursor-crosshair h-[50vh] md:h-[50vh] w-full object-contain"
            />
          </div>
          <div className="w-full lg:w-2/4 details px-8">
            <div>
              <div className="product-info py-6 border-b-2">
                <div className="product-info-panel pb-10">
                  <ul className="breadcumbs flex flex-wrap">
                    <li className="mr-2">
                      <Link>{product.gender}</Link>
                    </li>
                    <span className="divider mx-2">|</span>
                    <li className="mr-2">
                      <Link>New Arrivals</Link>
                    </li>
                    <span className="divider mx-2">|</span>
                    <li className="mr-2 underline-offset-4 underline">
                      <Link>Outwear</Link>
                    </li>
                  </ul>
                </div>
                <h1 className="product-info-panel-title flex flex-col">
                  <span className="mr-6 fontbold">{product.title}</span>
                  <span className="product-info-panel__price fontThin text-[15px]">
                    ₦{product.salePrice}
                  </span>
                </h1>
              </div>
              <div className="color-picker py-8 border-b-2">
                <div className="color-picker__info flex items-center mb-4">
                  <span className="color-picker__text uppercase fontbold text-sm">Color:</span> &nbsp;
                  <div className="color-picker__label text-sm fontLight">Optic White</div>
                </div>
                <div className="color-picker__swatch--container flex">
                  <div
                    className="swatch w-8 h-8 bg-cover bg-center rounded-full"
                    style={{ backgroundImage: `url(${jacke2})` }}
                  >
                    <Link className="rounded-full h-8 w-8">
                      <span className="swatch__color"></span>
                    </Link>
                  </div>
                  <div
                    className="swatch w-8 h-8 bg-cover bg-center rounded-full"
                    style={{ backgroundImage: `url(${jacket})` }}
                  >
                    <Link className="rounded-full h-8 w-8">
                      <span className="swatch__color"></span>
                    </Link>
                  </div>
                  <div
                    className="swatch w-8 h-8 bg-cover bg-center rounded-full"
                    style={{ backgroundImage: `url(${pyjamas})` }}
                  >
                    <Link className="rounded-full h-8 w-8">
                      <span className="swatch__color"></span>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="product-dimensions border-b-2 py-10">
                <div className="product-dimensions-header">
                  <h2 className="product-dimensions__header-title fontbold">
                    Product details
                  </h2>
                </div>
                <div className="product-dimensions-content">
                  <div className="product-dimensions-content-wrapper">
                    <div className="product-dimensions-content-description my-4">
                      <div className="description text">
                        <p className="fontThin">
                          {product.details}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="product-sizes py-8">
                <h3 className="fontBold mb-2 uppercase fontbold  text-sm mb-4">Sizes:</h3>
                <p>Please select your size</p>
                <div className="size-options flex">
                  {product.size.map((s) => (
                    <button
                    key={s.id}
                      className={`size-option px-4 py-2 ${
                        selectedSize === `${s.sizes}` ? "ring ring-black" : ""
                      }`}
                      onClick={() => handleSizeSelect(`${s.sizes}`)}
                    >
                      {s.sizes}
                    </button>
                  ))}
                </div>
              </div>

                  {
                    notification && (
                        <div className="w-[300px] py-2 px-3 text-white rounded bg-green-500 fixed right-4 bottom-4 z-50 animate-fade-in-down">
                        {notification}
                    </div>)
                  }
              <div className="products-action--panel py-8">
                <form onSubmit={addToCart} method="post">
                  
                  <button
                    className="bg-black hover:bg-slate-900 text-white font-bold py-4 px-4 rounded w-3/4"
                    onClick={handleAddToCart}
                  >
                    Add to Shopping Cart
                  </button>

                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
