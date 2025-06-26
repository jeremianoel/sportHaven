import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const CarouselComp = ({ img1, img2, img3, img4, img5 }) => {
  const slides = [
    { img: img1, caption: "Badminton", address: "Jalan Anggrek Biru No. 103" },
    { img: img2, caption: "Futsal", address: "Jalan Kenanga Putih No. 89" },
    { img: img3, caption: "Basket", address: "Jalan Mawar Ungu No. 45" },
    { img: img4, caption: "Volley", address: "Jalan Dahlia No. 68" },
    { img: img5, caption: "Tennis", address: "Jalan Melati Merah No. 57" },
  ];

  return (
    <Carousel
      showThumbs={false}
      infiniteLoop
      showArrows={false}
      autoPlay
      interval={2500}
      showStatus={false}
      className="rounded-xl overflow-hidden"
    >
      {slides.map((slide, index) => (
        <div key={index} className="relative">
          <img
            src={slide.img}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover rounded-xl"
          />

          <div className="absolute top-3 sm:top-auto sm:left-auto left-3 sm:bottom-3 sm:right-3 bg-gray-900/80 text-sm sm:text-start py-2 text-start px-2 sm:px-4 sm:py-2 rounded-lg max-w-[80%] sm:max-w-[32%]">
            <p className="font-bold text-emerald-400 text-xs sm:text-sm md:text-start">{slide.caption}</p>
            <p className="text-white text-xs sm:text-sm">{slide.address}</p>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default CarouselComp;
