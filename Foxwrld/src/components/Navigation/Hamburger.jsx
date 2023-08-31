import React, { useEffect, useState } from "react";
import { Twirl as Hamburger } from "hamburger-react";
import { Link } from "react-router-dom";
import axiosClient from "../../axoisClient";
import { useStateContext } from "../../context/ContextProvider";

const HamburgerMenu = ({ color, cartCount }) => {
  const [loading,setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentMenu, setCurrentMenu] = useState("main");
  const [editContent, setEditContent] = useState([]);
  const [title, setTitle] = useState("");
  const {setUser,setToken,user} = useStateContext();
  
const logOut = (ev) => {
  ev.preventDefault();
  
  axiosClient.get('/logout')
  .then((res) =>{
    setUser({});
    setToken(null);
    location.reload();
  });
}

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
        }));
  
        // console.log("Transformed Data:", transformedData);
  
        // Log the transformed data in JSON format
        // console.log("Transformed Data (JSON):", JSON.stringify(transformedData, null, 2));
        
        setEditContent(transformedData);
      })
      .catch((e) => console.error(e));
  }
  
  useEffect(() => {
    getMenu();
  }, []);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navigateToSubMenu = (menu) => {
    setCurrentMenu(menu);
    setTitle(menu);
  };

  const navigateBack = () => {
    setCurrentMenu("main");
  };

  

  const renderMenuItems = () => {
    switch (currentMenu) {
      case "main":
        return (
          <ul className="pt-24 px-3">
            {editContent.map((menu) => (
              <li
                key={menu.title}
                onClick={() => navigateToSubMenu(menu.title)}
                className="my-4"
              >
                <span className="cursor-pointer">{menu.title}</span>
              </li>
            ))}
          </ul>
        );
        default:
      const selectedMenu = editContent.find((menu) => menu.title === currentMenu);
      if (selectedMenu) {
        const itemGroups = {};

        selectedMenu.subtitles.forEach((submenu) => {
          const groupName = submenu.items[0].text;
          if (!itemGroups[groupName]) {
            itemGroups[groupName] = [];
          }
          itemGroups[groupName].push(...submenu.items.map(item => submenu.text));
        });

        return (
          <ul className="pt-24 px-3">
            <li>
              <span className="cursor-pointer" onClick={navigateBack}>
                &#8592;
              </span>
            </li>
            {Object.keys(itemGroups).map((groupName) => (
              <li key={groupName} className="my-4">
                <h3 className="text-[14px]">{groupName}</h3>
                <ul>
                  {itemGroups[groupName].map((itemText) => (
                    <li key={itemText}>
                      <Link
                        to={`/NewArrivalsMenu/?menu=${encodeURIComponent(
                          title
                        )}&submenu=${encodeURIComponent(
                          itemText
                          )}&item=${encodeURIComponent(
                          groupName
                        )}`}
                        className="text-[12px] fontThin"
                      >
                        {itemText}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        );
      }
      return null;
  }
  };

  return (
    <div className="hamburger-menu mobile hidden">
      <div
        className={`menu-icon absolute z-50 flex items-center justify-between w-full px-3 ${
          isOpen ? "text-black" : ""
        }`}
      >
        <div className="logo">
          <Link
            to="/"
            className={`fontBold text-2xl ${
              isOpen ? "text-black" : `text-${color}`
            }`}
          >
            Foxwrld
          </Link>
        </div>
        <div>
          <Link to="/signup" className="px-4 sm:px-8 py-6">
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
                d="M11.98 8.99c1.6568 0 3-1.3432 3-3 0-1.6569-1.3432-3-3-3-1.6569 0-3 1.3431-3 3 0 1.6568 1.3431 3 3 3Z"
              ></path>
              <path
                fill={color}
                d="M11.97 13.23a8.3597 8.3597 0 0 1 8.32 7H3.7a8.5996 8.5996 0 0 1 8.28-7m0-1.5a10.1597 10.1597 0 0 0-10 10h19.99c-.23-5.17-4-10-10-10h.01Z"
              ></path>
            </svg>
          </Link>
        </div>
        <div>
              <Link>

              
  <Link onClick={logOut}>
    <button className={`text-${color}`}>
      Logout
    </button>
  </Link>
  


              </Link>
          </div>
  {user.admin === "Admin" &&
              <Link to="/Order" className=" text-white">
                Admin
              </Link>
          }
        <div className="relative">
          <Link to="/Checkout">
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
            {cartCount > 0 && (
              <span className="absolute bottom-4 -right-1  text-center p-2 h-4 w-4 rounded-full fontBold text-xs px-1 py-0.5">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
        <div className="hamburger-button z-20">
          <Hamburger
            toggled={isOpen}
            toggle={toggleMenu}
            size={24}
            duration={0.6}
            color={isOpen ? "black" : color}
          />
        </div>

        <div></div>
      </div>

      {isOpen && (
        <div className="menu-items bg-white fixed top-0 right-0 h-screen w-full z-10">
          {renderMenuItems()}
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;
