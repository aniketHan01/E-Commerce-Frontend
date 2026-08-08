import { useContext, useEffect } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../../../admin/src/App";
import { toast } from "react-toastify";

export default function verifyPayment() {
  const { navigate, token, setcartItem } = useContext(ShopContext);

  // TO get OrderId and Success from the Url
  const [searchParms, setsearchParms] = useSearchParams();

  // Extract the orderId and Success from the searchParms
  const orderId = searchParms.get("orderId");
  const success = searchParms.get("success");

  // Verify payment
  const paymentVerification = async () => {
    try {
      if (!token) {
        return null;
      }

      // api call for payment verification
      const response = await axios.post(
        backendUrl + "/api/order/verifyStripe",
        { orderId, success },
        { headers: { token } }
      );

      console.log(response);

      if (response.data.success) {
        setcartItem({}); // Empty the cartItems
        navigate("/order"); // Move on OrderPage
      } else {
        navigate("/cart"); // move to cart page & retry the paymant once again
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Run this function when page get loaded
  useEffect(() => {
    paymentVerification();
  }, [token]);

  return (
    <div>
      <h1>Verify payment stripe</h1>
    </div>
  );
}
