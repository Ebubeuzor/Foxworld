import React, { useEffect, useState } from "react";
import Header from "../components/Navigation/Header";
import Hamburger from "../components/Navigation/Hamburger";
import Accordion from "../components/Accordion/Accordion";
import MobileFilterModal from "../components/Filter/MobileFilterModal";
import { Link, useParams } from "react-router-dom";
import ProductCard from "../components/ProductsDetails/ProductCard";
import sandals from "../assets/sandals.jpeg";
import coats from "../assets/jacket.jpeg";
import Pagination from "../components/Navigation/Pagination";
import Footer from "../components/Navigation/Footer.jsx";
import pjamas1 from "../assets/pjamas1.jpeg";
import pjamas2 from "../assets/pjamas2.jpeg";
import jacket1 from "../assets/jacket1.jpeg";
import jacket2 from "../assets/jacket2.jpeg";
import axiosClient from "../axoisClient";
import SkeletonLoader from "../components/SkeletonLoader";




export default function NewArrivals() {

  const handleFilteredData = (filteredData) => {
    setProducts(filteredData);
    
  }
  const [loading,setLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);
  const {id} = useParams();
  const [meta,setMeta] = useState({});
  const [products,setProducts] = useState([]);
  

  const getProduct = (url) => {
    setLoading(true)
    url = url || `/${id}`
    axiosClient.get(url)
    .then(({ data }) => {
      setProducts(data.data)
      setMeta(data.meta);
      setLoading(false)
      // console.log(data);
      // console.log("Product Data (JSON):", JSON.stringify(data, null, 2));
    })
  }

  const getLength = products.length;  

  useEffect(() => {
    getProduct()
    setInitialLoad(false);
  }, [])

  const onPageClick = (link) => {
    getProduct(link.url);
  }

  // console.log(id);

  return (
    <div>
      <div className="h-14">
        <Header color={"black"} />
        <Hamburger  color={"black"}/>
      </div>
      <main>
        <div>
        <div className="pt-14 pb-14 mt-24 mb-24 text-center uppercase fontbold">
            {id && `${id}'s`} 
          </div>
          <div>
            <div className="hidden md:block">
            <Accordion onFilteredData={handleFilteredData} />
            </div>
            <MobileFilterModal  onFilteredData={handleFilteredData}/>

            {/* <FilterSection/> */}
            <div className="pt-14 pb-12 text-center  text-sm">
              <span className="text-[12px]">{meta.total} results</span>
            </div>
          </div>
        </div>
        <div>
        <div className="flex flex-wrap justify-center">
        {/* {console.log("Number of products:", products.length)} */}

       {(loading || initialLoad) ? (
       <SkeletonLoader count={initialLoad ? products.length : 3} />

  ) : (  
              products.map((product) => (
                <Link to={`/ProductPage/${product.id}`} key={product.id}>
                  <ProductCard
                    image={product.image[0].image}
                    alternateImage={product.alternateImage}
                    title={product.title}
                    color={product.color}
                    category={
                      product.categories.length > 0
                        ? product.categories[0].categories
                        : 'Uncategorized' 
                    }
                  />
                </Link>
              ))
            )}

            {/* {!loading && products.map((product) => (
              <Link to={`/ProductPage/${product.id}`} key={product.id}>
                <ProductCard
                  image={product.image[0].image} // Use the first image URL from the array
                  alternateImage={product.alternateImage}
                  title={product.title}
                  color={product.color} // You should replace this with the actual color value
                  category={product.categories[0].categories} // Use the first category from the array
                />
              </Link>
            ))} */}
          </div>
          <Pagination meta={meta} onPageClick={onPageClick}/>
        </div>
      </main>
      <Footer />
    </div>
  );
}
