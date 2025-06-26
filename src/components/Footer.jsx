import facebook from "../assets/facebook.png";
import ig from "../assets/instagram.png";
import x from "../assets/twitter.png";
import Logo2 from "../assets/logo2.png"
import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<div id="footer" className="max-w-full h-auto bg-gray-900 text-white flex flex-col justify-between items-start text-start">
        <div className="flex flex-col lg:flex-row justify-around items-center sm:items-start w-full mt-6 mb-4 gap-3 lg:gap-0 px-6 text-center lg:text-left">
            <div className='flex justify-center'>
            <img onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
                src={Logo2} 
                className="w-55 sm:w-75 py-1 duration-300 cursor-pointer hover:scale-110 mx-auto lg:mx-0"/>
            </div>
            <div className="mt-3 space-y-2">
            <h1 className="mb-3 text-lg font-semibold">Contact Us</h1>
            <ul className="text-md space-y-1">
                <li>Jalan Tomang Raya No.22 A</li>
                <li>+628123123123</li>
                <li>sporthaven@gmail.com</li>
            </ul>
            </div>
            <div className="flex flex-col items-center lg:items-start mt-3 space-y-3">
            <h1 className="text-lg font-semibold">Follow Us</h1>
            <div className="flex items-center justify-center gap-4">
                <a href="https://www.facebook.com/" target="_blank"><img src={facebook} className="duration-300 size-11 hover:scale-130"/></a>
                <a href="https://www.instagram.com/" target="_blank"><img src={ig} className="duration-300 size-11 hover:scale-130"/></a>
                <a href="https://www.x.com/" target="_blank"><img src={x} className="duration-300 size-11 hover:scale-130"/></a>
            </div>
            </div>
        </div>
        <hr className="my-4 border-t border-white w-[95%] mx-auto" />
        <p className="w-full mb-3 text-center text-sm lg:text-base">
        <span className="text-emerald-500">© 2025 SportHaven.</span> All rights reserved.
        </p>
    </div>
	)
};

export default Footer;
