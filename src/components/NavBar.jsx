import { Link, useNavigate} from "react-router-dom"
import Logo from '../assets/logo.png'

const NavBar = () => {
    // const token = localStorage.getItem('token')
    // const navigate = useNavigate()

    // const handeLogOut = () =>{
    //     localStorage.removeItem('token')
    //     alert("Successfully logged out!")
    //     navigate('/') 
    // }

    // if(token)
    // {
    //     return(
    //         <nav className="fixed top-0 left-0 w-full flex justify-between items-center text-xl bg-[rgb(255,255,255,0.99)] z-50">
    //         <div className='flex justify-center'>
    //         <Link to="/"><img src={Logo} className="brightness-95 w-80 h-17 my-4 duration-300 cursor-pointer ml-30 hover:scale-105"/>
    //         </Link>
    //         </div>
    //         <div className="flex items-center gap-30">
    //             <Link className="px-5 py-2 no-underline duration-300
    //              text-cyan-600 rounded-3xl hover:bg-cyan-600 hover:text-white" to={`/dashboard`}>Profile List</Link>
    //             <div className="px-5 py-2 no-underline duration-300 gap-1
    //              text-cyan-600 rounded-3xl hover:bg-cyan-600 hover:text-white mr-15 flex items-center hover:cursor-pointer">
    //             <button className="hover:cursor-pointer" onClick={handeLogOut}>Logout</button>
    //              <svg className="w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
    //              stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" 
    //              strokeWidth="1" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 002 2h3a2 2 0 002-2V7a2 2 0 00-2-2h-3a2 2 0 00-2 2v1">
    //             </path></svg>
    //         </div>
    //         </div>
    //     </nav>
    //     )
    // }

    return (
        <>
        <nav className="fixed top-0 left-0 w-full flex justify-between bg-white z-50 shadow-md">
            <div className='flex justify-center'>
            <Link to="/"><img src={Logo} className="w-80 my-4 duration-300 cursor-pointer ml-30 hover:scale-110"/>
            </Link>
            </div>
            <ul className="flex m-auto mr-10 space-x-10 text-xl text-end">
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