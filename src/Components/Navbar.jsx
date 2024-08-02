import { useSelector } from "react-redux";
import { NETFLIX_LOGO_URL } from "../Utils/constants";
import { auth } from "../Utils/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const isUser = useSelector((store) => store.user);

  const handleSignOut = () => {
    // Sign out logic
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <div className="absolute z-10 bg-gradient-to-b from-black w-screen flex justify-between items-center p-4">
        <img src={NETFLIX_LOGO_URL} className="w-44 ml-4" alt="Netflix Logo" />
        {isUser ? (
          <button
            onClick={handleSignOut}
            className="text-white bg-red-600 px-3 py-2 rounded hover:bg-red-700 mr-10 transition duration-300"
          >
            Sign Out
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default Navbar;
