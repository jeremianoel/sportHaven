import { useCategories } from "../hooks/useCategories";
import c_minisoccer from "../assets/c_minisoccer.png";
import c_badminton from "../assets/c_badminton.png";
import c_baseball from "../assets/c_baseball.png";
import c_squash from "../assets/c_squash.png";
import c_hockey from "../assets/c_hockey.png";
import c_running from "../assets/c_running.png";
import c_padel from "../assets/c_padel.png";
import c_tennismeja from "../assets/c_tennismeja.png";
import c_fitnes from "../assets/c_fitnes.png";
import c_elektronik from "../assets/c_elektronik.png";
import c_billiard from "../assets/c_billiard.png";
import c_panah from "../assets/c_panah.png";
import c_bulutangkis from "../assets/Badminton.png"
import c_futsal from "../assets/Futsal.png"
import c_basket from "../assets/c_basket.png"
import c_golf from "../assets/c_golf.png"
import c_tenis from "../assets/c_tenis.png"
import c_aerobik from "../assets/c_aerobik.png"
import Volley from "../assets/c_volley.png";

import DefaultImage from "../assets/landingpage.png"
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const Categories = () => {
    const {categories, prevPage, nextPage, page} = useCategories()
    const categoryImages = {
      "Mini Soccer": c_minisoccer,
      "Badminton": c_badminton,
      "Baseball": c_baseball,
      "Squash": c_squash,
      "Hockey": c_hockey,
      "Running": c_running,
      "Padel": c_padel,
      "Tenis Meja": c_tennismeja,
      "Fitnes": c_fitnes,
      "Billiard": c_billiard,
      "Bulu Tangkis": c_bulutangkis,
      "panah": c_panah,
      "Futsal": c_futsal,
      "Basketball": c_basket,
      "Elektronik": c_elektronik,
      "lari sendiri": c_running,
      "Sepak Bola": c_futsal,
      "Golf": c_golf,
      "Volley": Volley,
      "Tenis": c_tenis,
      "Aerobik": c_aerobik
    }

    return(
        <div className="flex flex-col items-center h-auto justify-center bg-gray-900">
          <div className="flex flex-col w-[20%]">
        <h1 className="mb-5 text-4xl font-semibold text-center text-white mt-12">Sport Categories</h1>
        <hr className="border-0 h-1 bg-emerald-500 w-full transform -skew-x-50" />
          </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10 px-6 py-10 place-items-center">
  {categories?.map((category) => (
    <div
      key={category.id}
      className="rounded-2xl border-white border-3 hover:scale-115 duration-200 flex justify-center items-center w-55 h-30 bg-center bg-cover text-white"
      style={{
        backgroundImage: `url(${categoryImages[category.name] || DefaultImage})`,
      }}
    >
      <p className="font-semibold text-3xl">{category.name}</p>
    </div>
  ))}
</div>
<div className="flex gap-15 mb-6">
  <button
        onClick={prevPage}
        disabled={page === 1}
        className={`min-w-[35px] h-[35px] rounded-full grid place-items-center ${page === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-black hover:scale-120 duration-200 cursor-pointer"
          }`}>
    <MdKeyboardArrowLeft className="text-white"/>
  </button>
  <button
        onClick={nextPage}
        disabled={page === 2}
        className={`min-w-[35px] h-[35px] rounded-full grid place-items-center ${page === 2
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-black hover:scale-120 duration-200 cursor-pointer"
          }`}>
    <MdKeyboardArrowRight className="text-white"/>
  </button>
</div>
    </div>
    )
}

export default Categories