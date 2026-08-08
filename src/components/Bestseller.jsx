import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import Tittle from "./Tittle";
import ProductItem from "./ProductItem";


export default function Bestseller() {
  const { products } = useContext(ShopContext);

  const [bestseller, setbestseller] = useState([]);

  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestseller);
    setbestseller(bestProduct.slice(0, 5));
  },[products]);

  return (
    <>
      <div className="my-10">
        <div className="text-center text-3xl py-8">
          <Tittle text1={"BEST"} text2={"SELLER"} />
          <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600 ">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus,
            sequi. Inventore, autem eligendi facilis quas architecto dolores eum
            asperiores ipsam voluptas molestias maxime maiores minus in dolore
            placeat itaque corrupti?
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
          {bestseller.map((item, ind) => (
            <ProductItem
              key={ind}
              id={item._id}
              image={item.image}
              price={item.price}
              name={item.name}
            />
          ))}
        </div>
      </div>
    </>
  );
}
