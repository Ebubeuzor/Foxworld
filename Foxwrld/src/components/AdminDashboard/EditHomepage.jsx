import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import ImageUpload from "../../assets/ImageUpload.png";
import Button from "../Button";
import axiosClient from "../../axoisClient";
import { useStateContext } from "../../context/ContextProvider";


export default function EditHomepage() {
  const [homevideo, setHomevideo] = useState(null);
  const [homevideo_Url, setHomevideo_Url] = useState(null);
  const [Section1Title, setSection1Title] = useState("");
  const [error, setError] = useState({__html: ""});
  
  const {notification,setNotification,token,setToken,setUser,user} = useStateContext();
  const [categories, setCategories] = useState([]);
  const [Section2aCategory, setSection2aCategory] = useState(null);
  const [Section2bCategory, setSection2bCategory] = useState(null);
  const [Section1Image, setSection1Image] = useState(null);
  const [Section2aImage, setSection2aImage] = useState(null);
  const [Section2bImage, setSection2bImage] = useState(null);
  const [Section1Image_Url, setSection1Image_Url] = useState(null);
  const [Section2aImage_Url, setSection2aImage_Url] = useState(null);
  const [Section2bImage_Url, setSection2bImage_Url] = useState(null);

  
  if(!token){
    return <Navigate to="/Login"/>
  }
  
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
  const handleVideoSubmit = (event) => {
    event.preventDefault();
    const formData = {
      homevideo,
      homevideo_Url
    };

    formData.homevideo = formData.homevideo_Url;

    axiosClient.post('/homepage',formData)
    .then(({data}) => {
      console.log(data);
      setNotification("Your homepage has been modified");
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
  };

  
  const userData = () => {
    axiosClient.get('/user')
    .then(({data}) => {
      setUser(data)
    })
  }

  useEffect(() => {
    userData()
  }, []);

  const handleCategorySelect2a = (event) => {
    const selectedCategory = event.target.value;
    setSection2aCategory(selectedCategory);
  };

  const handleCategorySelect2b = (event) => {
    const selectedCategory = event.target.value;
    setSection2bCategory(selectedCategory);
  };

  const getCategory = () => {
    axiosClient.get('/category')
    .then(({data}) => {
      setCategories(data.data)
    });
  }

  useEffect(()=>{
    getCategory()
  },[])

  const handleCategorySubmit = (event) => {
    event.preventDefault();
    const formData = {
      Section2aCategory,
      Section2aImage,
      Section2aImage_Url,
    };
    
    formData.Section2aImage = formData.Section2aImage_Url;

    axiosClient.post('/homepage',formData)
    .then(({data}) => {
      console.log(data);
      setNotification("Your homepage has been modified");
    })
    .catch((error) => {
      console.log(error);
    })
  };

  const handleCategorySubmit2 = (event) => {
    event.preventDefault();
    const formData = {
      Section2bCategory,
      Section2bImage,
      Section2bImage_Url,
    };
    
    formData.Section2bImage = formData.Section2bImage_Url;

    axiosClient.post('/homepage',formData)
    .then(({data}) => {
      console.log(data);
      setNotification("Your homepage has been modified");
    })
    .catch((error) => {
      console.log(error);
    })
  };

  const handleTitleImageSubmit = (event) => {
    event.preventDefault();
    const formData = {
      Section1Title,
      Section1Image,
      Section1Image_Url,
    };
    
    formData.Section1Image = formData.Section1Image_Url;

    axiosClient.post('/homepage',formData)
    .then(({data}) => {
      console.log(data);
      setNotification("Your homepage has been modified");
    })
    .catch((error) => {
      console.log(error);
    })
  };

  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    
    const reader = new FileReader();
    reader.onload = () =>{
      setHomevideo(file);
      setHomevideo_Url(reader.result)

      event.target.value = '';
    }
    reader.readAsDataURL(file);
  };

  const handleTitleChange = (event) => {
    setSection1Title(event.target.value);
  };


  const handleImageUpload1 = (event) => {
    const file = event.target.files[0];
    
    const reader = new FileReader();
    reader.onload = () =>{
      setSection1Image(file);
      setSection1Image_Url(reader.result)

      event.target.value = '';
    }
    reader.readAsDataURL(file);
  };

  const handleImageUpload2 = (event) => {
    const file = event.target.files[0];
    
    const reader = new FileReader();
    reader.onload = () =>{
      setSection2aImage(file);
      setSection2aImage_Url(reader.result)

      event.target.value = '';
    }
    reader.readAsDataURL(file);
  };

  const handleImageUpload3 = (event) => {
    const file = event.target.files[0];
    
    const reader = new FileReader();
    reader.onload = () =>{
      setSection2bImage(file);
      setSection2bImage_Url(reader.result)

      event.target.value = '';
    }
    reader.readAsDataURL(file);
  };

  
  return (
    <div className="flex">
      <div className="sidebar bg-gray-200 w-1/4 border border-gray-300 h-[100vh]">
        <ul className="px-4">
          <li>
            <div className="fontBold">Welcome Admin</div>
          </li>
          <li>
            <div className="p-4 bg-slate-400 border-b">
              <Link to="/EditHomepage" className="text-white  ">
                <div>EditHomepage</div>
              </Link>
            </div>
            <div className="p-4 hover:bg-slate-300 border-b">
              <Link to="/MenuEditor" className="text-black  ">
                <div>MenuEditor</div>
              </Link>
            </div>
            <div className="p-4  border-b hover:bg-slate-300 ">
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
            <div className="p-4  hover:bg-slate-300 border-b">
              <Link to="/Products" className="text-black ">
                <div>Products</div>
              </Link>
            </div>
          </li>
          <li>
            <div className="p-4  hover:bg-slate-300 border-b">
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
      <div className="main-content flex-1 bg-white h-[100vh] overflow-scroll p-4">
        <header>
          <div className="flex my-4 items-center">
            <h1 className="font-bold text-lg fontBold">Edit Homepage </h1>{" "}
            &nbsp;
            <span className="bg-slate-400 w-5 h-5 rounded-full flex items-center justify-center text-white">
              <span>&#63;</span>
            </span>
          </div>
          <p className="text-sm text-slate-400">
          Personalize and customize your website's homepage to make it uniquely yours.

          </p>
        </header>
        <div className="main-content flex-1 p-4">
          {/* Video upload */}
          <form onSubmit={handleVideoSubmit}>
            
            {
              error.__html && (
                <div className="bg-red-500 rounded py-2 px-3 text-white" dangerouslySetInnerHTML={error}>

                </div>
              )
            } 
            
            <div className="my-4 bg-slate-200 rounded-lg shadow-lg p-4">
              <label htmlFor="videoUpload" className="font-bold block">
                <div className="bg-white border border-gray-300 p-2 mt-2 text-center ">
                  {!homevideo && (
                    <span className="text-slate-500 font-bold text-sm text-center">
                       Upload a video to showcase on your homepage. 

{" "}
                      <img src={ImageUpload} className="w-32 m-auto" alt="" />
                    </span>
                  )}
                  {homevideo && (
                    <video controls>
                      <source
                        src={homevideo_Url}
                        type="video/*"
                      />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
              </label>
              <input
                type="file"
                id="videoUpload"
                accept="video/*"
                onChange={(event) => handleVideoUpload(event)}
                className="hidden"
              />
<Button text="Submit Video"/>
             
            </div>
          </form>

          {/* Title and image */}
          <form onSubmit={handleTitleImageSubmit}>
            <section className="in-page__cell bg-slate-200 rounded-lg shadow-lg p-4">
              <h1 className="fontBold">Section 1</h1>
              <div className="my-4">
                <label htmlFor="titleInput" className="font-bold text-sm flex">
                  Title &nbsp;
                  <span className="bg-slate-400 w-5 h-5 rounded-full flex items-center justify-center text-white pb-1">
                    <span>&#161;</span>
                  </span>
                </label>

                <input
                  type="text"
                  id="titleInput"
                  value={Section1Title}
                  placeholder="Enter a product title for the homepage section. Keep the title within 20 characters."
                  onChange={handleTitleChange}
                  maxLength={20}
                  className="border border-gray-300 p-2 mt-2 w-full"
                />
                <p className="text-sm text-slate-400">
                  Do not exceed 20 characters when entering the product title
                </p>
              </div>
              <div className="my-4">
                <label htmlFor="imageUpload" className="font-bold block">
                  <div className="bg-white border border-gray-300 p-2 mt-2  text-center">
                    {!Section1Image && (
                      <span className="text-slate-500 font-bold text-sm">
                      Upload an image{" "}
                        <img src={ImageUpload} className="w-32 m-auto" alt="" />
                      </span>
                    )}

                    {Section1Image && (
                      <img
                        src={Section1Image_Url}
                        className="w-32"
                        alt="Uploaded"
                      />
                    )}
                  </div>
                </label>
                <input
                  type="file"
                  id="imageUpload"
                  accept="image/*"
                  onChange={(event) => handleImageUpload1(event)}
                  className="hidden"
                />

               <Button text="Submit Title and Image"/>
              </div>
            </section>
          </form>

          <form onSubmit={handleCategorySubmit}>
            <section className="in-page__cell bg-slate-200 rounded-lg shadow-lg p-4 my-4">
              <div>
                <h1 className="fontBold">Section 2a</h1>
                <div className="my-4">
                  <label htmlFor="categorySelect" className="fontBold text-sm flex mb-4">
                    Categories &nbsp;
                    <span className="bg-slate-400 w-5 h-5 rounded-full flex items-center justify-center text-white pb-1">
                    <span>&#161;</span>
                  </span>
                  </label>
                  <select
                    id="categorySelect"
                    onChange={handleCategorySelect2a}
                    value={Section2aCategory || ''}
                    className="px-2 py-1 border border-gray-300 rounded"
                  >
                    <option>Select Categories</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.categories} >{`${category.categories}  -> ${category.menu} ${category.subMenu}`}</option>
                    ))
                    }
                  </select>
                </div>
                <div className="my-4">
                  <label
                    htmlFor="categoryImageUpload2"
                    className="font-bold block"
                  >
                    <div className="bg-white border border-gray-300 p-2 mt-2 w-full text-center">
                      {!Section2aImage && (
                        <span className="text-slate-500 font-bold text-sm text-center">
                        Upload an image{" "}
                          <img src={ImageUpload} className="w-32 m-auto" alt="" />
                        </span>
                      )}{" "}
                      {Section2aImage && (
                        <img
                          src={Section2aImage_Url}
                          alt="Uploaded"
                          className="w-32"
                        />
                      )}
                    </div>
                  </label>
                  <input
                    type="file"
                    id="categoryImageUpload2"
                    accept="image/*"
                    onChange={(event) => handleImageUpload2(event)}
                    className="hidden"
                  />

                <Button text=" Submit Category"/>
                </div>
              </div>
            </section>
          </form>

          <form onSubmit={handleCategorySubmit2}>
            <section className="in-page__cell bg-slate-200 rounded-lg shadow-lg p-4 my-4">
              <div>
                <h1 className="fontBold">Section 2b</h1>
                <div className="my-4">
                  <label htmlFor="categorySelect" className="fontBold text-sm flex mb-4">
                    Categories &nbsp; <span className="bg-slate-400 w-5 h-5 rounded-full flex items-center justify-center text-white pb-1">
                    <span>&#161;</span>
                  </span>
                  </label>
                  <select
                    id="categorySelect"
                    onChange={handleCategorySelect2b}
                    value={Section2bCategory || ''}
                    className="px-2 py-1 border border-gray-300 rounded"
                  >
                    <option>Select Categories</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.categories} >{`${category.categories} -> ${category.menu} ${category.subMenu}`}</option>
                    ))
                    }

                  </select>
                </div>
                <div className="my-4">
                  <label
                    htmlFor="categoryImageUpload3"
                    className="font-bold block"
                  >
                    <div className="bg-white border border-gray-300 p-2 mt-2 w-full text-center">
                      {!Section2bImage && (
                        <span className="text-slate-500 font-bold text-sm">
                          Upload an image.{" "}
                          <img src={ImageUpload} className="w-32 m-auto" alt="" />
                        </span>
                      )}{" "}
                      {Section2bImage && (
                        <img
                          src={Section2bImage_Url}
                          alt="Uploaded"
                          className="w-32"
                        />
                      )}
                    </div>
                  </label>
                  <input
                    type="file"
                    id="categoryImageUpload3"
                    accept="image/*"
                    onChange={(event) => handleImageUpload3(event)}
                    className="hidden"
                  />

                 <Button text=" Submit Category"/>
                </div>
              </div>
            </section>
          </form>
        </div>
      </div>

      
      {
        notification && (
            <div className="w-[300px] py-2 px-3 text-white rounded bg-green-500 fixed right-4 bottom-4 z-50 animate-fade-in-down">
            {notification}
        </div>)
      }
    </div>
  );
}
