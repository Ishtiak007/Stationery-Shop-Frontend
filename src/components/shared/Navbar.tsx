/* eslint-disable @typescript-eslint/no-explicit-any */
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
  const dispatch = useAppDispatch();

  let user: any;
  if (token) {
    user = verifyToken(token);
  }

  const cartCount =
    cartData?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  const handleLogOut = () => {
    dispatch(logOut());
  };

  return (
    <nav className="fixed bg-teal-700/70 text-white w-full z-50 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="text-lg sm:text-lg font-bold font-mono text-white"
        >
          STATIONERY STORE
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex space-x-8 items-center">
          <Link to="/" className="hover:text-teal-300 transition">
            Home
          </Link>
          <Link to="/all-product" className="hover:text-teal-300 transition">
            Products
          </Link>

          {/* Mega Menu */}
          <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative"
          >
            <button className="hover:text-teal-300 transition">Featured</button>
            <div
              className={`absolute left-1/2 top-full transform -translate-x-1/2 ${
                isHovered ? "visible opacity-100" : "invisible opacity-0"
              } transition-opacity duration-200 z-50 min-w-[50vw] max-w-4xl bg-white text-black shadow-xl rounded-md p-4`}
            >
              <MegaMenu />
            </div>
          </div>

          <Link to="/about" className="hover:text-teal-300 transition">
            About
          </Link>
          <Link to="/contact-us" className="hover:text-teal-300 transition">
            Contact
          </Link>
          <Link to="/dashboard" className="hover:text-teal-300 transition">
            Dashboard
          </Link>
        </div>

        {/* Right Icons */}
        <div className="flex items-center space-x-4">
          <Link to="/cart" className="relative">
            <HiOutlineShoppingBag size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <button
              onClick={handleLogOut}
              className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-sm rounded-xl transition"
            >
              <LogOutIcon className="w-5 h-5" />
              Logout
            </button>
          ) : (
            <Link to="/login">
              <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-sm rounded-xl transition">
                <LogIn className="w-5 h-5" />
                Login
              </div>
            </Link>
          )}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-gray-800 text-white px-4 pb-4">
          <Link to="/" className="block py-2 hover:text-teal-300">
            Home
          </Link>
          <Link to="/all-product" className="block py-2 hover:text-teal-300">
            Products
          </Link>
          <Link to="/about" className="block py-2 hover:text-teal-300">
            About
          </Link>
          <Link to="/contact-us" className="block py-2 hover:text-teal-300">
            Contact
          </Link>
          <Link to="/dashboard" className="block py-2 hover:text-teal-300">
            Dashboard
          </Link>

          {user ? (
            <button
              onClick={handleLogOut}
              className="block w-full mt-4 bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="block mt-4 bg-teal-600 text-white py-2 rounded-lg text-center hover:bg-teal-700"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
