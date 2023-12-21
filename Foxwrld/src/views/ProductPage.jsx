import React, { useEffect, useState } from "react";
import Header from "../components/Navigation/Header";
import ProductDetails from "../components/ProductsDetails/ProductDetails";
import Footer from "../components/Navigation/Footer";
import RecommendedProducts from "../components/ProductsDetails/RecommendedProducts";
import HamburgerMenu from "../components/Navigation/Hamburger";
import axiosClient from "../axoisClient";
import { useParams } from "react-router-dom";
import SkeletonLoader from "../components/SkeletonLoader";
import SkeletonProductDetails from "../components/SkeletonProductDetails";

export default function ProductPage() {
  const [cartCount, setCartCount] = useState(0);
  const [product,setProduct] = useState(null);
  const [loading,setLoading] = useState(false);
  const [randomProducts,setRandomProducts] = useState([]);
  const {id} = useParams();
  
  useEffect(() => {
    setLoading(true)
    axiosClient.get(`/products/${id}`)
      .then(({ data }) => {
        setProduct(data)
        console.log(data);
        let url;
        if (data.gender == "male") {
          url = '/maleRandom';
        }
        else if (data.gender == "female") {
          url = '/femaleRandom';
        }
        else{
          url = '/childrenRandom';

        }
        axiosClient.get(url)
        .then(({data}) => {
          setRandomProducts(data.data);
        })
        setLoading(false)
      })
  },[]);

  const updateCartCount = (count) => {
    setCartCount(count);
    // console.log("Cart count:", count);
  };

  // console.log("product");
  // console.log(randomProducts);
  
  return (
    <div>
      <HamburgerMenu color="black" cartCount={cartCount} />
      <Header color="black" cartCount={cartCount} />
      <div>
        {loading ? (
          <SkeletonProductDetails /> // Display skeleton loader during loading
        ) : (
          product && <ProductDetails updateCartCount={updateCartCount} product={product} />
        )}
      </div>
   
      <Footer />
    </div>
  );
}
