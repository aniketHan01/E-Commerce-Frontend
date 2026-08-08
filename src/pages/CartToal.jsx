import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import Tittle from "../Components/Tittle";

export default function CartTotal() {
  const { currency, getTotal, delivery_fee } =
    useContext(ShopContext);

  return (
    <div className=" w-full">
      <div className="text-2xl">
        <Tittle text1={"CART"} text2={"TOTAL"} />
      </div>

      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between ">
          <p>Subtoal</p>
          <p>
            {currency}
            {getTotal()}.00
          </p>
        </div>
        <hr />
        <div className=" flex justify-between">
          <p>Shipping Charge</p>
          <p>
            {currency}
            {delivery_fee}.00
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <b>Total</b>
          <b>
            {currency}
            {getTotal() === 0 ? 0 : delivery_fee + getTotal()}.00
          </b>
        </div>
      </div>
    </div>
  );
}
