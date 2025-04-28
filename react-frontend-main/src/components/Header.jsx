import { Link, useNavigate } from "react-router-dom";
import Logo from "../resources/images/logo.png";
import clientService from "../api/clients/clientService";
import { useState } from "react";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await clientService.logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
      <header className="relative md:bg-gradient-to-b from-[rgb(0,0,0)] from-95% to-orange-500 bg-gradient-to-t text-white shadow-2xs shadow-amber-600 ">
        {/* Container with responsive layout */}
        <div className="container mx-auto px-4">
          {/* Desktop layout - logo left, nav right */}
          <div className="hidden md:flex items-center justify-between h-28">
            {/* Logo - left aligned */}
            <div className="flex-shrink-0">
              <Link to="/">
                <img src={Logo} alt="Logo" className="w-32 h-auto" />
              </Link>
            </div>

            {/* Desktop navigation */}
            <nav id="Desktop-nav" className="flex pr-10 space-x-6 font-semibold">
              <Link
                  to="/"
                  className="rounded w-48 text-center text-orange-400 bg-transparent px-2 py-1"
              >
                Marché
              </Link>
              <Link
                  to="/login"
                  className="rounded w-48 text-center text-orange-500 bg-transparent px-2 py-1"
              >
                Espace client
              </Link>
              <Link
                  to="/registration"
                  className="rounded w-48 text-center text-orange-600 bg-transparent px-2 py-1"
              >
                Devenir client
              </Link>
            </nav>
          </div>

          {/* Mobile layout - logo top, links below */}
          <div className="md:hidden flex flex-col">
            {/* Logo - centered */}
            <div className="py-4 flex justify-center">
              <img src={Logo} alt="Logo" className="w-32 h-auto" />
            </div>

            {/* Mobile navigation */}
            <nav className="pb-4 font-mono flex flex-col items-center space-y-3">
              <Link
                  to="/"
                  className="text-orange-400 px-2 py-1"
              >
                Marché
              </Link>
              <Link
                  to="/login"
                  className="text-orange-500 px-2 py-1"
              >
                Espace client
              </Link>
              <Link
                  to="/registration"
                  className="text-orange-600 px-2 py-1"
              >
                Devenir client
              </Link>
            </nav>
          </div>
        </div>
      </header>
  );
};

export default Header;
