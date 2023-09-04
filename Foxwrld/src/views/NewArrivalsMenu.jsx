import React, { useEffect, useState } from "react";
import Header from "../components/Navigation/Header";
import Hamburger from "../components/Navigation/Hamburger";
import Accordion from "../components/Accordion/Accordion";
import MobileFilterModalMenu from "../components/Filter/MobileFilterModalMenu";
import { Link, useLocation, useParams } from "react-router-dom";
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
import AccordionMenu from "../components/Accordion/AccordionMenu";
import SkeletonLoader from "../components/SkeletonLoader";

export default function NewArrivalsMenu() {
  

  const handleFilteredData = (filteredData) => {
    setProducts(filteredData);
    
  }
  const [meta,setMeta] = useState({});
  const [products,setProducts] = useState([]);
  
  const [loading,setLoading] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const menu = queryParams.get('menu');
  const submenu = encodeURIComponent(queryParams.get('submenu')); 
  const item = encodeURIComponent(queryParams.get('item'));
  const getProduct = (url) => {
    setLoading(true)
    url = url || `/selectProducts?menu=${menu}&submenu=${submenu}&item=${item}`
    axiosClient.get(url)
    .then(({ data }) => {
      setProducts(data.data)
      setMeta(data.meta);
      setLoading(false)
      // console.log(data.data);
      // console.log("Product Data (JSON):", JSON.stringify(data, null, 2));
    })
  }

  useEffect(() => {
    getProduct()
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
            {menu && menu} Categories
          </div>
          <div>
            <div className="hidden md:block">
              <AccordionMenu  onFilteredData={handleFilteredData}  />
            </div>
            <MobileFilterModalMenu />

            {/* <FilterSection/> */}
            <div className="pt-14 pb-12 text-center  text-sm">
              {/* <span className="text-[12px]">{meta.total} results</span> */}
            </div>
          </div>
        </div>
        <div>
          <div className="flex flex-wrap justify-center">
          {loading ? (
              <SkeletonLoader count={3} /> // Adjust the count as needed
            ) : (
              products.map((product) => (
                <Link to={"/ProductPage/" + product.id} key={product.id}>
                  <ProductCard
                    image={product.frontImage}
                    alternateImage={product.alternateImage}
                    title={product.title}
                    color={"3"}
                    category={"New In"}
                  />
                </Link>
              ))
            )}

          </div>
          <Pagination meta={meta} onPageClick={onPageClick}/>
        </div>
      </main>
      <Footer />
    </div>
  );
}
