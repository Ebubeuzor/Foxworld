import React, { useEffect, useRef, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Button from "../Button";
import axiosClient from "../../axoisClient";
import { useStateContext } from "../../context/ContextProvider";

export default function Layout() {

  const {id} = useParams();
  const categoryRef = useRef();
  const {notification,setNotification,token,setToken,setUser,user} = useStateContext();
  const [showSchedule, setShowSchedule] = useState(false);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [images, setImages] = useState([]);
  const [imagesPre, setImagesPre] = useState([]);
  const [frontImage, setFrontImage] = useState(null);
  const [frontImage_Url, setFrontImage_Url] = useState(null);
  const [alternateImage, setAlternateImage] = useState(null);
  const [alternateImage_Url, setAlternateImage_Url] = useState(null);
  const [sizes, setSizes] = useState([]);
  const [upsell, setUpsell] = useState("");
  const [savedColors, setSavedColors] = useState([]);
  const [stock, setStock] = useState("");
  const [tag, setTag] = useState("");
  const [error, setError] = useState({__html: ""});
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedColor, setSelectedColor] = useState([]);
  const [getGender, setGetGender] = useState("");

  const [formData, setFormData] = useState({
    id: null,
    title: "",
    details: "",
    price: "",
    salePrice: "",
    startDate: "",
    endDate: "",
    tag: "",
    stock: "",
  });

  
  if(!token){
    return <Navigate to="/Login"/>
  }
  
  
  
  const userData = () => {
    axiosClient.get('/user')
    .then(({data}) => {
      setUser(data)
    })
  }

  
  const getColors = () => {
    axiosClient.get('/colors')
    .then(({data}) => {
      setSavedColors(data.data);
    }).catch(e => console.log(e))
  }

  useEffect(() => getColors(),[]);
  
  useEffect(() => {
    userData()
  }, []);
  
  if (user.admin == null) {
    return <Navigate to="/"/>
  }
  
  const logOut = (ev) => {
    ev.preventDefault();
    
    axiosClient.get('/logout')
    .then((res) =>{
      setUser({});
      setToken(null);
      location.reload();
    });
  }

  if (id) {
    useEffect(() => {
      axiosClient.get(`/products/${id}`)
        .then(({ data }) => {
          setFormData(data);
          setGetGender(data.gender);
          // console.log(data);
      // Assuming 'image' is an array of objects with 'image' property
      const imageUrls = data.image.map((imgObj) => imgObj.image);
      setImagesPre(imageUrls);

      // Assuming 'categories' is an array of objects with 'categories' property
      const categoryNames = data.categories.map((catObj) => catObj.id);
      setSelectedCategory(categoryNames);
      
      const colorid = data.colors.map((col) => col.id);
      setSelectedColor(colorid);

      // Assuming 'size' is an array of objects with 'sizes' property
      const sizesArray = data.size.map((sizeObj) => sizeObj.sizes);
      setSizes(sizesArray);

      setUpsell(data.upsell);
    }).catch((error) => {
      
      if (error.response && error.response.status === 422) {
        if (error.response.data.errors) {
          
          const finalError = Object.values(error.response.data.errors).reduce((accum,next) => [
            ...accum, ...next
          ], [])
          setError({__html: finalError.join("<br/>")});
            
        } else {
          const finalError = Object.values(error.response.data.message).reduce((accum,next) => [
            ...accum, ...next
          ], [])
          setError({__html: finalError.join("")});
        }
      }
      
    })
  }, []);
}

  const [gender, setGender] = useState("");

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleUpdateGenderChange = (event) => {
    setGetGender(event.target.value);
  };

  const handleScheduleClick = () => {
    setShowSchedule(!showSchedule);
  };

  const getCategory = () => {
    axiosClient.get('/category')
    .then(({data}) => {
      // console.log(data.data);
      setCategories(data.data)
    });
  }

  const deleteCategory = (id) => {
    axiosClient.delete(`/category/${id}`)
      .then(({ data }) => {
        getCategory()
        setNotification("This category has been deleted");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  

  useEffect(()=>{
    getCategory()
  },[])

  
  const handleCategoryChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedCategory([...selectedCategory, value]);
    } else {
      setSelectedCategory(selectedCategory.filter((category) => category !== value));
    }
  };
  
  
  
  const handleColorChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedColor([...selectedColor, value]);
    } else {
      setSelectedColor(selectedColor.filter((color) => color !== value));
    }
  };
  
  

  const handleNewCategorySubmit = (event) => {
    event.preventDefault();
    const payload = {
      categories : categoryRef.current.value
    };

    axiosClient.post('/category',payload)
    .then(({data}) => {
      getCategory()
      setCategories(data)
      location.reload();
    }).catch((error) => {
      
      if (error.response && error.response.status === 422) {
        if (error.response.data.errors) {

          const finalError = Object.values(error.response.data.errors).reduce((accum,next) => [
            ...accum, ...next
          ], [])
          setError({__html: finalError.join("<br/>")});
          
        } else {
          const finalError = Object.values(error.response.data.message).reduce((accum,next) => [
            ...accum, ...next
          ], [])
          setError({__html: finalError.join("")});
        }
      }

    })
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();

    const whichGender = id ? getGender : gender;

    const data = {
      ...formData,
      categories:selectedCategory,
      colors:selectedColor,
      images,
      frontImage,
      frontImage_Url,
      alternateImage,
      alternateImage_Url,
      sizes,
      upsell,
      gender:whichGender,

    };

    // console.log("Submitted data:", data);


    data.frontImage = data.frontImage_Url;
    data.alternateImage = data.alternateImage_Url;
    
    delete data.frontImage_Url;
    delete data.alternateImage_Url;

    if (images.length > 0) {
      data.images = images;
    } else {
      delete data.images;
      data.images = [];
    }

    let res;
    if (id) {
      res = axiosClient.put(`/products/${id}`, data)
    } else {
      res = axiosClient.post('/products', data);
    }
    res.then(({data}) => {
      if (id) {
        setNotification('Poduct was updated')
      } else {
        setNotification('Poduct has been added')
      }
    })
    .catch((error) => {
      
      if (error.response && error.response.status === 422) {
        if (error.response.data.errors) {

          const finalError = Object.values(error.response.data.errors).reduce((accum,next) => [
            ...accum, ...next
          ], [])
          setError({__html: finalError.join("<br/>")});
          
        } else {
          const finalError = Object.values(error.response.data.message).reduce((accum,next) => [
            ...accum, ...next
          ], [])
          setError({__html: finalError.join("")});
        }
      }

    })

    setFormData({
      title: "",
      details: "",
      price: "",
      stock:"",
      salePrice: "",
      startDate: "",
      endDate: "",
      tag: "",
    });
    setCategories([]);
    setImages([]);
    setFrontImage("");
    setAlternateImage("");
    setSizes([]);
    setUpsell("");
    setStock("");
  };

  
  const handleMultipleImagesChange = (event) => {
    const files = event.target.files;
    const imagesArray = [];
  
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
  
      reader.onload = () => {
        const imageUrl = reader.result;
  
        if (!imageUrl.startsWith('http://')) {
          imagesArray.push(imageUrl);
        }
  
        if (imagesArray.length === files.length) {
          setImages((prevImages) => [...prevImages, ...imagesArray]);
          setImagesPre((prevImages) => [...prevImages,...imagesArray])
        }
  
        event.target.value = '';
      };
  
      reader.readAsDataURL(file);
    }
  };
  
  

  const handlePublish = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    handleSubmit(event); // Call the handleSubmit function with the event object
  };
  

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (categories.includes(formData.category)) {
      setSelectedCategory(formData.category);
    }
  }, [categories, formData.category]);
  

  
  return (
    <div className="flex">
      <div className="sidebar bg-gray-200 w-1/4 border border-gray-300 h-[100vh]">
        <ul className="px-4">
          <li>
            <div className="fontBold">Welcome Admin</div>
          </li>
          <li>
            <div className="p-4 hover:bg-slate-300 border-b">
              <Link to="/EditHomepage" className="text-black  ">
                <div>EditHomepage</div>
              </Link>
            </div>
            <div className="p-4 hover:bg-slate-300 border-b">
              <Link to="/MenuEditor" className="text-black  ">
                <div>MenuEditor</div>
              </Link>
            </div>
            <li>
            <div className="p-4  hover:bg-slate-300 border-b">
              <Link to="/ColorPalette" className="text-black ">
                <div>ColorPalette</div>
              </Link>
            </div>
          </li>
            <div className="p-4 hover:bg-slate-300 border-b  ">
              <Link to="/Reports" className="text-black  ">
                <div>Analysis</div>
              </Link>
            </div>
          </li>
          {/* <li>
            <div className="p-4  hover:bg-slate-300 border-b">
              <Link to="/EditOrder" className="text-black active">
                <div>Edit Order</div>
              </Link>
            </div>
          </li> */}
          <li>
            <div className="p-4 hover:bg-slate-300 border-b">
              <Link to="/Products" className="text-black ">
                <div>Products</div>
              </Link>
            </div>
          </li>
          <li>
            <div className="p-4 bg-slate-400 border-b">
              <Link to="/NewProducts" className="text-black ">
                <div>New Products</div>
              </Link>
            </div>
          </li>
          <li>
            <div className="p-4  hover:bg-slate-300 border-b">
              <Link to="/Order" className="text-black ">
                <div>Order</div>
              </Link>
            </div>
          </li>
          <li>
            <div className="p-4  hover:bg-slate-300 border-b">
              <Link onClick={logOut} className="text-black ">
                <div>Logout</div>
              </Link>
            </div>
          </li>
        </ul>
      </div>
      <div className="main-content flex-1 bg-white h-[100vh] p-4 ">
        <header>
          <div className="flex my-4 items-center">
            {!formData.id && <h1 className="fontBold text-lg">Add New Products</h1>}
            {formData.id && <h1 className="fontBold text-lg">Update Products</h1>}
          </div>
        </header>

        <div className="bg-slate-200 rounded-lg shadow-lg p-4">
          <form className="border border-gray-300 p-4" method="post" onSubmit={handleSubmit}>
            {
              error.__html && (
                  <div className="bg-red-500 rounded py-2 px-3 text-white" dangerouslySetInnerHTML={error}>

                  </div>
              )
            } 
            
            <div>
              <label htmlFor="title" className="fontBold">
                Product Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="border border-gray-300 w-full p-2"
              />
            </div>
            
            <div>
              <label htmlFor="stock" className="fontBold">
                Product Stock
              </label>
              <input
                type="text"
                id="stock"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="border border-gray-300 w-full p-2"
              />
            </div>
            <div>
              <label htmlFor="details" className="fontBold">
                Product Details
              </label>
              <textarea
                id="details"
                name="details"
                rows="4"
                value={formData.details}
                onChange={handleChange}
                className="border border-gray-300 w-full p-2"
              ></textarea>
            </div>
            <div>
              <label htmlFor="price" className="fontBold">
                Product Price ₦
              </label>
              <input
                type="text"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="border border-gray-300 w-full p-2"
              />
            </div>
            <div>
              <label htmlFor="salePrice" className="fontBold">
                Sale Price ₦<span>(promo)</span>
              </label>
              <input
                type="text"
                id="salePrice"
                name="salePrice"
                value={formData.salePrice}
                onChange={handleChange}
                className="border border-gray-300 w-full p-2"
              />
            </div>
            <div className="border-b border-gray-300 p-4 fontBold">
              <h2 className="border-b border-gray-300 py-4 fontBold text-2xl">
                Upsell
              </h2>
              {!id && <div>
                <input
                  type="text"
                  value={upsell}
                  onChange={(e) => setUpsell(e.target.value)}
                  className="border border-gray-300 w-full p-2"
                />
              </div>}
              {id && <div>
                <input
                  type="text"
                  defaultValue={upsell}
                  onChange={(e) => setUpsell(e.target.value)}
                  className="border border-gray-300 w-full p-2"
                />
              </div>}
            </div>

            <div>
              <label htmlFor="schedule" className="fontBold block">
                Schedule
              </label>
              <button
                type="button"
                onClick={handleScheduleClick}
                className="text-blue-500 underline"
              >
                {showSchedule ? "Choose Date" : "Cancel Schedule"}
              </button>
              {showSchedule && (
                <div>
                  <label htmlFor="startDate">Start Date</label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="border border-gray-300 w-full p-2"
                  />
                  <label htmlFor="endDate">End Date</label>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    className="border border-gray-300 w-full p-2"
                  />
                </div>
              )}
            </div>

            {id && <Button text=" Update Product" />}
            {!id && <Button text=" Add Product" />}
          </form>
        </div>
      </div>

      <div className="sidebar bg-gray-200 w-1/4 border border-gray-300 h-[100vh] overflow-scroll">
        <div className="">
          <div className="border-b border-gray-300 p-4 fontBold">
            <h2 className="border-b border-gray-300 py-4 fontBold text-2xl">
              Publish
            </h2>
            <p>
              <span className="fontBold">Published</span> on August 20, 2023 at
              4:30pm
            </p>
          </div>
          {/* <button
            className="bg-black text-white  m-4 p-2 "
            onClick={handlePublish}
          >
            Submit
          </button>
          <button className="bg-black text-white  m-4 p-2">
            Save to draft
          </button> */}
        </div>
        <div className="border-b border-gray-300 p-4 fontBold">
  <h2 className="border-b border-gray-300 py-4 fontBold text-2xl">
    Gender
  </h2>
  {!id && <div>
    <label className="mr-2">
      <input
        type="radio"
        name="gender"
        value="male"
        checked={gender === "male"}
        onChange={handleGenderChange}
      />
      <span className="ml-1">Male</span>
    </label>
    <label className="mr-2">
      <input
        type="radio"
        name="gender"
        value="female"
        checked={gender === "female"}
        onChange={handleGenderChange}
      />
      <span className="ml-1">Female</span>
    </label>

    <label className="mr-2">
      <input
        type="radio"
        name="gender"
        value="children"
        checked={gender === "children"}
        onChange={handleGenderChange}
      />
      <span className="ml-1">Children</span>
    </label>
  </div>}

  {id && <div>
    <label className="mr-2">
      <input
        type="radio"
        name="gender"
        value="male"
        checked={getGender === "male"}
        onChange={handleUpdateGenderChange}
      />
      <span className="ml-1">Male</span>
    </label>
    <label className="mr-2">
      <input
        type="radio"
        name="gender"
        value="female"
        checked={getGender === "female"}
        onChange={handleUpdateGenderChange}
      />
      <span className="ml-1">Female</span>
    </label>

    <label className="mr-2">
      <input
        type="radio"
        name="gender"
        value="children"
        checked={getGender === "children"}
        onChange={handleUpdateGenderChange}
      />
      <span className="ml-1">Children</span>
    </label>
  </div>}
</div>



        <div className="border-b border-gray-300 p-4 fontBold">
          <h2 className="border-b border-gray-300 py-4 fontBold text-2xl">
            Sizes
          </h2>
          <div className="flex flex-wrap items-center border-b">
            <label className="mr-2 flex">
              <input
                type="checkbox"
                value="XL"
                checked={sizes.includes("XL")}
                onChange={(event) => {
                  const size = event.target.value;
                  if (sizes.includes(size)) {
                    setSizes(sizes.filter((s) => s !== size));
                  } else {
                    setSizes([...sizes, size]);
                  }
                }}
              />
              <span className="ml-1">XL</span>
            </label>
            <label className="mr-2 flex">
              <input
                type="checkbox"
                value="L"
                checked={sizes.includes("L")}
                onChange={(event) => {
                  const size = event.target.value;
                  if (sizes.includes(size)) {
                    setSizes(sizes.filter((s) => s !== size));
                  } else {
                    setSizes([...sizes, size]);
                  }
                }}
              />
              <span className="ml-1">L</span>
            </label>
            <label className="mr-2 flex">
              <input
                type="checkbox"
                value="M"
                checked={sizes.includes("M")}
                onChange={(event) => {
                  const size = event.target.value;
                  if (sizes.includes(size)) {
                    setSizes(sizes.filter((s) => s !== size));
                  } else {
                    setSizes([...sizes, size]);
                  }
                }}
              />
              <span className="ml-1">M</span>
            </label>
               <label className="mr-2 flex">
              <input
                type="checkbox"
                value="XS"
                checked={sizes.includes("XS")}
                onChange={(event) => {
                  const size = event.target.value;
                  if (sizes.includes(size)) {
                    setSizes(sizes.filter((s) => s !== size));
                  } else {
                    setSizes([...sizes, size]);
                  }
                }}
              />
              <span className="ml-1">XS</span>
            </label>
            <label className="mr-2 flex">
              <input
                type="checkbox"
                value="XXL"
                checked={sizes.includes("XXL")}
                onChange={(event) => {
                  const size = event.target.value;
                  if (sizes.includes(size)) {
                    setSizes(sizes.filter((s) => s !== size));
                  } else {
                    setSizes([...sizes, size]);
                  }
                }}
              />
              <span className="ml-1">XXL</span>
            </label>
            <label className="mr-2 flex">
              <input
                type="checkbox"
                value="S"
                checked={sizes.includes("S")}
                onChange={(event) => {
                  const size = event.target.value;
                  if (sizes.includes(size)) {
                    setSizes(sizes.filter((s) => s !== size));
                  } else {
                    setSizes([...sizes, size]);
                  }
                }}
              />
              <span className="ml-1">S</span>
            </label>
          
            <label className="mr-2 flex">
              <input
                type="checkbox"
                value="2XL"
                checked={sizes.includes("2XL")}
                onChange={(event) => {
                  const size = event.target.value;
                  if (sizes.includes(size)) {
                    setSizes(sizes.filter((s) => s !== size));
                  } else {
                    setSizes([...sizes, size]);
                  }
                }}
              />
              <span className="ml-1">2XL</span>
            </label>

            <label className="mr-2 flex">
              <input
                type="checkbox"
                value="4XL"
                checked={sizes.includes("4XL")}
                onChange={(event) => {
                  const size = event.target.value;
                  if (sizes.includes(size)) {
                    setSizes(sizes.filter((s) => s !== size));
                  } else {
                    setSizes([...sizes, size]);
                  }
                }}
              />
              <span className="ml-1">4XL</span>
            </label>
            <label className="mr-2 flex">
              <input
                type="checkbox"
                value="3XL"
                checked={sizes.includes("3XL")}
                onChange={(event) => {
                  const size = event.target.value;
                  if (sizes.includes(size)) {
                    setSizes(sizes.filter((s) => s !== size));
                  } else {
                    setSizes([...sizes, size]);
                  }
                }}
              />
              <span className="ml-1">3XL</span>
            </label>
          </div>
        </div>

        <div className="border-b border-gray-300 p-4 fontBold">
          <h2 className="border-b border-gray-300 py-4 fontBold text-2xl">
            Product Image
          </h2>
          <div>
            <label htmlFor="frontImage" className="fontBold">
              Front Image
            </label>
            <input
              type="file"
              id="frontImage"
              accept="image/*"
              onChange={(event) => {
                const file = event.target.files[0];
                const reader = new FileReader();
                reader.onload = () =>{
                  setFrontImage(file);
                  setFrontImage_Url(reader.result)

                  event.target.value = '';
                }
                reader.readAsDataURL(file);
              }}
            />
          </div>
          <div className="mt-4">
            <label htmlFor="alternateImage" className="fontBold">
              Alternate Image
            </label>
            <input
              type="file"
              id="alternateImage"
              accept="image/*"
              onChange={(event) => {
                const file = event.target.files[0];
                
                const reader = new FileReader();
                reader.onload = () =>{
                  setAlternateImage(file);
                  setAlternateImage_Url(reader.result)

                  event.target.value = '';
                }
                reader.readAsDataURL(file);
              }}
            />
          </div>
          <div className="image-preview flex my-4">
            {frontImage && (
              <img
                src={frontImage_Url}
                alt="Front Image"
                className="image h-14 mr-4 "
              />
            )}
            {alternateImage && (
              <img
                src={alternateImage_Url}
                alt="Alternate Image"
                className="image h-14"
              />
            )}
            {
              formData.frontImage && (
                <img
                src={formData.frontImage}
                alt="Front Image"
                className="image h-14 mr-4 "
              />
              )
            }
            {
              formData.alternateImage && (
                <img
                src={formData.alternateImage}
                alt="Front Image"
                className="image h-14 mr-4 "
              />
              )
            }
          </div>
        </div>

        <div className="border-b border-gray-300 p-4 fontBold">
          <h2 className="border-b border-gray-300 py-4 fontBold text-2xl">
            Product Gallery
          </h2>
          <div>
            <input
              type="file"
              multiple
              onChange={handleMultipleImagesChange}
            />
          </div>
          <div className="gallery-images flex">
          {!id && images.map((imageURL) => (
            <img key={imageURL} src={imageURL} alt="Uploaded" className="gallery-image h-16 mr-4 my-4" />
          ))}
          {id && imagesPre.map((imageURL) => (
            <img key={imageURL} src={imageURL} alt="Uploaded" className="gallery-image h-16 mr-4 my-4" />
          ))}
          </div>
        </div>

        <div className="border-b border-gray-300 p-4 fontBold">
          <h2 className="border-b border-gray-300 py-4 fontBold text-2xl">
            Product Categories
          </h2>
         <div className="p-2 overflow-scroll h-56"> 

         <label htmlFor="selectedCategory" className="fontBold">
      Select Category
    </label>
    {categories.map((category) => (
      <div key={category.id}>
        <input
          type="checkbox"
          defaultChecked={selectedCategory.includes(category.id)}
          onChange={handleCategoryChange}
          value={category.id}
        />
        <label> 
          {`${category.categories} -> ${category.menu} ${category.subMenu}` }
        </label>
      </div>
    ))}



         
     
        
        </div>
        </div>


        <div className="border-b border-gray-300 p-4 fontBold">
          <h2 className="border-b border-gray-300 py-4 fontBold text-2xl">
            Product Colors
          </h2>
         <div className="p-2 overflow-scroll h-56"> 

         <label htmlFor="selectedCategory" className="fontBold">
      Select Color
    </label>
    {savedColors.map((color) => (
      <div key={color.id}>
        <input
          type="checkbox"
          defaultChecked={selectedColor.includes(color.id)}
          onChange={handleColorChange}
          value={color.id}
        />
        <label> 
          {`${color.color}` }
        </label>
      </div>
    ))}



         
     
        
        </div>
        </div>
        
        <div className="border-b border-gray-300 p-4 fontBold">
          <h2 className="border-b border-gray-300 py-4 fontBold text-2xl">
            Product Tags
          </h2>
          <label className="fontBold">Tags</label>
          <div>
            <input
              type="text"
              className="border border-black"
              value={formData.tag}
              name="tag"  
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      {/* Category Modal */}
      {showModal && (
        <div className="modal-overlay p-4">
          <div className="modal">
            <h2 className="fontBold text-2xl">Create New Category</h2>
            {
              notification && (
                <div className="w-[300px] py-2 px-3 text-white rounded bg-green-500 fixed right-4 bottom-4 z-50 animate-fade-in-down">
                  {notification}
                </div>)
            }

            <form method="post" onSubmit={handleNewCategorySubmit}>
              <div>
                <label htmlFor="newCategory" className="fontBold">
                  Category Name
                </label>
                <input
                  type="text"
                  id="newCategory"
                  name="categories"
                  ref={categoryRef}
                  className="border border-black block"
                />
              </div>
              <div className="modal-buttons">
                <button type="submit" className="bg-black text-white mr-4 p-2">
                  Add Category
                </button>
                <button
                  className="bg-black text-white m-4 p-2"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {
        notification && (
            <div className="w-[300px] py-2 px-3 text-white rounded bg-green-500 fixed right-4 bottom-4 z-50 animate-fade-in-down">
            {notification}
        </div>)
      }
    </div>


  );
}
