import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../Utils/firebase";
import { signOut } from "firebase/auth";
import { removeRecommendations } from "../Utils/recommendationsSlice";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import logo from "../Assets/logo.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const isUser = useSelector((store) => store.user);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        console.error(error);
      });
  };

  const handleRecommendations = () => {
    dispatch(removeRecommendations());
  };

  return (
    <div>
      <div className="absolute z-20 bg-gradient-to-b from-black w-full flex justify-between items-center p-4">
        <Link to="/browse">
          <img
            src={logo}
            className={`w-32 md:w-44 md:ml-4 ${
              !isUser ? "mx-auto md:ml-4" : ""
            }`}
            alt="CineBot Logo"
          />
        </Link>
        {isUser && (
          <>
            {/* Mobile Hamburger Menu Icon */}
            <div className="md:hidden">
              <GiHamburgerMenu
                className="text-white w-8 h-8 cursor-pointer"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              />
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex md:items-center md:space-x-4 md:ml-auto">
              <Link to="/browse">
                <button
                  className="text-white bg-red-600 px-3 py-1 rounded hover:bg-red-700 transition duration-300"
                  onClick={handleRecommendations}
                >
                  Home
                </button>
              </Link>
              <Link to="/search">
                <button className="text-white bg-red-600 px-3 py-1 rounded hover:bg-red-700 transition duration-300">
                  AI Recommends
                </button>
              </Link>
              <Link to="/favourites">
                <button className="text-white bg-red-600 px-3 py-1 rounded hover:bg-red-700 transition duration-300">
                  Favourites
                </button>
              </Link>
              <button
                onClick={handleSignOut}
                className="text-white bg-red-600 px-3 py-1 rounded hover:bg-red-700 transition duration-300"
              >
                Sign Out
              </button>
            </div>
          </>
        )}
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed z-50 bg-black h-screen w-full top-0 transition-transform duration-300 transform ${
          isMenuOpen && isUser ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="absolute top-0 left-0 z-[-2] h-full w-full bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
        <div className="flex justify-end p-4">
          <IoMdClose
            className="text-white w-8 h-8 cursor-pointer"
            onClick={() => setIsMenuOpen(false)}
          />
        </div>
        <div className="flex flex-col items-end pr-4 pt-8 space-y-8">
          <Link to="/browse" onClick={() => setIsMenuOpen(false)}>
            <span
              className="border-b-2 border-red-600 pb-1  text-white text-xl hover:text-red-600 transition duration-300 cursor-pointer"
              onClick={handleRecommendations}
            >
              Home
            </span>
          </Link>
          <Link to="/search" onClick={() => setIsMenuOpen(false)}>
            <span className="border-b-2 border-red-600 pb-1  text-white text-xl hover:text-red-600 transition duration-300 cursor-pointer">
              AI Recommends
            </span>
          </Link>
          <Link to="/favourites" onClick={() => setIsMenuOpen(false)}>
            <span className="border-b-2 border-red-600 pb-1  text-white text-xl hover:text-red-600 transition duration-300 cursor-pointer">
              Favourites
            </span>
          </Link>
          <span
            onClick={() => {
              handleSignOut();
              setIsMenuOpen(false);
            }}
            className="border-b-2 border-red-600 pb-1  text-white text-xl hover:text-red-600 transition duration-300 cursor-pointer"
          >
            Sign Out
          </span>
          <div className="flex justify-around w-[35%] text-3xl">
            <a
              href="https://x.com/LakshitAgarwal7 "
              target="_blank"
              className="text-white"
            >
              <FaXTwitter />
            </a>
            <a
              href="https://www.linkedin.com/in/lakshit-agarwal-6082b9216/ "
              target="_blank"
              className=" text-blue-500"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://www.instagram.com/lakshit.7811/ "
              target="_blank"
              className="text-pink-500"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
