import React, { use, useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import Tittle from "../Components/Tittle";
import { products } from "../assets/assets";
import axios from "axios";

export default function Order() {
  const { backendUrl, token, currency } = useContext(ShopContext);

  // Collect the User Order Details and store in state Variable
  const [orderData, setorderData] = useState([]);

  const loadOrderData = async () => {
    try {
      // If Token is Not found
      if (!token) {
        return null;
      }

      const response = await axios.post(
        backendUrl + "/api/order/usersorder",
        {},
        { headers: { token } }
      );
      console.log(response.data);
      if (response.data.success) {
        // Store all orders of the user comming from the userOders Database
        let allOrders = [];
        // TO get All orders
        response.data.userOrderData.map((order) => {
          // TO get Indivisual items of the Orders
          order.items.map((item) => {
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["date"] = order.date;
            // Push Item Details in allOrders Array
            allOrders.push(item);
          });
        });

        // Set orderItems details in the orderdata
        console.log(allOrders);
        setorderData(allOrders.reverse()); // to Get current order Data first
      }
    } catch (error) {
      console.log(error);
    }
  };

  // When page get Loaded then run the function
  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Tittle text1={"MY"} text2={"ORDERS"} />
      </div>

      <div>
        {orderData.map((item, index) => (
          <div
            key={index}
            className=" py-4 border-t border-b text-gray-700 flex flex-col md:flex-row  md:items-center md:justify-between gap-4"
          >
            <div className="flex items-start gap-6 text-sm">
              <img className="w-16 sm:w-20" src={item.image[0]} alt="Image" />
              <div>
                <p className="sm:text-base font-medium ">{item.name}</p>
                <div className="flex items-center gap-3 mt-1 text-base text-gray-700 ">
                  <p>
                    {currency}
                    {item.price}
                  </p>
                  <p>Quantity:{item.quantity}</p>
                  <p>Size:{item.sizes}</p>
                </div>
                <p className="mt-1">
                  Date:
                  <span className="text-gray-400">
                    {new Date(item.date).toDateString()}
                  </span>
                </p>
                <p className="mt-1">
                  Payment:
                  <span className="text-gray-400">{item.paymentMethod}</span>
                </p>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-between ">
              <div className=" flex items-center gap-2">
                <p className="min-w-2 h-2 rounded-full bg-green-500"> </p>
                <p className="text-sm md:text-base">{item.status}</p>
              </div>
              <button
                onClick={loadOrderData}
                className="border px-4 py-2 text-sm font-medium rounded-sm,"
              >
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
