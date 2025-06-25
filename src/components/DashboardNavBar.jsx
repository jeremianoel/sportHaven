import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout"
import Logo from '../assets/logo2.png'
import { MdSpaceDashboard } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { MdOutlineSportsCricket } from "react-icons/md";
import { GrTransaction } from "react-icons/gr";
import { RiLogoutBoxRFill } from "react-icons/ri";

const DashboardNavBar = () => {
    const {handleLogout} = useLogout()

    return(
    <div className="fixed top-0 left-0 h-full w-[17%] bg-gray-900 flex flex-col items-center justify-start pt-5 shadow-md z-50">
    <img src={Logo} className="w-[85%] py-5"/>
    <div className="flex flex-col gap-7 text-white text-md items-center mt-10 w-full">
    <Link
        to="/dashboard"
        className="flex gap-4 items-center justify-start hover:bg-emerald-500 w-[75%] text-start px-3 py-1 rounded-md duration-100 hover:cursor-pointer"
    >
        <MdSpaceDashboard className="size-5" />
        <span>Dashboard</span>
    </Link>

    <Link
        to="/dashboard/categories"
        className="flex gap-4 items-center justify-start hover:bg-emerald-500 w-[75%] text-start px-3 py-1 rounded-md duration-100 hover:cursor-pointer"
    >
        <BiCategory className="size-5" />
        <span>Categories</span>
    </Link>

    <Link
        to="/dashboard/activities"
        className="flex gap-4 items-center justify-start hover:bg-emerald-500 w-[75%] text-start px-3 py-1 rounded-md duration-100 hover:cursor-pointer"
    >
        <MdOutlineSportsCricket className="size-5" />
        <span>Activities</span>
    </Link>

    <Link
        to="/dashboard/transaction"
        className="flex gap-4 items-center justify-start hover:bg-emerald-500 w-[75%] text-start px-3 py-1 rounded-md duration-100 hover:cursor-pointer"
    >
        <GrTransaction className="size-5" />
        <span>Transaction</span>
    </Link>

    <button
        onClick={handleLogout}
        className="flex gap-4 items-center justify-start hover:bg-red-500 w-[75%] text-start px-3 py-1 rounded-md duration-100 text-white hover:cursor-pointer"
    >
        <RiLogoutBoxRFill className="size-5" />
        <span>Logout</span>
    </button>
    </div>
    </div>
    )
}

export default DashboardNavBar