import axios from "axios";
import { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

export default function Orders({ token }) {
  // Create a State Vriable to Store all the orders form the Backend
  const [orders, setorders] = useState([]);

  // function to fetch all the orders details
  const fetchAllOrders = async () => {
    // if Token is Not available the return null
    if (!token) {
      return null;
    }

    try {
      // api request for getting all orders details form the database
      const response = await axios.post(
        backendUrl + "/api/order/listorder",
        {},
        { headers: { token } }
      );
      console.log(response.data);
      if (response.data.success) {
        setorders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Function to update the delivery status
  const updatestatusHandeler = async (event, orderId) => {
    try {
      // using api call update the status of the order
      const response = await axios.post(
        backendUrl + "/api/order/updstatus",
        {
          orderId,
          status: event.target.value,
        },
        { headers: { token } }
      );
      console.log("Update--->", response.data);
      if (response.data.success) {
        // display the current updated status to the user
        await fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // This function get Executed When the page will be Loaded ( token )
  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div>
      <h3>Order Page</h3>
      <div>
        {orders.map((order, index) => (
          <div
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_3fr_1fr]  lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3  md:my-4 text-xs md:text-sm text-gray-700"
            key={index}
          >
            <img className="w-12" src={assets.parcel_icon} alt="parcelIcon" />
            <div>
              <div>
                {order.items.map((item, index) => {
                  // first show the last order details
                  if (index === order.items.length - 1) {
                    return (
                      <p className="py-0.5" key={index}>
                        {" "}
                        {item.name} x {item.quantity} <span>{item.size}</span>
                      </p>
                    );
                  } else {
                    // Reamaing items
                    return (
                      <p className="py-0.5" key={index}>
                        {" "}
                        {item.name} x {item.quantity} <span>{item.size}</span>
                      </p>
                    );
                  }
                })}
              </div>
              <p className="mt-3 mb-2 font-medium">
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <div>
                <p>{order.address.street + " ,"}</p>
                <p>
                  {order.address.city +
                    " , " +
                    order.address.state +
                    " , " +
                    order.address.country +
                    " ," +
                    order.address.zipcode}
                </p>
              </div>
              <p>{order.address.phone}</p>
            </div>
            <div>
              <p className="text-sm md:text-[15px]">
                items:{order.items.length}
              </p>
              <p className="mt-3">paymentMethod:{order.paymentMethod}</p>
              <p>payment:{order.payment ? "Done" : "Pending"}</p>
              <p>Date:{new Date(order.date).toLocaleString()}</p>
            </div>
            <p className="text-sm md:text-[15px]">
              {currency}
              {order.amount}
            </p>
            <select
              onChange={(event) => updatestatusHandeler(event, order._id)}
              className="p-2 font-semibold"
              value={order.status}
            >
              <option value="order placed">Order Placed</option>
              <option value="packing">Packing</option>
              <option value="shipped">shipped</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Deliverd">Deliverd</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}
