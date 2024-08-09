import { useDispatch, useSelector } from "react-redux";
import { NETFLIX_LOGO_URL } from "../Utils/constants";
import { auth } from "../Utils/firebase";
import { signOut } from "firebase/auth";
import { removeRecommendations } from "../Utils/recommendationsSlice";
import { Link } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const isUser = useSelector((store) => store.user);

  const handleSignOut = () => {
    // Sign out logic
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
        <img
          src={NETFLIX_LOGO_URL}
          className={`w-44 md:ml-4 ${!isUser ? "mx-auto md:ml-4" : ""}`}
          alt="Netflix Logo"
        />
        {isUser ? (
          <div>
            <Link to="/browse">
              <button
                className="text-white bg-red-600 px-3 py-1 rounded hover:bg-red-700 mr-10 transition duration-300"
                onClick={handleRecommendations}
              >
                Home
              </button>
            </Link>
            <Link to="/search">
              <button className="text-white bg-red-600 px-3 py-1 rounded hover:bg-red-700 mr-10 transition duration-300">
                AI Recommends
              </button>
            </Link>
            <button
              onClick={handleSignOut}
              className="text-white bg-red-600 px-3 py-1 rounded hover:bg-red-700 mr-10 transition duration-300"
            >
              Sign Out
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Navbar;
