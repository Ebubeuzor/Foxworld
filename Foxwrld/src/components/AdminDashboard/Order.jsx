import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Button from "../Button";
import Pagination from "../Navigation/Pagination";
import axiosClient from "../../axoisClient";
import { useStateContext } from "../../context/ContextProvider";

export default function Order() {
  const [loading,setLoading] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedDataCheck, setSelectedDataCheck] = useState(false);
  const [meta,setMeta] = useState({});
  const [orders,setOrders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editContent, setEditContent] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [selectedMenu, setSelectedMenu] = useState("");
  const [orderDate, setOrderDate] = useState("");

  
  const {token,setToken,setUser} = useStateContext();
  
  if(!token){
    return <Navigate to="/Login"/>
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

  const getMenu = () => {
    axiosClient.get('/menu')
      .then(({ data }) => {
        console.log(data);

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

        console.log("Transformed Data:", transformedData);
        setEditContent(transformedData);
      })
      .catch((e) => console.error(e));
  }

  

  useEffect(() => {
    getMenu()
  }, []);

  const getCategory = () => {
    setLoading(true);
    axiosClient.get('/category')
    .then(({data}) => {
      console.log(data.data);
      setCategories(data.data)
      setLoading(false);
    });
  }
  
  const checkForData = (ev) => {
    ev.preventDefault();

    const data = {
      title: selectedMenu,
      salePrice: selectedPriceRange,
      orderStatus: selectedStatus,
      created_at: orderDate,
    };

    console.log(data);
    axiosClient.post("/filterOrders",data)
    .then(({data}) => {
      console.log(data);
      setSelectedData(data.data);
      setSelectedDataCheck(true);
    })
    .catch((e) => {
      console.log(e);
    })
  }

  useEffect(()=>{
    getCategory()
  },[])

  const getOrders = (url) => {
    url = url || '/mainorder'
    setLoading(true)
    axiosClient.get(url)
    .then(({data}) => {
      console.log(data.data);
      setMeta(data.meta);
      setOrders(data.data);
      setLoading(false);
    });
  }
  useEffect(() => {
    getOrders()
  },[])
  
  const onPageClick = (link) => {
    getOrders(link.url);
  }

  const handleSelectAllChange = (e) => {
    const checked = e.target.checked;
    setSelectAll(checked);

    const checkboxes = document.querySelectorAll('tbody input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = checked;
    });
  };

  console.log(orders);

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-3 bg-gray-200 h-[100vh]">
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
            <div className="p-4  hover:bg-slate-300 border-b">
              <Link to="/NewProducts" className="text-black ">
                <div>New Products</div>
              </Link>
            </div>
          </li>
          <li>
            <div className="p-4  bg-slate-400 border-b">
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
      <div className="col-span-9 bg-white h-[100vh] overflow-scroll">
        <div className="p-4">
          <header>
            <div className=" my-4 items-center">
              <h1 className="font-bold text-lg fontBold">Order</h1>
              <p>Review and manage the details of all orders placed by customers.</p>
             <Button text="Add order" />
            </div>
            <div>
            <span className="text-sm">All Products({meta.total})</span>
              <span className="ml-4 text-sm">Men ({orders.filter(order => order.order.product_id.gender === 'male').length})</span>
              <span className="ml-4 text-sm">Women ({orders.filter(order => order.order.product_id.gender === 'female').length})</span>
              <span className="ml-4 text-sm">Children ({orders.filter(order => order.order.product_id.gender === 'children').length})</span>
            </div>
          </header>
          <form method="post" onSubmit={checkForData}>
            <div className="flex flex-wrap mb-4 items-center bg-slate-200 rounded-lg shadow-lg p-4 my-6">
              
              <div className="m-4">
              <select 
                className="px-2 py-1 border border-gray-300 rounded"
                onChange={(e) => setSelectedMenu(e.target.value)}
              >
                  <option>Select a Category</option>
                  {editContent.map((menu) => (                    
                    <option key={menu.id}>{menu.title}</option>
                  ))}

                </select>
              </div>
              <div className="m-4">
                <select
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-2 py-1 border border-gray-300 rounded"
                >
                  <option> Status</option>
                  <option>processing</option>
                  <option>Shipped</option>
                  <option>Delivered</option>
                  <option>On Hold</option>
                  <option>Refunded</option>
                  <option>Out for Delivery</option>
                  <option>Pending Payment</option>

                </select>
              </div>
              <div>
              <select
                onChange={(e) => setSelectedPriceRange(e.target.value)}
                className="px-2 py-1 border border-gray-300 rounded">
                  <option>Price range</option>
                  <option value={1}>under ₦1,000</option>
                  <option value={2}>₦1,000 - ₦20,000 </option>
                  <option value={3}>₦21,000 - ₦50,000</option>

                  <option value={4}>₦51,000 - ₦100,000</option>

                  <option value={5}>₦100,000 and above</option>

                </select>
              </div>
              <div>
                <select
                  onChange={(e) => setOrderDate(e.target.value)}
                  className="px-2 py-1 border border-gray-300 rounded">
                  <option>Order Date</option>
                  <option value={1}>last 7 days</option>
                  <option value={2}>last week</option>
                  <option value={3}>last month</option>
                  <option value={6}>last 3 months</option>
                  <option value={12}>last 6 months</option>
                  <option value={24}>last year</option>

                </select>
              </div>
              <div className="m-4">
                <button className="px-4 py-2 text-white bg-black rounded" type="submit">
                  Apply
                </button>
              </div>
            </div>
          </form>
          <table className="w-full border border-gray-300 bg-slate-200 rounded-lg shadow-lg p-4">
            <thead>
              <tr>
                <th className="font-bold bg-slate-500 p-2">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAllChange}
                  />
                </th>
                <th className="fontBold bg-slate-500  text-white p-4">Id</th>
                <th className="fontBold bg-slate-500  text-white p-4">Order</th>
                <th className="fontBold bg-slate-500  text-white p-4">Date</th>
                <th className="fontBold bg-slate-500  text-white p-4">orderStatus</th>


                <th className="fontBold bg-slate-500  text-white p-4">Status</th>
                <th className="fontBold bg-slate-500  text-white p-4">Total</th>
                <th className="fontBold bg-slate-500  text-white p-4">Qty</th>
             
              </tr>
            </thead>
            <tbody className="p-5 ">
            {
              loading && (<div className="flex justify-center items-center mt-10">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm12 0a8 8 0 100-16v3a5 5 0 010 10v3a8 8 0 000 16 4 4 0 110-8 4 4 0 004-4v-3a5 5 0 010-10v-3z"></path>
              </svg>
              <span>Loading...</span>
              </div>)
            }
              {!loading && selectedDataCheck &&
                selectedData && selectedData.map((order) => (
                  <tr className="p-5" key={order.id}>
                    <td className="text-center p-4">
                      <input type="checkbox" />
                    </td>
                
                    <td className="text-center p-4">#{order.transaction}</td>
                    <td className="text-center p-4">
                      <Link to="/">{order.order.product_id.title}</Link>
                      <div className="hover:visible">
                        <Link to="/" className="text-red-500 hover:underline">
                          Delete
                        </Link>
                        <Link to={"/EditOrder/"+ order.id} className=" hover:underline ml-4">
                          View
                        </Link>
                      </div>
                    </td>
                    <td className="text-center p-4">{order.date}</td>
                    <td className="text-center p-4">{order.orderStatus}</td>
                    <td className="text-center p-4 "><span className="bg-gray-400 p-2 rounded-md">{order.paymentStatus} payment</span></td>
                    <td className="text-center p-4">{order.order.product_id.salePrice}</td>
                    <td className="text-center p-4">1</td>
              
                  </tr>
                ))
              }

              {!loading && !selectedDataCheck &&
                orders && orders.map((order) => (
                  <tr className="p-5" key={order.id}>
                    <td className="text-center p-4">
                      <input type="checkbox" />
                    </td>
                
                    <td className="text-center p-4">#{order.transaction}</td>
                    <td className="text-center p-4">
                      <Link to="/">{order.order.product_id.title}</Link>
                      <div className="hover:visible">
                        <Link to="/" className="text-red-500 hover:underline">
                          Delete
                        </Link>
                        <Link to={"/EditOrder/"+ order.id} className=" hover:underline ml-4">
                          View
                        </Link>
                      </div>
                    </td>
                    <td className="text-center p-4">{order.date}</td>
                    <td className="text-center p-4">{order.orderStatus}</td>
                    <td className="text-center p-4 "><span className="bg-gray-400 p-2 rounded-md">{order.paymentStatus} payment</span></td>
                    <td className="text-center p-4">{order.order.product_id.salePrice}</td>
                    <td className="text-center p-4">1</td>
              
                  </tr>
                ))
                }
            </tbody>
          </table>
          
         <div className="my-14">
          <Pagination meta={meta} onPageClick={onPageClick}/>
         </div>
        </div>
      </div>
    </div>
  );
}
