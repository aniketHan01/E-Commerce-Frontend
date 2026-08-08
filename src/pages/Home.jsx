import React from "react";
import Hero from "../Components/Hero";
import LatestCollection from "../Components/LatestCollection";
import Bestseller from "../Components/Bestseller";
import OurPolicy from "../Components/Ourpolicy";
import NewsLetter from "../Components/NewsLetterBox";

export default function Home() {
  return (
    <>
      <div>
        <Hero />
        <LatestCollection />
        <Bestseller />
        <OurPolicy />
        <NewsLetter />
      </div>
    </>
  );
}
