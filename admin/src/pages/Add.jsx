import React from "react";
import { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App.jsx";
import { toast } from "react-toastify";

export default function Add({ token }) {
  const [image1, setimage1] = useState(false);
  const [image2, setimage2] = useState(false);
  const [image3, setimage3] = useState(false);
  const [image4, setimage4] = useState(false);

  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState("");
  const [category, setcatgory] = useState("Men");
  const [subCategory, setsubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setsizes] = useState([]);

  const onSubmitHandeler = async (e) => {
    e.preventDefault();
    try {
      console.log("Token--->", token);

      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const Response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        {
          headers: { token },
        }
      );
      console.log(Response);
      if (Response.data.success) {
        toast.success(Response.data.message);
        setname("");
        setdescription("");
        setimage1(false);
        setimage2(false);
        setimage3(false);
        setimage4(false);
        setprice("");
        setsizes([]);
        setBestseller(false);
      } else {
        toast.error(Response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandeler}
      className="flex flex-col w-full items-start gap-3"
    >
      <div>
        <p className="mb-2">Upload Image</p>
        <div className="flex gap-2">
          <label htmlFor="image1">
            <img
              src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
              alt="uploadArea"
              className="w-20"
            />
            <input
              onChange={(e) => setimage1(e.target.files[0])}
              id="image1"
              type="file"
              hidden
            />
          </label>

          <label htmlFor="image2">
            <img
              src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
              alt="uploadArea"
              className="w-20"
            />
            <input
              onChange={(e) => setimage2(e.target.files[0])}
              id="image2"
              type="file"
              hidden
            />
          </label>

          <label htmlFor="image3">
            <img
              src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
              alt="uploadArea"
              className="w-20"
            />
            <input
              onChange={(e) => setimage3(e.target.files[0])}
              id="image3"
              type="file"
              hidden
            />
          </label>

          <label htmlFor="image4">
            <img
              src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
              alt="uploadArea"
              className="w-20"
            />
            <input
              onChange={(e) => setimage4(e.target.files[0])}
              id="image4"
              type="file"
              hidden
            />
          </label>
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2">Produt Name</p>
        <input
          onChange={(e) => setname(e.target.value)}
          value={name}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Product Name?"
          required
        />
      </div>

      <div className="w-full">
        <p className="mb-2">Produt Description</p>
        <textarea
          onChange={(e) => setdescription(e.target.value)}
          value={description}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Write content Here!"
          required
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2 ">Product Category</p>
          <select
            onChange={(e) => setcatgory(e.target.value)}
            className="w-full px-3 py-2"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className="mb-2 ">sub Category</p>
          <select
            onChange={(e) => setsubCategory(e.target.value)}
            className="w-full px-3 py-2"
          >
            <option value="Topwar">Topwar</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwar">Winterwar</option>
          </select>
        </div>

        <div>
          <p className="mb-2 ">Product Price</p>
          <input
            onChange={(e) => setprice(e.target.value)}
            value={price}
            className="w-full px-3 py-2 sm:w-[120px]"
            type="Number"
            placeholder="₹100"
            min="100"
            required
          />
        </div>
      </div>

      <div>
        <p className="mb-2 ">Product Sizes</p>
        <div className="flex gap-3 ">
          <div
            onClick={() =>
              setsizes((prev) =>
                prev.includes("S")
                  ? prev.filter((item) => item !== "S")
                  : [...prev, "S"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("S") ? "bg-pink-100" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              S
            </p>
          </div>

          <div
            onClick={() =>
              setsizes((prev) =>
                prev.includes("M")
                  ? prev.filter((item) => item !== "M")
                  : [...prev, "M"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("M") ? "bg-pink-100" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              M
            </p>
          </div>

          <div
            onClick={() =>
              setsizes((prev) =>
                prev.includes("L")
                  ? prev.filter((item) => item !== "L")
                  : [...prev, "L"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("L") ? "bg-pink-100" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              L
            </p>
          </div>

          <div
            onClick={() =>
              setsizes((prev) =>
                prev.includes("XL")
                  ? prev.filter((item) => item !== "XL")
                  : [...prev, "XL"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("XL") ? "bg-pink-100" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              XL
            </p>
          </div>

          <div
            onClick={() =>
              setsizes((prev) =>
                prev.includes("XXL")
                  ? prev.filter((item) => item !== "XXL")
                  : [...prev, "XXL"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("XXL") ? "bg-pink-100" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              XXL
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-2 ">
        <input
          onChange={(e) => setBestseller(e.target.checked)}
          checked={bestseller}
          type="checkbox"
          id="bestseller"
        />
        <label className="cursor-pointer" htmlFor="bestseller">
          Add to Bestseller
        </label>
      </div>

      <button type="submit" className="w-28  py-3 mt-4  bg-black text-white  ">
        ADD
      </button>
    </form>
  );
}
