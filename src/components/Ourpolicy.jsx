import { assets } from "../assets/assets";

export default function OurPolicy() {
  return (
    <div className="flex flex-col sm:flex-row justify-around gap-12 sm-gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700">
      <div>
        <img
          src={assets.exchange_icon}
          alt="exchange"
          className="w-12 m-auto mb-5"
        />
        <p className="font-smibold">Easy Exchange policy</p>
        <p className="text-gray-400"> We offer hassel free exchange policy</p>
      </div>

      <div>
        <img
          src={assets.quality_icon}
          alt="exchange"
          className="w-12 m-auto mb-5"
        />
        <p className="font-smibold">7 Days return policy</p>
        <p className="text-gray-400"> We provide 7 Days free return policy</p>
      </div>

      <div>
        <img
          src={assets.support_img}
          alt="exchange"
          className="w-12 m-auto mb-5"
        />
        <p className="font-smibold">Best customer support</p>
        <p className="text-gray-400"> We provide 24/7 customer support</p>
      </div>
    </div>
  );
}
