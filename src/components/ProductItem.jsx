import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { Link } from "react-router-dom";

export default function ProductItem({ id, name, image, price }) {
  const { currency } = useContext(ShopContext);
  return (
    <Link className="text-gray-700 cursor:pointer" to={`/product/${id}`}>
      <div className="overflow-hidden">
        <img
          className="hover:scale-110 transition ease-in-out "
          src={image[0]}
          alt="image"
        />
        <p className="pt-3 pb-1 text-small"> {name}</p>
        <p className="text-medium font-small ">
          {" "}
          {currency}
          {price}
        </p>
      </div>
    </Link>
  );
}
