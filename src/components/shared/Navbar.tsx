/* eslint-disable @typescript-eslint/no-explicit-any */
// @typescript-eslint/no-explicit-any
import { useState } from "react";
import { Link } from "react-router-dom";
import { LogIn, LogOutIcon, Menu, X } from "lucide-react";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logOut, useCurrentToken } from "@/redux/features/auth/authSlice";
import { verifyToken } from "@/utils/verifyToken";
import { Button } from "../ui/button";
import MegaMenu from "@/pages/Home/MegaMenu/MegaMenu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const token = useAppSelector(useCurrentToken);
  const cartData = useAppSelector((state) => state?.cart);
  const dispacth = useAppDispatch();

  let user: any;
  if (token) {
    user = verifyToken(token);
  }

  const cartCount = cartData?.items[0]?.quantity || 0;

  const handleLogOut = () => {
    dispacth(logOut());
  };

  return (
    <nav className="fixed bg-opacity-75 bg-teal-800 dark:bg-gray-900 text-white dark:text-white shadow-lg z-10 w-full">
      {/* Container */}
      <div className="container mx-auto flex justify-around items-center py-4 px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-white  font-mono text-[8px] md:text:sm lg:text-xl font-bold ml-2">
            STATIONERY STORE
          </span>
        </Link>

        {/* Desktop Search Bar */}
        <div className="hidden lg:flex justify-center items-center w-2/3">
          <div className="space-x-6 p-2 md:flex items-center justify-center text-white">
            <button className="relative font-medium after:block after:h-[4px] after:w-0 after:bg-teal-300 after:transition-all after:duration-300 after:absolute after:left-0 after:bottom-0 hover:after:w-full">
              <Link to={"/"}>Home</Link>
            </button>
            <button className="relative font-medium after:block after:h-[4px] after:w-0 after:bg-teal-300 after:transition-all after:duration-300 after:absolute after:left-0 after:bottom-0 hover:after:w-full">
              <Link to={"/all-product"}>Products</Link>
            </button>

            {/* Mega menu */}
            <div
              className="relative"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <button className="NavigationLink font-medium relative after:block after:h-[4px] after:w-0 after:bg-teal-300 after:transition-all after:duration-300 after:absolute after:left-0 after:bottom-0 hover:after:w-full">
                Featured
              </button>

              <div
                className={`absolute left-1/2 top-full transform -translate-x-1/2 ${
                  isHovered ? "visible opacity-100" : "invisible opacity-0"
                } transition-opacity duration-200 z-50 min-w-[50vw] max-w-4xl`}
              >
                <MegaMenu />
              </div>
            </div>

            <button className="relative font-medium after:block after:h-[4px] after:w-0 after:bg-teal-300 after:transition-all after:duration-300 after:absolute after:left-0 after:bottom-0 hover:after:w-full">
              <Link to={"/about"}>About</Link>
            </button>

            <button className="relative font-medium after:block after:h-[4px] after:w-0 after:bg-teal-300 after:transition-all after:duration-300 after:absolute after:left-0 after:bottom-0 hover:after:w-full">
              <Link to={"/contact-us"}>Contact Us</Link>
            </button>
            <button className="relative font-medium after:block after:h-[4px] after:w-0 after:bg-teal-300 after:transition-all after:duration-300 after:absolute after:left-0 after:bottom-0 hover:after:w-full">
              <Link to={"/dashboard"}>Dashboard</Link>
            </button>
          </div>
        </div>

        {/* Icons and Menu */}
        <div className="flex items-center justify-center md:space-x-4">
          <Link to="/cart" className="relative">
            <HiOutlineShoppingBag size={27} />
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          </Link>

          {user ? (
            <div onClick={handleLogOut}>
              <span className="hover:cursor-pointer border border-neutral-300 px-4 flex py-[6px] gap-3 items-center font-medium rounded-xl hover:bg-teal-800 hover:text-white my-4 mt-2 bg-teal-700 text-white text-sm sm:text-base">
                <LogOutIcon className="w-6 h-6" /> Logout
              </span>
            </div>
          ) : (
            <div className="hidden lg:flex">
              <Link to={"/login"}>
                <span className="hover:cursor-pointer border border-neutral-300 px-4 flex py-[6px] gap-3 items-center font-medium rounded-xl hover:bg-teal-800 hover:text-white my-4 mt-2 bg-teal-700 text-white text-sm sm:text-base">
                  <LogIn className="w-6 h-6" /> Login
                </span>
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <Button className="lg:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </Button>
        </div>
      </div>

      {/* mobile */}
      {isOpen && (
        <div className="lg:hidden bg-white shadow-md">
          <Link
            to="/"
            className="block py-2 px-4 text-[10px] hover:bg-gray-200"
          >
            Home
          </Link>
          <Link
            to="/all-product"
            className="block py-2 px-4 text-[10px] hover:bg-gray-200"
          >
            Products
          </Link>
          <Link
            to="/about"
            className="block py-2 px-4 text-[10px] hover:bg-gray-200"
          >
            About
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
