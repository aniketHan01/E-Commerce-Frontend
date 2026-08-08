import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Collections from "./Pages/Collection";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
import LoginPage from "./Pages/Login";
import PlaceOrder from "./Pages/PlaceOrder";
import Order from "./Pages/Order";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import SearchBar from "./Components/SearchBar";
import Verify from "./Pages/verify.jsx";
import { ToastContainer, toast } from "react-toastify";

export default function App() {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px[9vw] ">
      <Navbar />
      <SearchBar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/collection" element={<Collections />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/placeOrder" element={<PlaceOrder />} />
        <Route path="/order" element={<Order />} />
        <Route path="/verify" element={<Verify />} />
      </Routes>
      <Footer />
    </div>
  );
}
