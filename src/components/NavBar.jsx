import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import { useLogout } from "../hooks/useLogout";
import { useState } from "react";
import { HiMenu  } from "react-icons/hi";
import { MdKeyboardArrowRight } from "react-icons/md";

const NavBar = () => {
  const token = localStorage.getItem("token");
  const { handleLogout } = useLogout();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = token ? (
    <>
    <ul className="md:flex md:gap-10">
      <li>
        <Link to="/profile" onClick={() => setMenuOpen(false)} className="block px-4 py-2 text-emerald-500 hover:bg-emerald-100 rounded-lg duration-200">Profile</Link>
      </li>
      <li>
        <button
          onClick={(e) => {
            handleLogout(e);
            setMenuOpen(false);
          }}
          className="block px-4 py-2 text-red-500 hover:bg-red-100 rounded-lg hover:cursor-pointer duration-200"
        >
          Logout
        </button>
      </li>
      </ul>
    </>
  ) : (
    <><ul className="md:flex md:gap-10">
      <li>
        <Link to="/login" onClick={() => setMenuOpen(false)} className="block px-4 py-2 text-emerald-500 hover:bg-emerald-100 rounded-lg duration-200">Login</Link>
      </li>
      <li>
        <Link to="/register" onClick={() => setMenuOpen(false)} className="block px-4 py-2 text-emerald-500 hover:bg-emerald-100 rounded-lg duration-200">Register</Link>
      </li>
      </ul>
    </>
  );

  return (
    <nav className="w-full flex justify-between items-center bg-white shadow-md fixed top-0 left-0 z-50 overflow-x-hidden px-4 sm:px-10 py-2">
      <div className="w-full mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" onClick={() => setMenuOpen(false)}>
          <img
            src={Logo}
            className="w-44 sm:w-64 my-4 duration-200 cursor-pointer ml-4 sm:ml-12 hover:scale-110"
            />

        </Link>
        <ul className="hidden md:flex items-center text-lg">{navItems}</ul>
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}
            className={`${menuOpen ? 'border-2 border-emerald-500 w-6 h-6 rounded-full grid place-items-center bg-white' : ''}`}>
            {menuOpen ? (
              <MdKeyboardArrowRight  className="size-5 text-emerald-500" />
            ) : (
              <HiMenu className="size-7 text-emerald-500" />
            )}
          </button>
        </div>
      </div>
      {menuOpen && (
        <ul className="md:hidden rounded-md py-1 text-lg">
          {navItems}
        </ul>
      )}
    </nav>
  );
};

export default NavBar;
