import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { currency } from "../App";

export default function List({ token }) {
  const [list, setlist] = useState([]);

  const fetchlist = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");

      // console.log(response.data);

      // Add product if the correct response form the backend
      if (response.data.success) {
        setlist(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Remove product from the list
  const removeProduct = async (id) => {
    try {
      // Send request to the backend for removing the product from the list
      const response = await axios.post(
        backendUrl + "/api/product/remove",
        { id },
        { headers: { token } }
      );

      console.log(response);

      if (response.data.success) {
        toast.success(response.data.message);
        // for updation of list
        await fetchlist();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchlist();
  }, []);
  return (
    <>
      <p className="mb-2">All Products List</p>
      <div className="flex flex-col gap-2">
        {/* ********* List table tittle ************  */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center ">Action</b>
        </div>

        {/*  ********** Product list *********  */}
        {list.map((item, index) => (
          <div
            className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm "
            key={index}
          >
            <img className="w-12" src={item.image[0]} alt="image" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>
              {currency}
              {item.price}
            </p>
            <p
              onClick={() => removeProduct(item._id)}
              className="text-right md:text-center cursor-pointer text-lg"
            >
              X
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
