import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="navbar bg-gray-800 text-white py-3 md:py-5 px-4 flex justify-between items-center fixed top-0 z-10">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl md:text-2xl">NoxTree</a>
      </div>
      <div>
        <ul className="flex gap-4">
          <li>
            <Link href="/login">
              <button className="btn btn-sm md:btn-md btn-primary">
                Sign In
              </button>
            </Link>
          </li>
          <li>
            <Link href="/register">
              <button className="btn btn-sm md:btn-md btn-secondary">
                Sign Up
              </button>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
