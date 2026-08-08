import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

export default function LoginPage() {
  const [currentState, setcurrentState] = useState("Login");
  const { token, settoken, navigate, backendUrl } = useContext(ShopContext);

  // set all the data fills in the login form
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === "Sign Up") {
        // call the user registration api
        const response = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });
        // console.log(response.data);
        if (response.data.success) {
          settoken(response.data.token);
          // also save the token to our local storage
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
        }
      } else {
        // call the user login api
        const response = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });
        // console.log(response.data);
        if (response.data.success) {
          settoken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          // Invalid credential
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Add useEffect to track the change in the token state for user Auth
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <form
      className="flex flex-col  items-center   w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
      onSubmit={onSubmitHandler}
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-node h-[1.5px]  w-8 bg-gray-800" />
      </div>
      {currentState === "Login" ? (
        ""
      ) : (
        <input
          onChange={(e) => setname(e.target.value)}
          value={name}
          type="text"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Enter UserName"
          required
        />
      )}
      <input
        onChange={(e) => setemail(e.target.value)}
        value={email}
        type="email"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Enter User Email"
        required
      />
      <input
        onChange={(e) => setpassword(e.target.value)}
        value={password}
        type="password"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Enter Strong Password"
        required
      />

      <div className="w-full flex justify-between text-sm mb-[-8px]">
        <p className="cursor-pointer ">Forgot Password?</p>
        {currentState === "Login" ? (
          <p
            onClick={() => setcurrentState("Sign Up")}
            className="cursor-pointer"
          >
            Create account
          </p>
        ) : (
          <p
            onClick={() => setcurrentState("Login")}
            className="cursor-pointer"
          >
            Login
          </p>
        )}
      </div>
      <button className="bg-black  text-white font-light px-8 py-2 mt-4 ">
        {currentState === "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
}
