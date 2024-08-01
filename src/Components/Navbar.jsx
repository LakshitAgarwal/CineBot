import { NETFLIX_LOGO_URL } from "../Utils/constants";

const Navbar = () => {
  return (
    <div>
      <div className="absolute z-10 bg-gradient-to-b from-black w-screen">
        <img
          src={NETFLIX_LOGO_URL}
          className="w-52 ml-36 mt-3 z-20"
          alt="Netflix Logo"
        />
      </div>
    </div>
  );
};

export default Navbar;
