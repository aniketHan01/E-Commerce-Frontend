import React from "react";
import Tittle from "../Components/Tittle";
import { assets } from "../assets/assets";
import NewsLetterBox from "../Components/NewsLetterBox";

export default function About() {
  return (
    <div>
      <div className=" text-2xl text-center pt-8 border-t">
        <Tittle text1={"ABOUT"} text2={"US"} />
      </div>

      <div className="my-10  flex flex-col sm:flex-row gap-16">
        <img
          className=" w-full max-w-[450px]  "
          src={assets.about_img}
          alt=" About"
        />

        <div className=" flex flex-col justify-center gap-6 md:w-2/4 text-gray-600 ">
          <p>
            ServiceEra Inc. is an Indian e-commerce company, headquartered in
            Bengaluru, and incorporated in Singapore as a private limited
            company. The company initially focused on online book sales before
            expanding into other product categories such as consumer
            electronics, fashion, home essentials, groceries, and lifestyle
            products.[5][6] In 2025, the company shifted domicile from Singapore
            to India.[7]
          </p>
          <p>
            The service competes primarily with Amazon India and domestic rival
            Snapdeal.[8][9] As of FY23, Flipkart held a 48% market share in the
            Indian e-commerce industry.[10] Flipkart has a dominant position in
            the apparel segment, bolstered by its acquisition of Myntra, and was
            described as being "neck and neck" with Amazon in the sale of
            electronics and mobile phones.[11]
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            ServiceEra's mission is to revolutionize e-commerce in India by
            using technology to create an accessible, affordable, and
            customer-centric ecosystem, as stated by Course Sidekick. Its vision
            is to become the most customer-centric company in India, building a
            place where people can find and discover anything they want to buy
            online. The company also emphasizes a broader vision of empowering
            Indian consumers and businesses, with a focus on sustainability and
            social impact, particularly through initiatives like the ServiceEra
            Foundation.
          </p>
        </div>
      </div>
      <div className="text-xl py-4">
        <Tittle text1={"WHY"} text2={"CHOOSE US"} />
      </div>

      <div className="flex flex-col sm:flex-row text-sm mb-20">
        <div className="border px-10 sm:px-16 py-8 sm:py-20 flex flex-col gap-4 ">
          <b>Quality Assurance</b>
          <p className="text-gray-600">
            ServiceEra Assured Program: Products with this badge undergo six
            rigorous quality checks and are shipped by ServiceEra's best sellers
            using stringent packaging guidelines. This program guarantees
            customers a high-quality product with fast and reliable delivery.
          </p>
        </div>

        <div className="border px-10 sm:px-16 py-8 sm:py-20 flex flex-col gap-4 ">
          <b>Convenience</b>
          <p className="text-gray-600">
            genuine and free from defects before they are delivered. Provides
            24/7 access to an extensive product catalog, breaking geographical
            barriers and offering a wider selection than any physical store.
          </p>
        </div>

        <div className="border px-10 sm:px-16 py-8 sm:py-20 flex flex-col gap-4 ">
          <b>Exceptional Customer Service</b>
          <p className="text-gray-600">
            We are providing support, assistance, and advice that goes beyond a
            customer's expectations, leaving a positive and memorable
            impression. It is not just a function of a business but a strategic
            asset that drives customer satisfaction, loyalty, and brand
            reputation
          </p>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  );
}
