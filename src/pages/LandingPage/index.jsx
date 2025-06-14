import { useState } from "react";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import CarouselComp from "../../components/Carousel";
import Badminton from "../../assets/Badminton.png";
import Futsal from "../../assets/Futsal.png";
import Basket from "../../assets/Basket.png";
import Tennis from "../../assets/Tennis.png";
import Volley from "../../assets/Volley.png";
import Categories from "../../components/Categories";
import Reviews from "../../components/Reviews";
import { Link } from "react-router-dom";

const LandingPage = () => {
    return(
        <>
        <div className="container min-h-screen bg-[url('./assets/landingpage.png')] bg-center bg-cover pt-38 bg-fixed">
        <NavBar/>
        <div className="max-w-xl mt-48 ml-auto mr-10 text-right text-white">
            <h1 className="text-5xl font-semibold leading-normal mb-5">All-in-One Sports Community Website.</h1>
            <p className="text-lg">A platform to book sports activities, find matches in your area, and connect with new people.
            Making sports more accessible, more social, and way more fun!
            </p>
            <div className="mt-10">
                <Link to={"/activities"} className="px-6 py-2 font-medium text-white duration-200 bg-emerald-500 rounded-3xl 
                outline-2 outline-transparent hover:bg-white hover:text-emerald-500 
                hover:outline-emerald-500 hover:outline-4">Book Here!</Link>
            </div>
        </div>
    </div>
    <div className="container flex flex-row-reverse text-right items-center justify-center min-h-screen gap-20 py-50">
        <div className="w-150 rounded-xl">
        <CarouselComp img1={Badminton} img2={Futsal} img3={Basket} img4={Volley} img5={Tennis}/>
        </div>
        <div className="max-w-lg">
            <h1 className="mb-5 text-4xl font-semibold leading-normal text-emerald-500">SportHaven – A Haven for Sport Enthusiasts</h1>
            <p className="text-lg text-gray-900">SportHaven is a smart platform that makes it easy to find and book sports activities — fast and practical.</p>
            <p className="text-lg mt-5 text-gray-900">We believe that sports aren’t just about fitness — they’re about community, connection, and growth.</p>
        </div>
    </div>
    <Categories/>
    <Reviews/>
        <Footer/>
        </>
    )
}

export default LandingPage