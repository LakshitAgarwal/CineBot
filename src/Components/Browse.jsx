import useFecthMovies from "../hooks/useFecthMovies";
import Hero from "./BrowseComponents/Hero";

const Browse = () => {
  useFecthMovies();

  return (
    <div className="h-screen bg-black">
      <Hero />
    </div>
  );
};

export default Browse;
