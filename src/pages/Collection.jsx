import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { assets } from "../assets/assets";
import Tittle from "../Components/Tittle";
import ProductItem from "../Components/ProductItem";

export default function Collections() {
  const { products, search, showsearch } = useContext(ShopContext);

  const [showFilter, setshowFilter] = useState(false);
  const [filterProducts, setfilterProducts] = useState([]);
  const [category, setcategory] = useState([]);
  const [subCategory, setsubCategory] = useState([]);
  const [selectType, setselectType] = useState("relavent");

  // filter the product According to category
  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setcategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setcategory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleSubcategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setsubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setsubCategory((prev) => [...prev, e.target.value]);
    }
  };

  // Apply filter to the the selected product
  const applyFilter = () => {
    let productCopy = products.slice();

    if (showsearch && search) {
      productCopy = productCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productCopy = productCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    if (subCategory.length > 0) {
      productCopy = productCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }
    setfilterProducts(productCopy);
  };

  // Sort the product According to price
  const sortProduct = () => {
    let filterCopy = filterProducts.slice();

    switch (selectType) {
      case "low-high": {
        setfilterProducts(filterCopy.sort((a, b) => a.price - b.price));
        break;
      }
      case "high-low": {
        setfilterProducts(filterCopy.sort((a, b) => b.price - a.price));
        break;
      }
      default:
        applyFilter();
        break;
    }
  };

  // useEffect(() => {
  //   setfilterProducts(products);
  // }, []);

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showsearch, products]);

  useEffect(() => {
    sortProduct();
  }, [selectType]);

  // useEffect(() => {
  //   console.log(Category);
  // }, [Category]);

  // useEffect(() => {
  //   console.log(subCategory);
  // }, [subCategory]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 boder-t">
      {/* Filter Option */}
      <div className="min-w-60 ">
        <p className="my-2 text-xl flex item-center cursor-pointer gap-2">
          FILTER
          <img
            onClick={() => {
              setshowFilter(!showFilter);
            }}
            className={` h-3  sm:hidden  ${showFilter ? "rotate-90" : ""}`}
            src={assets.dropdown_icon}
            alt="drop_down"
          />
        </p>
        {/* category Filter */}
        <div
          className={` border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block `}
        >
          <p className="mb-3 text-sm font-medium ">CATOGRIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700 ">
            <p className="flex gap-2">
              <input
                className="w-3 "
                type="checkbox"
                value={"Men"}
                onClick={toggleCategory}
              />
              Men
            </p>

            <p className="flex gap-2">
              <input
                className="w-3 "
                type="checkbox"
                value={"Women"}
                onClick={toggleCategory}
              />
              Women
            </p>
            <p className="flex gap-2">
              <input
                className="w-3 "
                type="checkbox"
                value={"Kids"}
                onClick={toggleCategory}
              />
              Kids
            </p>
          </div>
        </div>

        {/* Sub-category Filter */}

        <div
          className={` border border-gray-300 pl-5 py-3 my-6 ${
            showFilter ? "" : "hidden"
          } sm:block `}
        >
          <p className="mb-3 text-sm font-medium ">TYPES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700 ">
            <p className="flex gap-2">
              <input
                className="w-3 "
                type="checkbox"
                value={"Topwear"}
                onClick={toggleSubcategory}
              />
              Topwear
            </p>

            <p className="flex gap-2">
              <input
                className="w-3 "
                type="checkbox"
                value={"Bottomwear"}
                onClick={toggleSubcategory}
              />
              Bottomwear
            </p>
            <p className="flex gap-2">
              <input
                className="w-3 "
                type="checkbox"
                value={"Winterwear"}
                onClick={toggleSubcategory}
              />
              Winterwear
            </p>
          </div>
        </div>
      </div>

      {/* Right side collection items */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4 ">
          <Tittle text1={"ALL"} text2={"COLLECTIONS"} />

          {/* Product Sort */}
          <select
            onChange={(e) => setselectType(e.target.value)}
            className="border-2 border-gray-300 text-sm px-2 "
          >
            <option value={"relevant"}>Sort By:Relavent</option>
            <option value={"low-high"}>Sort By:Low to High</option>
            <option value={"high-low"}>Sort By:High to Low</option>
          </select>
        </div>
        {/* Display Products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6 ">
          {filterProducts.map((items, index) => (
            <ProductItem
              key={index}
              id={items._id}
              name={items.name}
              image={items.image}
              price={items.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
