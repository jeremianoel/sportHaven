import { Link } from "react-router-dom"
import Logo from '../assets/logo.png'
import { useLogout } from "../hooks/useLogout"

const NavBar = () => {
    const token = localStorage.getItem('token')
    const { handleLogout } = useLogout()
    
    if(token)
    {
        return (
        <>
        <nav className="fixed h-[18%] top-0 left-0 w-full flex justify-between bg-white z-50 shadow-md">
            <div className='flex justify-center items-center'>
            <Link to="/"><img src={Logo} className="w-80 my-4 duration-300 cursor-pointer ml-30 hover:scale-110"/>
            </Link>
            </div>
            <ul className="flex m-auto mr-10 space-x-10 text-xl text-end items-center">
                <li className="px-5 list-none"><Link className="px-5 py-2 no-underline duration-300
                 text-emerald-500 rounded-3xl hover:bg-emerald-500 hover:text-white" to={`/profile`}>Profile</Link></li>
                <li className="px-5 list-none"><button onClick={(e) => handleLogout(e)} className="px-5 py-2 no-underline duration-300
                 text-red-500 rounded-3xl hover:bg-red-100 hover:text-red-500 hover:cursor-pointer">Logout</button></li>
            </ul>
        </nav>
        </>
    )
    }

    return (
        <>
        <nav className="fixed h-[18%] top-0 left-0 w-full flex justify-between bg-white z-50 shadow-md">
            <div className='flex justify-center items-center'>
            <Link to="/"><img src={Logo} className="w-80 my-4 duration-300 cursor-pointer ml-30 hover:scale-110"/>
            </Link>
            </div>
            <ul className="flex m-auto mr-10 space-x-10 text-xl text-end items-center">
                <li className="px-5 list-none"><Link className="px-5 py-2 no-underline duration-300
                 text-emerald-500 rounded-3xl hover:bg-emerald-500 hover:text-white" to={`/login`}>Login</Link></li>
                <li className="px-5 list-none"><Link className="px-5 py-2 no-underline duration-300
                 text-emerald-500 rounded-3xl hover:bg-emerald-500 hover:text-white" to={`/register`}>Register</Link></li>
            </ul>
        </nav>
        </>
    )
}

export default NavBar