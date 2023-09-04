import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axiosClient from "../../axoisClient";

export default function Accordion({ onFilteredData }) {
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [styleOpen, setStyleOpen] = useState(false);
  const [sizeOpen, setSizeOpen] = useState(false);
  const [selectedDataCheck, setSelectedDataCheck] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedStyles, setSelectedStyles] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedData, setSelectedData] = useState({
    categories: [],
    sizes: []
  });

  const handleCategorySelection = (subcategory) => {
    const updatedCategories = selectedCategories.includes(subcategory)
      ? selectedCategories.filter((item) => item !== subcategory)
      : [...selectedCategories, subcategory];
  
    setSelectedCategories(updatedCategories);
  
    const selectedData = {
      categories: updatedCategories,
      sizes: selectedSizes,
    };
  
    const serializedData = encodeURIComponent(JSON.stringify(selectedData));
  
    axiosClient
      .get("/selectUserProducts?selectedData=" + serializedData)
      .then(({ data }) => {
        if (data !== "") {
          setSelectedDataCheck(true);
          setSelectedProduct(data.data);
          setMeta(data.meta);
          console.log(data.data);

          onFilteredData(data.data);
        }
      })
      .catch((error) => {
        // Handle error
      });
  };
  

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
      // console.log("Product Data (JSON):", JSON.stringify(data, null, 2));

    })
  }

  useEffect(() => {
    setSelectedData({
      categories: selectedCategories,
      sizes: selectedSizes
    });
  }, [selectedCategories, selectedSizes]);


  useEffect(() => {
    // console.log("Selected Data:", selectedData);

  }, [selectedData]);

  useEffect(() => {
    getProduct()
  }, [])

  const toggleCategory = () => {
    setCategoryOpen(!categoryOpen);
  };

  const toggleStyle = () => {
    setStyleOpen(!styleOpen);
  };

  const toggleSize = () => {
    setSizeOpen(!sizeOpen);
  };


  const handleSizeSelection = (subcategory) => {
    if (selectedSizes.includes(subcategory)) {
      setSelectedSizes(selectedSizes.filter((item) => item !== subcategory));
    } else {
      setSelectedSizes([...selectedSizes, subcategory]);
    }
    
    const serializedData = encodeURIComponent(JSON.stringify(selectedData));

    axiosClient.get("/selectUserProducts?selectedData=" + serializedData)
  };

  const handleResetCategories = () => {
    setSelectedCategories([]);
  };

  const handleResetStyles = () => {
    setSelectedStyles([]);
  };

  const handleResetSizes = () => {
    setSelectedSizes([]);
  };

  const handleSelectAllCategories = () => {
    setSelectedCategories(["Tops", "Blazers", "Capes", "Dresses", "Outerwear", "Activewear", "Loungewear", "Accessories"]);
  };

  const handleSelectAllStyles = () => {
    setSelectedStyles(["Casual", "Bohemian", "Formal", "Vintage", "Streetwear", "Athleisure", "Classic"]);
  };

  const handleSelectAllSizes = () => {
    setSelectedSizes(["S", "L", "M", "XS", "2XL", "3XL", "4XL"]);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setCategoryOpen(false);
      setStyleOpen(false);
      setSizeOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  const getUniqueSizes = () => {
    const uniqueSizes = [];

    products.forEach((item) => {
      item.size.forEach((sizeObj) => {
        if (!uniqueSizes.includes(sizeObj.sizes)) {
          uniqueSizes.push(sizeObj.sizes);
        }
      });
    });

    return uniqueSizes;
  };

  const uniqueSizes = getUniqueSizes();

  const getUniqueSubcategoryCounts = () => {
    const subcategoryCounts = {};

    products.forEach((item) => {
      const addedSubcategories = {}; // Track added subcategories within an index

      item.categories.forEach((category) => {
        if (category.subMenu !== "B" && !addedSubcategories[category.subMenu]) {
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

  const subcategoryCounts = getUniqueSubcategoryCounts();

  const getUniqueSubcategoryCounts2 = () => {
    const subcategoryCounts = {};

    selectedProduct.forEach((item) => {
      const addedSubcategories = {}; // Track added subcategories within an index

      item.categories.forEach((category) => {
        if (category.subMenu !== "B" && !addedSubcategories[category.subMenu]) {
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

  const subcategoryCounts2 = getUniqueSubcategoryCounts2();

  return (
    <div className="accordion relative flex  border-[1px] uppercase py-6 text-[11px] text-black px-12  ">
     <div
        className="category mr-6 cursor-pointer fontbold"
        onMouseEnter={toggleCategory}
        onMouseLeave={toggleCategory}
      >
        Category
        {categoryOpen && (
          <ul className="sub-categories left-0 absolute w-full bg-white shadow-md p-4 z-10">
            <div className="w-1/3 grid grid-cols-2 gap-4">
              <li
                className={`py-2 px-4 flex items-center ${
                  selectedCategories.length ===
                  Object.keys(subcategoryCounts).length
                    ? "bg-blue-200"
                    : ""
                } ${
                  selectedCategories.length ===
                  Object.keys(subcategoryCounts).length
                    ? "text-white"
                    : ""
                } hover:bg-blue-200 cursor-pointer`}
                onClick={handleSelectAllCategories}
              >
                Select All
              </li>
              {Object.keys(subcategoryCounts).map((subcategory) => {
                const selected = selectedCategories.includes(subcategory);
                return (
                  <li
                    key={subcategory}
                    className={`py-2 px-4 flex items-center ${
                      selected ? "bg-blue-200" : ""
                    } hover:bg-blue-200 cursor-pointer`}
                    onClick={() => handleCategorySelection(subcategory)}
                  >
                    {subcategory} &nbsp;
                    <span>({subcategoryCounts[subcategory]})</span>
                    {selected && <span className="ml-2">&#10003;</span>}
                  </li>
                );
              })}
              {selectedCategories.length > 0 && (
                <li
                  className="py-2 px-4 flex items-center hover:bg-red-200 cursor-pointer"
                  onClick={handleResetCategories}
                >
                  Reset
                </li>
              )}
            </div>
          </ul>
        )}
      </div>


      {/* <div
            className="style mx-6 cursor-pointer fontbold"
            onMouseEnter={toggleStyle}
            onMouseLeave={toggleStyle}
          >
                Style
            {styleOpen && (
              <ul className="sub-categories absolute left-0 w-full bg-white shadow-md p-4 z-10">
                  <button
                    className="select-all-button m-4"
                    onClick={handleSelectAllStyles}
                  >
                  <Link to="#" className="underline"> 
                Select All
                </Link>
                  </button>
                  {selectedStyles.length > 0 && (
              <button className="reset-button" onClick={handleResetStyles}>
                Reset
              </button>
            )}
          <div className="w-1/3 grid grid-cols-2 gap-4">
        
            <li
              className={`py-2 px-4 flex items-center  ${
                selectedStyles.includes("Casual") ? "bg-blue-200" : ""
              }  hover:bg-blue-200  cursor-pointer`}
              onClick={() => handleStyleSelection("Casual")}
            >
              Casual&nbsp;<span>(323)</span>
              {selectedStyles.includes("Casual") && (
                <span className="ml-2">&#10003;</span>
              )}
            </li>
          
            <li
              className={`py-2 px-4 flex items-center  ${
                selectedStyles.includes("Bohemian") ? "bg-blue-200" : ""
              } hover:bg-blue-200  cursor-pointer`}
              onClick={() => handleStyleSelection("Bohemian")}
            >
              Bohemian&nbsp;<span>(2)</span>
              {selectedStyles.includes("Bohemian") && (
                <span className="ml-2">&#10003;</span>
              )}
            </li>
            <li
              className={`py-2 px-4 flex items-center  ${
                selectedStyles.includes("Formal") ? "bg-blue-200" : ""
              } hover:bg-blue-200  cursor-pointer`}
              onClick={() => handleStyleSelection("Formal")}
            >
              Formal&nbsp;<span>(32)</span>
              {selectedStyles.includes("Formal") && (
                <span className="ml-2">&#10003;</span>
              )}
            </li>
            <li
              className={`py-2 px-4 flex items-center  ${
                selectedStyles.includes("Vintage") ? "bg-blue-200" : ""
              } hover:bg-blue-200  cursor-pointer`}
              onClick={() => handleStyleSelection("Vintage")}
            >
              Vintage&nbsp;<span>(32)</span>
              {selectedStyles.includes("Vintage") && (
                <span className="ml-2">&#10003;</span>
              )}
            </li>
            <li
              className={`py-2 px-4 flex items-center  ${
                selectedStyles.includes("Streetwear") ? "bg-blue-200" : ""
              } hover:bg-blue-200  cursor-pointer`}
              onClick={() => handleStyleSelection("Streetwear")}
            >
              Streetwear&nbsp;<span>(32)</span>
              {selectedStyles.includes("Streetwear") && (
                <span className="ml-2">&#10003;</span>
              )}
            </li>
            <li
              className={`py-2 px-4 flex items-center  ${
                selectedStyles.includes("Athleisure") ? "bg-blue-200" : ""
              } hover:bg-blue-200  cursor-pointer`}
              onClick={() => handleStyleSelection("Athleisure")}
            >
              Athleisure&nbsp;<span>(32)</span>
              {selectedStyles.includes("Athleisure") && (
                <span className="ml-2">&#10003;</span>
              )}
            </li>
            <li
              className={`py-2 px-4 flex items-center  ${
                selectedStyles.includes("Classic") ? "bg-blue-200" : ""
              } hover:bg-blue-200  cursor-pointer`}
              onClick={() => handleStyleSelection("Classic")}
            >
              Classic&nbsp;<span>(32)</span>
              {selectedStyles.includes("Classic") && (
                <span className="ml-2">&#10003;</span>
              )}
            </li>
          </div>
          </ul>
        )}
      
      </div> */}
      <div
        className="size ml-6 cursor-pointer fontbold"
        onMouseEnter={toggleSize}
        onMouseLeave={toggleSize}
      >
        Size
        {sizeOpen && (
          <ul className="sub-categories absolute left-0 w-full bg-white shadow-md p-4 z-10">
            <button
              className={`select-all-button m-4 ${
                selectedSizes.length === uniqueSizes.length
                  ? "bg-blue-200 text-white"
                  : ""
              }`}
              onClick={handleSelectAllSizes}
            >
              <Link to="#" className="underline">
                Select All
              </Link>
            </button>
            {selectedSizes.length > 0 && (
              <button className="reset-button" onClick={handleResetSizes}>
                Reset
              </button>
            )}
            <div className="w-1/3 grid grid-cols-2 gap-4">
              {uniqueSizes.map((size) => (
                <li
                  key={size}
                  className={`py-2 px-4 flex items-center ${
                    selectedSizes.includes(size) ? "bg-blue-200" : ""
                  } hover:bg-blue-200 cursor-pointer`}
                  onClick={() => handleSizeSelection(size)}
                >
                  {size} &nbsp;
                  <span>({/* Count for this size from your data */})</span>
                  {selectedSizes.includes(size) && (
                    <span className="ml-2">&#10003;</span>
                  )}
                </li>
              ))}
            </div>
          </ul>
        )}
      </div>
    </div>
  );
}
