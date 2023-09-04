import React, { useState, useRef, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import CartProducts from "../Cart/CartProducts";
import { useStateContext } from "../../context/ContextProvider";
import axiosClient from "../../axoisClient";

export default function Header({ color, cartCount }) {
  const [loading,setLoading] = useState(false);
  const {token,inCart,setIncart,setUser,setToken,user} = useStateContext();
  const [editContent, setEditContent] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [item, setItem] = useState("");

  useEffect(() => {
    axiosClient.get('/userCart')
    .then(({data}) => {
      setIncart(data.data)
    }).catch((e) => {
      // console.log(e);
    })
  },[])

  // if(!token){
  //   return <Navigate to="/Login"/>
  // }
  
  const userData = () => {
    axiosClient.get('/user')
    .then(({data}) => {
      setUser(data)
    })
  }

  useEffect(() => {
    userData()
  }, []);

  const getMenu = () => {
    setLoading(true)
    axiosClient.get('/menu')
      .then(({ data }) => {
        // console.log(data);
  
        const transformedData = data.data.map(menuItem => ({
          title: menuItem.Title,
          subtitles: menuItem.Categories.map(category => ({
            text: category.categories,
            items: [
              {
                text: category.subMenu,
                link: null // You might need to handle this part based on your actual data
              }
            ]
          }))
        })
        );
  
        // console.log("Transformed Data:", transformedData);
  
        // Log the transformed data in JSON format
        // console.log("Transformed Data (JSON):", JSON.stringify(transformedData, null, 2));
        
        setEditContent(transformedData);
        setLoading(false);
      })
      .catch((e) => console.error(e));
  }
  

  useEffect(() => {
    getMenu();
  }, []);
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNewInDropdownOpen, setIsNewInDropdownOpen] = useState(false);
  const [isWomenDropdown, setIsWomenDropdown] = useState(false);
  const [isMenDropdown, setIsMenDropdown] = useState(false);

  const dropdownTimeoutRef = useRef(null);
  const newInDropdownTimeoutRef = useRef(null);




  const handleNewInDropdownToggle = () => {
    clearTimeout(newInDropdownTimeoutRef.current);
    setIsNewInDropdownOpen(true);
  };

  const handleNewInDropdownClose = () => {
    newInDropdownTimeoutRef.current = setTimeout(() => {
      setIsNewInDropdownOpen(false);
    }, 300);
  };

  const handleNewInDropdownEnter = () => {
    clearTimeout(newInDropdownTimeoutRef.current);
  };

  const handleWomenDropdownToggle = () => {
    clearTimeout(dropdownTimeoutRef.current);
    setIsWomenDropdown(true);
  };

  const handleWomenDropdownClose = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setIsWomenDropdown(false);
    }, 300);
  };

  const handleWomenDropdownEnter = () => {
    clearTimeout(dropdownTimeoutRef.current);
  };

  const handleMenDropdownToggle = () => {
    clearTimeout(dropdownTimeoutRef.current);
    setIsMenDropdown(true);
  };

  const handleMenDropdownClose = () => {
    clearTimeout(dropdownTimeoutRef.current);
    setIsMenDropdown(false);
  };

  const handleMenDropdownEnter = () => {
    clearTimeout(dropdownTimeoutRef.current);
  };

  const handleDropdownToggle = (menuId) => {
    clearTimeout(dropdownTimeoutRef.current);

    setIsDropdownOpen(menuId);
  };

  const handleDropdownEnter = (menuId) => {
    setIsDropdownOpen(menuId);
  };

  const handleDropdownClose = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 500); // Adjust the timeout value as needed
  };



  const handleDropdownCart = () => {
    clearTimeout(dropdownTimeoutRef.current);
    setCartCount((prevCount) => prevCount + 1);
  };

  const [isCartDropdownOpen, setIsCartDropdownOpen] = useState(false);

const handleCartDropdownToggle = () => {
  setIsCartDropdownOpen(!isCartDropdownOpen);
};

const handleCartDropdownClose = () => {
  setIsCartDropdownOpen(false);
};

const logOut = (ev) => {
  ev.preventDefault();
  
  axiosClient.get('/logout')
  .then((res) =>{
    setUser({});
    setToken(null);
    location.reload();
  });
}

  return (
    <div className="relative">
    {isDropdownOpen || isNewInDropdownOpen || isWomenDropdown || isMenDropdown ? (
      <div className="fixed inset-0 bg-black opacity-50 " />
    ) : null}
    <div className="  hide px-8 absolute left-0 right-0 z-30">
      <div className="flex justify-between items-center relative w-full h-20 max-w-[256rem] ">
        <Link
          to="/"
          className={`relative items-center text-${color} z-30 text-3xl font-sans font-extrabold`}
        >
          Foxwrld
        </Link>
        <header className={`text-${color}`}>
            <ul className="flex">
              {editContent.map((menu, index) => (
                <li
                  key={index}
                  className="group"
                  onMouseEnter={() => handleDropdownToggle(index)}
                  onMouseLeave={handleDropdownClose}
                >
                  <Link
                    to="#"
                    className="px-4 sm:px-8 py-6 font-bold uppercase"
                  >
                    {menu.title}
                  </Link>
                  {isDropdownOpen === index && (
                    <div
                      className="absolute left-0 top-full w-full bg-white h-[80vh] p-10 flex "
                      onMouseEnter={() => handleDropdownEnter(index)}
                      onMouseLeave={handleDropdownClose}
                    >
                      {menu.subtitles && menu.subtitles.length > 0 ? (
                        <section key={menu.title} className="my-4 mr-16">
                          <ul className="flex  text-black">
                            {menu.subtitles
                              .reduce((acc, subtitle) => {
                                const existingGroupIndex = acc.findIndex(
                                  (group) =>
                                    group.text === subtitle.items[0].text
                                );
                                if (existingGroupIndex === -1) {
                                  acc.push({
                                    text: subtitle.items[0].text,
                                    items: [subtitle],
                                  });
                                } else {
                                  acc[existingGroupIndex].items.push(subtitle);
                                }
                                return acc;
                              }, [])
                              .map((itemGroup) => (
                                <React.Fragment key={itemGroup.text}>
                               <div className="mr-10">
                               <h1 className="text-black font-extrabold uppercase mb-1 text-[12px] font-bold">
                                    {itemGroup.text}
                                  </h1>
                                  <ul className=" text-black">
                                    {itemGroup.items.map((submenu) => (
                                  <li
                                  key={submenu.text}
                                  className="text-black"
                                  onClick={() => {
                                    setSelectedSubcategory(submenu);
                                    setTitle(menu.title);
                                    setSubtitle(submenu.text);
                                    setItem(submenu.items[0].text);
                                    
                                    location.reload();
                                    // console.log("Selected Subcategory:", {
                                    //   title: menu.title,
                                    //   subtitle: submenu.text,
                                    //   item: submenu.items[0].text
                                    // });
                                  }}
                                >
                                  <Link
                                    to={`/NewArrivalsMenu/?menu=${encodeURIComponent(
                                      menu.title
                                    )}&submenu=${encodeURIComponent(
                                      submenu.text
                                    )}&item=${encodeURIComponent(
                                      submenu.items[0].text
                                    )}`}
                                    className="text-[12px] fontThin"
                                  >
                                    {submenu.text}
                                  </Link>
                                </li>
                                    ))}
                                  </ul>
                               </div>
                                </React.Fragment>
                              ))}
                          </ul>
                        </section>
                      ) : (
                        <div>No subcategories available</div>
                      )}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </header>
        <ul className="flex whitespace-nowrap h-full relative items-center space-x-3">
          <li>
          {token && <Link to="/Account">
          <button className="px-4 sm:px-8 py-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke={color}
              >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>

            </button>
          </Link>}
          </li>
          <li>
            {token && <Link onClick={logOut}>
              <button className={`text-${color}`}>
                Logout
              </button>
            </Link>}
            {!token && <Link to={"/Login"}>
              <button className={`text-${color}`}>
                SIGN IN
              </button>
            </Link>}
          </li>


          {user.admin === "Admin" &&
            <li>
              <Link to="/Order" className="px-4 sm:px-8 py-6 text-white">
                Admin
              </Link>
            </li>
          }
          <li className="relative">
          <a
  href="#"
  className="px-4 sm:px-8 py-6 relative"
  onClick={handleCartDropdownToggle}
>
  <svg
    role="img"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      fill="none"
      stroke={color}
      d="M20.9999 8.99h-18v12h18v-12ZM15.97 8.97v-2a4.0002 4.0002 0 0 0-4-4 4 4 0 0 0-4 4v2"
    ></path>
  </svg>
  {inCart.length > 0 && (
    <span className="absolute bottom-8 -right-1 z-40 text-center p-2 h-4 w-4 rounded-full fontBold text-xs px-1 py-0.5">
      {inCart.length}
    </span>
  )}
    {isCartDropdownOpen && (
                <div
                  className="absolute top-full right-0 bg-white mt-2 p-2"
                  onMouseLeave={handleCartDropdownClose}
                >
                  {
                    loading && (<div className="flex justify-center items-center mt-10">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm12 0a8 8 0 100-16v3a5 5 0 010 10v3a8 8 0 000 16 4 4 0 110-8 4 4 0 004-4v-3a5 5 0 010-10v-3z"></path>
                    </svg>
                    <span>Loading...</span>
                  </div>)
                  }
                  {!loading && inCart && <CartProducts product={inCart}/>}
                </div>
              )}
</a>

          </li>
        </ul>
      </div>
    </div>
    </div>
  );
}
