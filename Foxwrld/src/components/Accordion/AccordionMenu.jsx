import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import axiosClient from "../../axoisClient";

export default function AccordionMenu() {
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [styleOpen, setStyleOpen] = useState(false);
  const [sizeOpen, setSizeOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedStyles, setSelectedStyles] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);


  const [meta,setMeta] = useState({});
  const [products,setProducts] = useState([]);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const menu = queryParams.get('menu');
  const submenu = queryParams.get('submenu');
  const item = queryParams.get('item');
  const getProduct = (url) => {
    url = url || `/selectProducts?menu=${menu}&submenu=${submenu}&item=${item}`
    axiosClient.get(url)
    .then(({ data }) => {
      setProducts(data.data)
      setMeta(data.meta);
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

  const handleCategorySelection = (subcategory) => {
    if (selectedCategories.includes(subcategory)) {
      setSelectedCategories(
        selectedCategories.filter((item) => item !== subcategory)
      );
    } else {
      setSelectedCategories([...selectedCategories, subcategory]);
    }
  };

  const handleStyleSelection = (subcategory) => {
    if (selectedStyles.includes(subcategory)) {
      setSelectedStyles(selectedStyles.filter((item) => item !== subcategory));
    } else {
      setSelectedStyles([...selectedStyles, subcategory]);
    }
  };

  const handleSizeSelection = (subcategory) => {
    if (selectedSizes.includes(subcategory)) {
      setSelectedSizes(selectedSizes.filter((item) => item !== subcategory));
    } else {
      setSelectedSizes([...selectedSizes, subcategory]);
    }
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

  return (
    <div className="Menu relative flex  border-[1px] uppercase py-6 text-[11px] text-black px-12  ">
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
