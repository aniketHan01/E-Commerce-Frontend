import React, { useContext, useEffect, useState } from "react";
import Tittle from "../Components/Tittle";
import CartTotal from "./CartToal";
import { assets, products } from "../assets/assets";
import { ShopContext } from "../Context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";

export default function PlaceOrder() {
  const [method, setmethod] = useState("cod");
  const {
    navigate,
    products,
    currency,
    delivery_fee,
    search,
    setsearch,
    showsearch,
    setshowsearch,
    addToCart,
    cartItem,
    setcartItem,
    cartCount,
    updateCartQunt,
    getTotal,
    backendUrl,
    token,
  } = useContext(ShopContext);

  // Create a stateVariable FormData to take Address Details from the User
  const [formData, setformData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  // Create an Onchange function that store the name:value during chainging
  const onchangeHandeler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    // Destruct the previous ans Save New Data
    setformData((data) => ({ ...data, [name]: value }));
  };

  // Initialize the Razorpay to make Payment successfull
  const intipayment = (order) => {
    const options = {
      key: process.meta.env.RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "order payment",
      description: "order payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        // console.log(response);

        try {
          // Verify the Payment using the api call to the backend
          const { data } = await axios.post(
            backendUrl + "/api/order/verifyRazorpay",
            response,
            { headers: { token } }
          );

          if (data.success) {
            // payment is Successful
            navigate("/order");
            setcartItem({});
          }
        } catch (error) {
          console.log(error);
          toast.error(error);
        }
      },
    };

    // create a varibale which create a popup and execute  our payment and call handler function of the options

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  // On SubmitHandelar Function
  const onsubmitHandelar = async (event) => {
    // Prevent reload of browser
    event.preventDefault();
    try {
      // Extract the Order Items from the User Cart
      let orderItems = [];

      for (const items in cartItem) {
        for (const item in cartItem[items]) {
          // if Cart have some items the procced to check out for order
          if (cartItem[items][item] > 0) {
            // make structured clone of these product inside the cart
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            // if poducts available inside the product info the procced
            if (itemInfo) {
              itemInfo.sizes = item;
              itemInfo.quantity = cartItem[items][item];
              orderItems.push(itemInfo);
            }
          }
        }

        // console.log(orderItems);

        let orderData = {
          address: formData,
          items: orderItems,
          amount: getTotal() + delivery_fee,
        };

        // options for payment methods
        switch (method) {
          // Api call for COD
          case "cod":
            const response = await axios.post(
              backendUrl + "/api/order/placeOrder",
              orderData,
              { headers: { token } }
            );
            console.log(response.data);
            if (response.data.success) {
              setcartItem({}), navigate("/order");
            } else {
              toast.error(response.data.message);
            }
            break;
          case "Stripe":
            const responseStripe = await axios.post(
              backendUrl + "/api/order/stripe",
              orderData,
              { headers: { token } }
            );
            console.log(responseStripe);
            if (responseStripe.data.success) {
              // Extract the Session_url from the Data
              const { session_url } = responseStripe.data;
              // Redirect the user to this Url (send this Url to the User)
              window.location.replace(session_url);
            } else {
              toast.error(responseStripe.data.message);
            }
            break;

          case "razorpay":
            const responseRazorpay = await axios.post(
              backendUrl + "/api/order/razorpay",
              orderData,
              { headers: { token } }
            );
            if (responseRazorpay.data.success) {
              // console.log(responseRazorpay.data.order);
              intipayment(responseRazorpay.data.order);
            }
            break;

          default:
            break;
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // useEffect(() => {
  //   console.log(method);
  // }, [method]);

  return (
    <form
      onSubmit={onsubmitHandelar}
      className="flex  flex-col sm:flex-row justify-between gap-2 pt-5 sm:p-14 min-h-[80vh] border-t"
    >
      {/* *********** LEFT SIDE ************** */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3 ">
          <Tittle text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            onChange={onchangeHandeler}
            name="firstName"
            value={formData.firstName}
            required
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="First name"
          />

          <input
            onChange={onchangeHandeler}
            name="lastName"
            value={formData.lastName}
            required
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Last name"
          />
        </div>
        <input
          onChange={onchangeHandeler}
          name="email"
          value={formData.email}
          required
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="email"
          placeholder=" Eamil address"
        />
        <input
          onChange={onchangeHandeler}
          name="street"
          value={formData.street}
          required
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
          placeholder=" street/Area"
        />
        <div className="flex gap-3">
          <input
            onChange={onchangeHandeler}
            name="city"
            value={formData.city}
            required
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="City"
          />

          <input
            onChange={onchangeHandeler}
            name="state"
            value={formData.state}
            required
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="State"
          />
        </div>
        <div className="flex gap-3">
          <input
            onChange={onchangeHandeler}
            name="zipcode"
            value={formData.zipcode}
            required
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Country"
          />

          <input
            onChange={onchangeHandeler}
            name="country"
            value={formData.country}
            required
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Zip-Code"
          />
        </div>

        <input
          onChange={onchangeHandeler}
          name="phone"
          value={formData.phone}
          required
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="number"
          placeholder="Phone"
        />
      </div>
      {/* ********** Right Side *************  */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Tittle text1={"PAYMENT"} text2={"METHOD"} />
          {/* ******** Payment Selection ************** */}
          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              onClick={() => setmethod("Stripe")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer "
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full  ${
                  method === "Stripe" ? " bg-green-400" : " "
                }`}
              ></p>
              <img
                className="h-5 mx-4"
                src={assets.stripe_logo}
                alt="payment"
              />
            </div>
            <div
              onClick={() => setmethod("razorpay")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer "
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "razorpay" ? " bg-green-400" : " "
                }`}
              ></p>
              <img
                className="h-5 mx-4"
                src={assets.razorpay_logo}
                alt="payment"
              />
            </div>
            <div
              onClick={() => setmethod("cod")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer "
            >
              <p
                className={` min-w-3.5 h-3.5 border rounded-full   ${
                  method === "cod" ? " bg-green-400" : " "
                }`}
              ></p>
              <p className="text-gray-500 text-sm font-medium mx-4  ">
                CASH ON DELIVERY
              </p>
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <button
              type="submit"
              className="bg-black text-white px-16 py-3 text-sm"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
