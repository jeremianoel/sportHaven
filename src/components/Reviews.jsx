import { useState } from "react";
import Foto1 from "../assets/Foto1.png";
import Foto2 from "../assets/Foto2.png";
import Foto3 from "../assets/Foto3.png";
import Foto4 from "../assets/Foto4.png";
import Foto5 from "../assets/Foto5.png";
import Foto6 from "../assets/Foto6.png";
import LandingPage2 from "../assets/landingpage2.jpg";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const Reviews = () => {
  const reviews = [
    {
      name: "Andi S.",
      rating: 5,
      photo: Foto1,
      content:
        `"Booking a futsal court has never been this easy! The platform is super smooth, and I even found new teammates through the community feature. Love how everything is just a few clicks away!"`,
    },
    {
      name: "Rina M.",
      rating: 5,
      photo: Foto2,
      content:
        `"I love using the app to find basketball games in my area. It’s reliable, fast, and I’ve met some great people through it!"`,
    },
    {
      name: "Yusuf A.",
      rating: 4,
      photo: Foto3,
      content:
        `"Clean UI, great features. Booked a badminton session last minute and it went perfectly. Definitely recommend!"`,
    },
    {
    name: "James P.",
    rating: 5,
    photo: Foto4, 
    content:
        `"SportHaven makes organizing weekly matches with my friends so easy. We just book, show up, and play. It saves us so much hassle!"`,
    },
    {
    name: "Nadia R.",
    rating: 4,
    photo: Foto5, 
    content:
        `"I used to waste time checking schedules and availability. Now I do everything from my phone in seconds. Game-changer!"`,
    },
    {
    name: "Tommy W.",
    rating: 5,
    photo: Foto6, 
    content:
        `"From badminton to yoga — everything’s here! I also love the community vibes, it really motivates me to stay active."`,
    },

  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentReview = reviews[currentIndex];

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleNext = () => {
    if (currentIndex < reviews.length - 1) setCurrentIndex(currentIndex + 1);
  };

  return (
    <div
      className="items-center bg-cover bg-top justify-center flex h-180 bg-black"
      style={{ backgroundImage: `url(${LandingPage2})` }}
    >
      <div className="flex flex-col lg:flex-row h-auto rounded-2xl bg-white/95 w-[90%] lg:w-[70%] justify-around items-center px-4 lg:px-6 py-8 gap-6">

        <h1 className="text-2xl lg:text-4xl font-semibold text-gray-900 w-full lg:w-90 leading-normal text-center lg:text-left px-2">

          See what our <span className="font-bold text-emerald-500">players</span> say about us!
        </h1>
        <div className="flex items-center justify-between gap-4">
            <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
        className={`min-w-[30px] h-[30px] rounded-full grid place-items-center ${currentIndex === 0
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-black hover:scale-120 duration-200 hover:cursor-pointer"
              }`}>
        <MdKeyboardArrowLeft className="text-white"/>
      </button>
           <div className="w-full lg:w-120 bg-white shadow-xl rounded-xl p-5 flex flex-col justify-between">

          <div className="flex gap-5">
            <img className="rounded-full w-16 h-16 object-cover" src={currentReview.photo} />
            <div>
              <p className="font-bold text-lg">{currentReview.name}</p>
              <p className="text-yellow-400 text-lg">{"★".repeat(currentReview.rating)}</p>
            </div>
          </div>
          <p className="mt-4 text-sm leading-6">{currentReview.content}</p>
          <div className="flex justify-between mt-5">
          </div>
        </div>
        <button
            onClick={handleNext}
            disabled={currentIndex === reviews.length - 1}
        className={`min-w-[30px] h-[30px] rounded-full grid place-items-center ${currentIndex === reviews.length - 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-black hover:scale-120 duration-200 hover:cursor-pointer"
              }`}>
        <MdKeyboardArrowRight className="text-white"/>
      </button>
        </div>
        
      </div>
    </div>
  );
};

export default Reviews;
