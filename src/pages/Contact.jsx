import React from "react";
import Tittle from "../Components/Tittle";
import { assets } from "../assets/assets";
import NewsLetterBox from "../Components/NewsLetterBox";

export default function Contact() {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t">
        <Tittle text1={"CONTACT"} text2={"US"} />
      </div>

      <div className=" my-10 flex flex-col justify-center sm:flex-row gap-10 mb-28">
        <img
          className="w-full md:max-w-[480px]"
          src={assets.contact_img}
          alt="Contact"
        />
        <div className="flex flex-col justify-center items-start gap-6 ">
          <p className="font-semibold text-xl text-gray-600">Our Store</p>
          <p className="text-gray-500">
            1 Market Plaza, Fl 9, San Francisco, CA 94105 <br /> California,Us
          </p>
          <p className="text-gray-500">
            Tel:(+1)-3994-2439-4232 <br /> Email:ServiceEra@support.com
          </p>
          <p className="font-semibold text-xl text-gray-600">
            Careears at ServiceEra
          </p>
          <p className="font-semibold text-xl text-gray-600">
            Learn More about our teams and job openings.
          </p>
          <button className="border  border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500 ">
            Explore Jobs
          </button>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  );
}
