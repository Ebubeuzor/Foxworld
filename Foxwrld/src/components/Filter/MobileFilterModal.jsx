import React, { useState,useEffect } from "react";
import Modal from "react-modal";
import { Link, useParams } from "react-router-dom";
import axiosClient from "../../axoisClient";


const MobileFilterModal = ({ onFilteredData }) => {
  
  const [loading,setLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [accordionStylesOpen, setAccordionStylesOpen] = useState(false);
  const [accordionSizesOpen, setAccordionSizesOpen] = useState(false);

  const [selectedDataCheck, setSelectedDataCheck] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [selectedTags, setSelectedTags] = useState({
    categories: [],
    sizes: []
  });
  const {id} = useParams();


  const [meta,setMeta] = useState({});
  const [products,setProducts] = useState([]);






    const getProduct = (url) => {
    url = url || `/${id}`
    axiosClient.get(url)
    .then(({ data }) => {
      setProducts(data.data)
      setMeta(data.meta);
      // console.log(products);

    })
  }

  useEffect(() => {
    getProduct()
  }, [])

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const toggleAccordion = () => {
    setAccordionOpen(!accordionOpen);
  };

  const toggleStylesAccordion = () => {
    setAccordionStylesOpen(!accordionStylesOpen);
  };

  const toggleSizesAccordion = () => {
    setAccordionSizesOpen(!accordionSizesOpen);
  };

  const handleTagClick = (tag, type) => {
    const updatedTags = { ...selectedTags };
  
    if (updatedTags[type].includes(tag)) {
      updatedTags[type] = updatedTags[type].filter((t) => t !== tag);
    } else {
      updatedTags[type] = [...updatedTags[type], tag];
    }
  
    setSelectedTags(updatedTags);
    
    const serializedData = encodeURIComponent(JSON.stringify(selectedTags));
  
    axiosClient
      .get("/selectUserProducts?selectedData=" + serializedData)
      .then(({ data }) => {
        if (data !== "") {
          setSelectedDataCheck(true);
          setSelectedProduct(data.data);
          setMeta(data.meta);
          // console.log(JSON.stringify(data.data));
          onFilteredData(data.data);

        }
      })
      .catch((error) => {
        // Handle error
      });
  };


   const getUniqueSubcategoryCounts = () => {
    const subcategoryCounts = {};
  
    products.forEach((item) => {
      const addedSubcategories = {}; // Track added subcategories within an index
  
      item.categories.forEach((category) => {
        if (!addedSubcategories[category.subMenu]) {
          addedSubcategories[category.subMenu] = true;
  
          if (!subcategoryCounts[category.subMenu]) {
            subcategoryCounts[category.subMenu] = 1;
          } else {
            subcategoryCounts[category.subMenu]++;
          }
        }
      });
    });
  
    return subcategoryCounts;
  };
  
  const uniqueSubcategoryCounts = getUniqueSubcategoryCounts();

  const customModalStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 1000,
    },
    content: {
      top: "0",
      right: "0",
      left: "0",
      bottom: "0",
    },
  };

  Modal.setAppElement("#root"); 

  return (
    <div className="z-40 fixed bottom-0 right-0 m-4 md:hidden">
      <button
        onClick={openModal}
        className="bg-black hover:bg-slate-800 text-white font-bold p-5 rounded-full"
      >
       <svg
  xmlns="http://www.w3.org/2000/svg"
  className="h-6 w-6"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M4 6h16M4 12h8m-8 6h16"
  />
</svg>

      </button>
      <Modal
        isOpen={modalIsOpen}
        style={customModalStyles}
        onRequestClose={closeModal}
        contentLabel="Mobile Filter Modal"
      >
          <button
    onClick={closeModal}
    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  </button>
        <h2 className="text-2xl font-bold mb-4">Filter </h2>
        <div className="accordion">
          <button
            className="accordion-button fontBold"
            onClick={toggleAccordion}
          >
            Category
            {/* SVG */}
          </button>
             {accordionOpen && (
    <div className="accordion-content">
      <div>
      {Object.keys(uniqueSubcategoryCounts).map((submenu) => (
  <label
    key={submenu}
    className={`inline-flex items-center mt-2 cursor-pointer ${
      selectedTags.categories.includes(submenu)
        ? "text-green-500"
        : "text-gray-500"
    }`}
    onClick={() => handleTagClick(submenu, 'categories')}
  >
    <span className="ml-2">{`${submenu} (${uniqueSubcategoryCounts[submenu]})`}</span>
    {selectedTags.categories.includes(submenu) && (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 ml-1 text-green-500"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        {/* SVG path */}
      </svg>
    )}
  </label>
))}

      </div>
    </div>
  )}

       
          <div>
            <button
              className="accordion-button fontBold"
              onClick={toggleSizesAccordion}
            >
              Sizes
              {/* SVG */}
            </button>
             {accordionSizesOpen && (
    <div className="accordion-content">
      <div>
      {products[0]?.size.map((sizeObj) => (
  <label
    key={sizeObj.id}
    className={`inline-flex items-center mt-2 cursor-pointer ${
      selectedTags.sizes.includes(sizeObj.sizes)
        ? "text-green-500"
        : "text-gray-500"
    }`}
    onClick={() => handleTagClick(sizeObj.sizes, 'sizes')}
  >
    <span className="ml-2">{sizeObj.sizes}</span>
    {selectedTags.sizes.includes(sizeObj.sizes) && (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 ml-1"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M7.293 14.707a1 1 0 010-1.414L9.586 10 7.293 7.707a1 1 0 111.414-1.414L11 8.586l2.293-2.293a1 1 0 111.414 1.414L12.414 10l2.293 2.293a1 1 0 01-1.414 1.414L11 11.414l-2.293 2.293a1 1 0 01-1.414 0z"
          clipRule="evenodd"
        />
      </svg>
    )}
  </label>
))}

      </div>
    </div>
  )}
          </div>
        </div>
        <button
          onClick={closeModal}
          className="bg-black text-white font-bold py-2 px-4 rounded mt-4"
        >
          Submit
        </button>
      </Modal>
    </div>
  );
};

export default MobileFilterModal;
