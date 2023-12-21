import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import Header from "../Navigation/Header";
import pyjamas from "../../assets/pjamas1.jpeg";
import jacket from "../../assets/jacket1.jpeg";
import jacke2 from "../../assets/jacket2.jpeg";
import { Link, Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";


import axiosClient from "../../axoisClient";
import { useStateContext } from "../../context/ContextProvider";
import SkeletonProductDetails from "../SkeletonProductDetails";

export default function ProductDetails({ updateCartCount,product }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [mainImage, setMainImage] = useState("");
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedColorName, setSelectedColorName] = useState('');

  const {setNotification,notification,inCart,setIncart,token,setUser,user } = useStateContext();
  const navigate = useNavigate();


  const {id} = useParams();
  
const [colors, setColors] = useState([]);
  
  const userData = () => {
    axiosClient.get('/user')
    .then(({data}) => {
      setUser(data)
    })
  }

  useEffect(() => {
    userData()
  }, []);
  
  useEffect(() => {
    axiosClient.get(`/products/${id}`)
      .then(({ data }) => {
        console.log(data);
        setColors(data.colors)
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
    // 
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

  // Check if a size has been selected
  if (!selectedSize) {
    setNotification("Please select a size before adding to the cart");
    return; // Do not proceed further
  }
  if (!selectedColor) {
    setNotification("Please select a color before adding to the cart");
    return; // Do not proceed further
  }

  const newCartItem = {
    product_id: product.id,
    color_id: selectedColor,
    size: selectedSize,
  };

  if (token == null) {
    Cookies.set("redirectPath", `/Productpage/${id}`);
    return navigate('/login');
  } else {
    axiosClient
      .post('/order', newCartItem)
      .then(({ data }) => {
        axiosClient
          .get('/userCart')
          .then(({ data }) => {
            setIncart(data.data);
            setNotification("Product has been successfully added");
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((error) => console.log(error));
  }
};

const handleImageClick = (imageSrc) => {
  // Set the clicked image as the main image
  setMainImage(imageSrc);
};
const toggleColor = (color,colorname) => {
  // If the clicked color is already selected, unselect it
  if (selectedColor === color) {
    setSelectedColor('');
    setSelectedColorName('');
  } else {
    // If the clicked color is not selected, select it
    setSelectedColor(color);
    setSelectedColorName(colorname)
  }
};



  return (
    <div>
      <Header color="black" />
      <div className="pt-36">
        <div className="product-details flex flex-wrap">
          <div className="w-full lg:w-2/4 h-full md:h-100vh relative justify-center slideshow">
            {/* <button
              className="prev-arrow absolute left-10 top-32 md:top-2/3"
              onClick={handlePrevSlide}
            >
             <svg xmlns="http://www.w3.org/2000/svg" height="35" width="35" viewBox="0 0 320 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>
            </button>
            <button
              className="next-arrow absolute top-32 md:top-2/3 right-10"
              onClick={handleNextSlide}
            >
                           <svg xmlns="http://www.w3.org/2000/svg" height="35" width="35"  viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>

            </button> */}
            {images && images.length > 0 ? (
       <>
       <img
         src={mainImage || images[activeIndex].src}
         alt={images[activeIndex].alt}
         className="product-image cursor-crosshair h-[50vh] md:h-[50vh] w-full object-contain"
       />
       {/* Small images */}
       <div className="small-images ml-4 flex flex-wrap justify-center mt-6 space-x-4">
         {images.map((img, index) => (
           <img
             key={index}
             src={img.src}
             alt={`Small Image ${index}`}
             className={`small-image cursor-pointer  w-28 h-28 object-cover border ${index === activeIndex ? 'border-black' : ''}`}
             onClick={() => handleImageClick(img.src)}
           />
         ))}
       </div>
     </>
        
      ) : (
        <p>No images available</p>
      )}
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

      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
        <span style={{ textTransform: 'uppercase', fontWeight: 'bold', fontSize: '14px' }}>
          Color:
        </span>{" "}
        &nbsp;
        <div style={{ fontSize: '12px', fontStyle: 'light' }}>
          {selectedColorName ? selectedColorName : "None"}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {colors.map((color, index) => (
          <div key={color.id} style={{ marginBottom: '4px' }} className="mr-5">
            <div
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                cursor: 'pointer',
                marginRight: '8px',
                backgroundColor: selectedColor === color ? 'black' : 'grey',
              }}
              onClick={() => toggleColor(color.id,color.color)}
            >
              <label style={{ width: '8px', height: '8px', borderRadius: '50%' }}></label>
            </div>
            <div style={{ fontSize: '12px', fontStyle: 'light', textAlign: 'center' }} className="mt-2">
              {color.color}
            </div>
          </div>
        ))}
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
                        <div className="w-[300px] py-2 px-3 text-white rounded bg-black fixed right-4 bottom-4 z-50 animate-fade-in-down">
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
