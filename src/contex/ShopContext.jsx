import { createContext, useContext, useEffect, useState } from "react";
// import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();
const val = "₹";

const ShopContextProvider = (props) => {
  const currency = val;
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [search, setsearch] = useState("");
  const [showsearch, setshowsearch] = useState(false);
  const [cartItem, setcartItem] = useState({});
  const [token, settoken] = useState("");

  // TO get products direct from the admin list
  const [products, setproducts] = useState([]);

  // Add to Cart Functionality
  const addToCart = async (ItemId, size) => {
    console.log("Item Id from ShopContext", ItemId);
    if (!size) {
      toast.error("Selcet Product size");
      return;
    }

    // Copy cartItem
    let cartData = structuredClone(cartItem);

    if (cartData[ItemId]) {
      if (cartData[ItemId][size]) {
        cartData[ItemId][size] += 1;
      } else {
        cartData[ItemId][size] = 1;
      }
    } else {
      cartData[ItemId] = {}; // New Entry
      cartData[ItemId][size] = 1;
    }

    setcartItem(cartData);

    // Check for userLogin or Not
    if (token) {
      try {
        // send req to the api to add to product in the user cartData
        await axios.post(
          backendUrl + "/api/cart/addCart",
          { ItemId, size },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  // useEffect(() => {
  //   console.log(cartItem);
  // }, [cartItem]);

  // Get Cart Count
  const cartCount = () => {
    let totalCount = 0;
    for (const items in cartItem) {
      for (const item in cartItem[items]) {
        try {
          if (cartItem[items][item] > 0) {
            totalCount += cartItem[items][item];
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    return totalCount;
  };

  // Update cart item
  const updateCartQunt = async (ItemId, size, quantity) => {
    // copy Cart item
    let cartData = structuredClone(cartItem);

    cartData[ItemId][size] = quantity;

    setcartItem(cartData);

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/updateCart",
          { ItemId, size, quantity },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  // Get the cart details of the user from the Database to Display in the User cart
  const getCartData = async (token) => {
    try {
      // Send req to the  Database to Get user cart Details
      const response = await axios.post(
        backendUrl + "/api/cart/getCart",
        {},
        { headers: { token } }
      );

      // console.log(response.data);

      // Update the cartItems
      if (response.data.success) {
        setcartItem(response.data.cartData);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Get product from the admin panel
  const getProductData = async () => {
    try {
      // send request to our database to get product
      const response = await axios.get(backendUrl + "/api/product/list");

      // console.log(response.data);

      if (response.data.success) {
        setproducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // call the GetProductData function
  useEffect(() => {
    getProductData();
  }, []);

  // get token from the local storage for the user login after the refressing the page
  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      settoken(localStorage.getItem("token"));
      getCartData(localStorage.getItem("token"));
    }
  }, []);

  // Get total cart item sum
  const getTotal = () => {
    let totalAmount = 0;
    for (const items in cartItem) {
      let productInfo = products.find((product) => product._id === items);
      for (const item in cartItem[items]) {
        try {
          if (cartItem[items][item] > 0) {
            totalAmount += productInfo.price * cartItem[items][item];
          }
        } catch (e) {
          console.log(e);
        }
      }
    }
    return totalAmount;
  };

  // Navigate to OrderPage
  const navigate = useNavigate();

  const Value = {
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
    navigate,
    backendUrl,
    token,
    settoken,
  };

  return (
    <ShopContext.Provider value={Value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
