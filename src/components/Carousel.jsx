import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const CarouselComp = (props) => {
  const slides = [
    { img: props.img1, caption: "Badminton" , address: "Jalan Anggrek Biru No. 103"},
    { img: props.img2, caption: "Futsal" , address: "Jalan Kenanga Putih No. 89"},
    { img: props.img3, caption: "Basket" , address: "Jalan Mawar Ungu No. 45"},
    { img: props.img4, caption: "Volley" , address: "Jalan Dahlia No. 68"},
    { img: props.img5, caption: "Tennis" , address: "Jalan Melati Merah No. 57"},
  ];

  return (
    <Carousel
      showThumbs={false}
      infiniteLoop
      showArrows={false}
      autoPlay
      interval={2500}
      showStatus={false}
    >
      {slides.map((slide, index) => (
        <div key={index} className="relative">
          <img src={slide.img} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
          <div className="text-start absolute bottom-3 right-4 bg-gray-900/80 text-emerald-500 text-sm px-3 py-2 rounded w-max">
          <p className="font-bold">{slide.caption}</p>
          <p className="text-sm text-white">{slide.address}</p>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default CarouselComp;
