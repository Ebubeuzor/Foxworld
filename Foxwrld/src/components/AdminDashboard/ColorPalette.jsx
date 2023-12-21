import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Button from "../Button";
import axiosClient from "../../axoisClient";
import { useStateContext } from "../../context/ContextProvider";

export default function ColorPalette() {
  const {notification,setNotification,token,setToken,setUser,user} = useStateContext();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newMenuTitle, setNewMenuTitle] = useState("");
  const [id, setId] = useState("");
  const [savedColors, setSavedColors] = useState([]);

  const [editColorModal, setEditColorModal] = useState(false);
  const [editingColor, setEditingColor] = useState(null);
  const [editedColorName, setEditedColorName] = useState("");
  
  
  if(!token){
    return <Navigate to="/Login"/>
  }

  
  if (user.admin == null) {
    return <Navigate to="/"/>
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

  const logOut = (ev) => {
    ev.preventDefault();
    
    axiosClient.get('/logout')
    .then((res) =>{
      setUser({});
      setToken(null);
      location.reload();
    });
  }







  const getMenu = () => {
    axiosClient.get('/menu')
      .then(({ data }) => {
        // console.log(data);
  
        const transformedData = data.data.map(menuItem => ({
          id: menuItem.id,
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
        setEditContent(transformedData);
      })
      .catch((e) => console.error(e));
  }

  useEffect(() => {
    getMenu()
  }, []);
  
  
  

 

  
  


 


  const openCreateModal = () => {
    // console.log("Open create modal clicked");
    setShowCreateModal(true);
  };

  const closeCreateModal = () => {
    setShowCreateModal(false);
  
  };

  const getColors = () => {
    axiosClient.get('/colors')
    .then(({data}) => {
      setSavedColors(data.data);
    }).catch(e => console.log(e))
  }

  useEffect(() => getColors(),[]);

  const handleNewColorSubmit = (e) => {
    e.preventDefault();

    // Create an object with the new color data from the form
    const newColorData = {
      color: newMenuTitle,
      // Add other properties if needed
    };

    axiosClient.post('/colors',newColorData)
    .then((data) => {
      setNotification("New Color has been created");
      closeCreateModal();
      getColors();
    })

  };

  const handleEditColorSubmit = (e) => {
    e.preventDefault();

    console.log(editingColor);

    const data = {
      'color' : editedColorName
    };

    axiosClient.put(`/colors/${editingColor}`,data)
    .then(() => {
      setNotification("Color has been updated");
      getColors();
    })
    setEditColorModal(false);
  };

  const handleEditColor = (color) => {
    axiosClient.get(`/colors/${color}`)
    .then(({data}) => {
      console.log(data.data);
      setEditedColorName(data.data.color);
    }).catch(e => console.log(e));

    setEditingColor(color);
    setEditColorModal(true);
  };
  
  const handleDeleteColor = (color) => {
    axiosClient.delete(`/colors/${color}`)
    .then(() => {
      setNotification("Color has been deleted")
      getColors();
    })
  };
  
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
            <div className="p-4 bg-slate-400 border-b">
              <Link to="/ColorPalette" className="text-white  ">
                <div>ColorPalette</div>
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
            <h1 className="font-bold text-lg fontBold">Edit Menu </h1> &nbsp;
            <span className="bg-slate-400 w-5 h-5 rounded-full flex items-center justify-center text-white">
              <span>&#63;</span>
            </span>
          </div>
          <p className="text-sm text-slate-400">
            You've reached the editing dashboard homepage, where you can modify
            and personalize your dashboard experience
          </p>
            {
              notification && (
                <div className="w-[300px] py-2 px-3 text-white rounded bg-green-500 fixed right-4 bottom-4 z-50 animate-fade-in-down">
                  {notification}
                </div>)
            }
        </header>
        <div className="main-content flex-1 p-4">
          <div onClick={openCreateModal}>
            <Button text="Create Color" />
          </div>

          <div className="mt-4">
        <h2 className="font-bold text-lg mb-2">Saved Colors</h2>

        {savedColors.map((color, index) => (
          <div key={color.id} className="mb-2">
            <span className="mr-2">{color.color}</span>
            {/* Step 4: Add an edit button or functionality */}
            <button
              onClick={() => handleEditColor(color.id)}
              className="bg-black text-white px-2 py-1 mr-2"
            >
              Edit
            </button>
            {/* Step 5: Add a delete button and functionality */}
            <button
              onClick={() => handleDeleteColor(color.id)}
              className="bg-red-500 text-white px-2 py-1"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      
        </div>
      </div>
      {showCreateModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-overlay">
            <form
              className="bg-white p-4 rounded-lg shadow-md overflow-scroll h-[70vh] w-[70vh]"
              onSubmit={handleNewColorSubmit}
            >
              {/* Add input fields for the new color form */}
              <label htmlFor="newColorTitle" className="block mb-2">Color Name:</label>
              <input
                type="text"
                id="newColorTitle"
                value={newMenuTitle}
                onChange={(e) => setNewMenuTitle(e.target.value)}
                className="border p-2 mb-4 w-full"
                required
              />

              {/* Add other input fields as needed for additional color properties */}
              
              <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 mr-2"
                >
                  Create Color
                </button>
                <button
                  type="button"
                  className="bg-gray-300 text-gray-700 px-4 py-2"
                  onClick={closeCreateModal}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
          
        </div>
      )}
       {editColorModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-overlay">
            <form
              className="bg-white p-4 rounded-lg shadow-md overflow-scroll h-[70vh] w-[70vh]"
              onSubmit={handleEditColorSubmit}
            >
              {/* Add input fields for editing the color */}
              <label htmlFor="editedColorName" className="block mb-2">
                Edited Color Name:
              </label>
              <input
                type="text"
                id="editedColorName"
                value={editedColorName}
                onChange={(e) => setEditedColorName(e.target.value)}
                className="border p-2 mb-4 w-full"
                required
              />

              {/* Add other input fields as needed for additional color properties */}
              
              <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 mr-2"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  className="bg-gray-300 text-gray-700 px-4 py-2"
                  onClick={() => setEditColorModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}


    </div>
  );
}
