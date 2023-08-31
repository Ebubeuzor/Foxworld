import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import coats from "../../assets/coats.jpeg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axiosClient from "../../axoisClient";
import { get } from "lodash";
import { useStateContext } from "../../context/ContextProvider";

export default function Reports() {
  const [status, setStatus] = useState("Processing");
  const [selectAll, setSelectAll] = useState(false);
  const [visitor, setVisitor] = useState("");
  const [loading,setLoading] = useState(false);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [getMaxProduct, setMaxProduct] = useState(null);
  const [amount, setAmount] = useState([]);
  const [amountForDay, setAmountForDay] = useState([]);
  const [orders,setOrders] = useState([]);
  const [ordersCount,setOrdersCount] = useState(null);
  const [mostFrequentProduct, setMostFrequentProduct] = useState(null);

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

  const totalSales = 10000;
  const netSales = 8000;
  const productSales = 2000;

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const topCategory = "Electronics";
  const categoryItemsSold = 500;
  const categoryTotalEarnings = 25000;

  const topProduct = {
    name: "Smartphone",
    image: "https://example.com/smartphone-image.jpg",
    quantitySold: 200,
    totalEarnings: 10000,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Access the selected dates from the state
    const formattedStartDate = startDate ? startDate.toLocaleDateString() : "";
    const formattedEndDate = endDate ? endDate.toLocaleDateString() : "";
    const data = {
      'requestDay': formattedStartDate
    }
  };

  useEffect(() => {
    axiosClient.get('/visitor')
    .then(({data}) => {
      setVisitor(data.views)
    })
  },[])

  useEffect(() => {
    axiosClient.get('/payment')
    .then(({data}) => {
      console.log(data);
      setAmount(data.data)
    })
  },[])

  useEffect(() => {
    axiosClient.get('/amountForDay')
    .then(({data}) => {
      console.log(data);
      setAmountForDay(data.data)
    })
  },[])

  const getOrders = (url) => {
    url = url || '/mainorder'
    setLoading(true)
    axiosClient.get(url)
    .then(({data}) => {
      console.log(data.data);
      setOrders(data.data);

      const fetchedOrders = data.data;

      const usernameCounts = {};
      fetchedOrders.forEach(order => {
        console.log(order);
        if (order.user != null) {
        const userName = order.user.name;
        if (!usernameCounts[userName]) {
          usernameCounts[userName] = 1;
        } else {
          usernameCounts[userName]++;
        }}
      });

      const usernamesWithDuplicates = Object.keys(usernameCounts).filter(
        userName => usernameCounts[userName] > 1
      );

      const totalDuplicates = usernamesWithDuplicates.length;

      setOrdersCount(totalDuplicates);

      const productCounts = {};
      fetchedOrders.forEach(order => {
        const product_id = order.order.product_id.id;
        if (!productCounts[product_id]) {
          productCounts[product_id] = 1;
        } else {
          productCounts[product_id]++;
        }
      });

      // Find the most frequent product_id
      let maxCount = 0;
      let mostFrequentId = null;
      for (const product_id in productCounts) {
        if (productCounts[product_id] > maxCount) {
          maxCount = productCounts[product_id];
          mostFrequentId = product_id;
        }
      }

      setMaxProduct(maxCount);

      const mostFrequentProductDetails = fetchedOrders.find(order =>
        order.order.product_id.id === parseInt(mostFrequentId)
      );

      setMostFrequentProduct(mostFrequentProductDetails);
      setLoading(false)
    });
  }
  
  useEffect(() => {
    getOrders()
  },[])

  let calMainAmount = 0
  amount.map(item => calMainAmount += parseInt(item.totalAmount))

  let calAmountForDay = 0
  amountForDay.map(item => calAmountForDay += parseInt(item.totalAmount))

  console.log(amount);
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
            <div className="p-4 bg-slate-400 border-b  ">
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
      <div className="p-4 bg-white rounded shadow">
  <h1 className="text-2xl font-bold mb-4 fontBold">Reports</h1>
  <div>
    <p className="fontThin"> This is an overview of your store's sales and performance metrics.
</p>
</div>
  <form onSubmit={handleSubmit}>
  <div className="grid grid-cols-2 md:grid-cols-2 gap-4 bg-slate-200 rounded-lg shadow-lg p-4">
    <div className="mb-4">
      <div className="border border-slate-300 bg-white rounded p-6 text-center">
        <strong className="text-sm fontBold">Total Revenue
</strong>
<p className="fontThin">The overall monetary value earned from completed sales.</p>
        <div className="mt-4">₦
          {
            amount && calMainAmount
          }
        </div>
      </div>
    </div>
    <div className="mb-4">
      <div className="border border-slate-300 bg-white rounded p-6 text-center">
        <strong className="text-sm fontBold">Daily Revenue</strong><p className="fontThin">The total revenue generated on the current day.</p>
        <div className="mt-4">₦
          {
            amountForDay &&
            amountForDay ? calAmountForDay : 0
          }
        </div>
      </div>
    </div>
    <div className="mb-4">
      <div className="border border-slate-300 bg-white rounded p-6 text-center">
        <strong className="text-sm fontBold"> Total Orders </strong><p className="fontThin">
        The overall number of customer orders placed</p>
        <div className="mt-4">{orders && orders.length}</div>
      </div>
    </div>
    <div className="mb-4">
      <div className="border border-slate-300 bg-white rounded p-6 text-center">
        <strong className="text-sm fontBold">Total Visitors</strong><p className="fontThin">
        The count of unique individuals who have visited the website.</p>
        <div className="mt-4">{visitor}</div>
      </div>
    </div>
    <div className="mb-4">
      <div className="border border-slate-300 bg-white rounded p-6 text-center">
        <strong className="text-sm fontBold">Registered Users</strong><p className="fontThin">The total count of users who have created accounts on your website indicates the size of your customer base and the potential for targeted marketing.</p>
        <div className="mt-4">{visitor}</div>
      </div>
    </div>
    <div className="mb-4">
      <div className="border border-slate-300 bg-white rounded p-6 text-center">
        <strong className="text-sm fontBold">Returning Customers</strong><p className="fontThin">The number of customers who made repeat purchases indicates customer loyalty and retention.</p>
        <div className="mt-4">{ordersCount && ordersCount }</div>
      </div>
    </div>
    <div className="mb-4">
      <div className="border border-slate-300 bg-white rounded p-4">
        <strong>Date Range:</strong>
        <DatePicker
          selected={startDate}
          onChange={handleDateChange}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          inline
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Submit
      </button>
    </div>
  </div>
  </form>
</div>

      </div>

      <div className="sidebar bg-gray-200 w-1/4 border border-gray-300 h-[100vh] overflow-scroll">
        <div>
          <div className="border-b border-gray-300 p-4 font-bold ">
            <h1 className="uppercase fontBold">Top Selling Product</h1>
            <p className="fontThin"> The best-selling products are based on the total number of units sold, enabling you to identify your most popular items.</p>
          </div>
          {
            loading && (<div className="flex justify-center items-center mt-10">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm12 0a8 8 0 100-16v3a5 5 0 010 10v3a8 8 0 000 16 4 4 0 110-8 4 4 0 004-4v-3a5 5 0 010-10v-3z"></path>
            </svg>
            <span>Loading...</span>
            </div>)
          }

          {!loading && mostFrequentProduct && 
            <div className="p-4 bg-slate-200 rounded-lg shadow-lg ">
              <div className="flex items-center">
                <img
                  src={mostFrequentProduct.order.product_id.frontImage}
                  alt={topProduct.name}
                  className="w-12 h-12 mr-4"
                />
                <div>
                  <p>Name: {mostFrequentProduct.order.product_id.title}</p>
                  <p>Quantity Sold: {getMaxProduct}</p>
                  <p>Total Earnings: ₦{(getMaxProduct) * (mostFrequentProduct.order.product_id.salePrice)}</p>
                </div>
              </div>
            </div>}
        </div>
      </div>
    </div>
  );
}
