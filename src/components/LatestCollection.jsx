import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import Tittle from "./Tittle";
import ProductItem from "../Components/ProductItem";

export default function LatestCollection() {
  const { products } = useContext(ShopContext);

  const [LatestProduct, setLatestProduct] = useState([]);

  useEffect(() => {
    setLatestProduct(products.slice(0, 10));
  }, [products]);

  // console.log(products);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Tittle text1={"LATEST"} text2={"COLLECTIONS"}></Tittle>
        <p className="w-3/4 ,m-auto text-xs sm:text-sm  md:text-base text-gray-600">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus quis
          sequi nihil ab sint commodi, consequatur harum aliquid asperiores et
          molestiae vitae cupiditate aliquam beatae dolorum deleniti. Numquam,
          nesciunt earum?
        </p>
      </div>
      {/* Rendering Image */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {LatestProduct.map((item, ind) => (
          <ProductItem
            key={ind}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
}
