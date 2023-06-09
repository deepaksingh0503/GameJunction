import React, { useContext } from "react";
// Next Components
import Link from "next/link";
// Custom Components
import Logo from "./Logo";
import NavDropdown from "./NavDropdown";

const Navbar = () => {
  return (
    <>
      <div
        className={`w-full fixed top-0 left-0 sm:h-[100px] h-[80px] bg-white z-[100]`}
      >
        <div className="py-4 sm:py-6 md:py-6 px-4 sm:px-8 md:px-12 flex items-center justify-between">
          <Logo />
          <div className="flex items-center justify-between">
            <div className="hidden md:flex items-center justify-evenly">
              <Link href="/list">
                <button className="tracking-wider hover:bg-yellow-200 shadow-sm bg-gray-100 mx-4 px-4 p-2 rounded-2xl">
                  Explore Events
                </button>
              </Link>
              <Link href="/leaderboard">
                <button className="p-2 rounded-2xl bg-gray-100 hover:bg-yellow-200 shadow-sm px-4 mx-4">
                  Leaderboard
                </button>
              </Link>
            </div>
            <NavDropdown />
          </div>
        </div>
      </div>
      <div className="w-full h-[80px] sm:h-[100px]"></div>
    </>
  );
};

export default Navbar;
