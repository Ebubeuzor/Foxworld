import React, { useState } from "react";

const FilterSection = () => {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sizes, setSizes] = useState([]);

  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value);
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
  };

  const handleBrandChange = (e) => {
    const brand = e.target.value;
    if (brands.includes(brand)) {
      setBrands(brands.filter((b) => b !== brand));
    } else {
      setBrands([...brands, brand]);
    }
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    if (categories.includes(category)) {
      setCategories(categories.filter((c) => c !== category));
    } else {
      setCategories([...categories, category]);
    }
  };

  const handleSizeChange = (e) => {
    const size = e.target.value;
    if (sizes.includes(size)) {
      setSizes(sizes.filter((s) => s !== size));
    } else {
      setSizes([...sizes, size]);
    }
  };

  const handleApplyFilter = () => {
  
  };

  return (
    <div className="filter-section">
      <h3 className="text-lg font-semibold">Price Range:</h3>
      <label htmlFor="min-price" className="block mt-2">
        Minimum Price:
        <input
          type="text"
          id="min-price"
          value={minPrice}
          onChange={handleMinPriceChange}
          className="border p-1 rounded mt-1"
        />
      </label>

      <label htmlFor="max-price" className="block mt-2">
        Maximum Price:
        <input
          type="text"
          id="max-price"
          value={maxPrice}
          onChange={handleMaxPriceChange}
          className="border p-1 rounded mt-1"
        />
      </label>

      <button
        onClick={handleApplyFilter}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
      >
        Apply Price Filter
      </button>

      <h3 className="text-lg font-semibold mt-4">Brand:</h3>
      <label htmlFor="brand1" className="flex items-center mt-2">
        <input
          type="checkbox"
          id="brand1"
          value="Brand 1"
          onChange={handleBrandChange}
          checked={brands.includes("Brand 1")}
          className="mr-2"
        />
        Brand 1
      </label>
      <label htmlFor="brand2" className="flex items-center mt-2">
        <input
          type="checkbox"
          id="brand2"
          value="Brand 2"
          onChange={handleBrandChange}
          checked={brands.includes("Brand 2")}
          className="mr-2"
        />
        Brand 2
      </label>
      <label htmlFor="brand3" className="flex items-center mt-2">
        <input
          type="checkbox"
          id="brand3"
          value="Brand 3"
          onChange={handleBrandChange}
          checked={brands.includes("Brand 3")}
          className="mr-2"
        />
        Brand3
      </label>
      {/* Add more brand options as needed */}

      <h3 className="text-lg font-semibold mt-4">Category:</h3>
      <label htmlFor="category1" className="flex items-center mt-2">
        <input
          type="checkbox"
          id="category1"
          value="Category 1"
          onChange={handleCategoryChange}
          checked={categories.includes("Category 1")}
          className="mr-2"
        />
        Category 1
      </label>
      <label htmlFor="category2" className="flex items-center mt-2">
        <input
          type="checkbox"
          id="category2"
          value="Category 2"
          onChange={handleCategoryChange}
          checked={categories.includes("Category 2")}
          className="mr-2"
        />
        Category 2
      </label>
      <label htmlFor="category3" className="flex items-center mt-2">
        <input
          type="checkbox"
          id="category3"
          value="Category 3"
          onChange={handleCategoryChange}
          checked={categories.includes("Category 3")}
          className="mr-2"
        />
        Category 3
      </label>
      {/* Add more category options as needed */}

      <h3 className="text-lg font-semibold mt-4">Size:</h3>
      <label htmlFor="size-small" className="flex items-center mt-2">
        <input
          type="checkbox"
          id="size-small"
          value="Small"
          onChange={handleSizeChange}
          checked={sizes.includes("Small")}
          className="mr-2"
        />
        Small
      </label>
      <label htmlFor="size-medium" className="flex items-center mt-2">
        <input
          type="checkbox"
          id="size-medium"
          value="Medium"
          onChange={handleSizeChange}
          checked={sizes.includes("Medium")}
          className="mr-2"
        />
        Medium
      </label>
      <label htmlFor="size-large" className="flex items-center mt-2">
        <input
          type="checkbox"
          id="size-large"
          value="Large"
          onChange={handleSizeChange}
          checked={sizes.includes("Large")}
          className="mr-2"
        />
        Large
      </label>
      {/* Add more size options as needed */}
    </div>
  );
};

export default FilterSection;
