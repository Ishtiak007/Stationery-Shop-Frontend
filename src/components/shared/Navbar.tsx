/* eslint-disable @typescript-eslint/no-explicit-any */
// @typescript-eslint/no-explicit-any
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, User } from "lucide-react";

import { HiOutlineShoppingBag } from "react-icons/hi2";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logOut, useCurrentToken } from "@/redux/features/auth/authSlice";
import { useGetMeQuery } from "@/redux/features/auth/authApi";
import { verifyToken } from "@/utils/verifyToken";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const token = useAppSelector(useCurrentToken);
  const cartData = useAppSelector((state) => state?.cart);
  const dispacth = useAppDispatch();

  const { data: myData } = useGetMeQuery(undefined);
  const initials: string = myData?.data?.name as string;

  let user: any;
  if (token) {
    user = verifyToken(token);
  }

  const cartCount = cartData?.items[0]?.quantity || 0;

  const dashboardLink =
    user?.role === "admin"
      ? "/dashboard"
      : user?.role === "user"
      ? "/dashboard"
      : "/";

  const handleLogOut = () => {
    dispacth(logOut());
  };

  const [position, setPosition] = useState("bottom");
  return (
    <nav className="fixed bg-opacity-50 bg-teal-800 dark:bg-gray-900 text-black dark:text-white  font-orbitron  border-radius-2xl  overflow-hidden shadow-lg z-10 w-full">
      {/* Container */}
      <div className="container mx-auto flex justify-around items-center py-4 px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-black  font-mono text-[8px] md:text:sm lg:text-xl font-bold ml-2">
            STATIONERY STORE
          </span>
        </Link>

        {/* Desktop Search Bar */}
        <div className="hidden lg:flex items-center w-1/3">
          <div className="space-x-6 p-2 md:flex items-center justify-center text-black">
            <button className="relative font-medium after:block after:h-[4px] after:w-0 after:bg-[#115E59] after:transition-all after:duration-300 after:absolute after:left-0 after:bottom-0 hover:after:w-full">
              <Link to={"/"}>Home</Link>
            </button>
            <button className="relative font-medium after:block after:h-[4px] after:w-0 after:bg-[#115E59] after:transition-all after:duration-300 after:absolute after:left-0 after:bottom-0 hover:after:w-full">
              <Link to={"/all-product"}>Products</Link>
            </button>
            <button className="relative font-medium after:block after:h-[4px] after:w-0 after:bg-[#115E59] after:transition-all after:duration-300 after:absolute after:left-0 after:bottom-0 hover:after:w-full">
              <Link to={"/about"}>About</Link>
            </button>
          </div>

          {/* <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600" /> */}
        </div>

        {/* Icons and Menu */}
        <div className="flex items-center justify-center md:space-x-4">
          <Link to="/cart" className="relative">
            <HiOutlineShoppingBag size={25} />
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          </Link>

          {user ? (
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant={"default"}>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <User size={30} />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="font-orbitron font-bold uppercase">
                            {initials}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-56 font-orbitron">
                  {/* <DropdownMenuLabel className="mt-2">Panel Position</DropdownMenuLabel> */}
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup
                    value={position}
                    onValueChange={setPosition}
                  >
                    <DropdownMenuRadioItem value="bottom">
                      {/* dashboard */}
                      <Link to={dashboardLink}>
                        <Button variant={"outline"}>
                          <p className="font-bold font-orbitron">Dashboard</p>
                        </Button>
                      </Link>
                    </DropdownMenuRadioItem>

                    <DropdownMenuRadioItem value="right">
                      {/* log out */}
                      <Button onClick={handleLogOut} variant={"outline"}>
                        <p className="font-bold font-orbitron">Log Out</p>
                      </Button>
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <Link to="/register">
              <User size={24} />
            </Link>
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
