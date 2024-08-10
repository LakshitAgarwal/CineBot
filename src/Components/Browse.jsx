import { useSelector } from "react-redux";
import useFecthMovies from "../hooks/useFecthMovies";
import useFecthOnAirSeries from "../hooks/useFecthOnAirSeries";
import useFetchPopularMovies from "../hooks/useFetchPopularMovies";
import useFetchPopularTVSeries from "../hooks/useFetchPopularTVSeries";
import useFetchUpcomingMovies from "../hooks/useFetchUpcomingMovies";
import Hero from "./BrowseComponents/Hero";
import MoviesCatalouge from "./BrowseComponents/MoviesCatalouge";
import AiSearch from "./AiSearch";
import { Link } from "react-router-dom";
import { RiRobot2Fill } from "react-icons/ri";

const Browse = () => {
  const store = useSelector((store) => store.eventHandling.mouseclicked);

  useFecthMovies();
  useFetchPopularMovies();
  useFetchUpcomingMovies();
  useFetchPopularTVSeries();
  useFecthOnAirSeries();

  return (
    <>
      {store ? (
        <AiSearch />
      ) : (
        <>
          <div className="relative h-full bg-black">
            <Hero />
            <MoviesCatalouge />
            <Link to="/search">
              <div className="fixed z-50 bottom-4 right-4">
                <div className="flex items-center justify-center p-3 bg-red-600 rounded-full shadow-lg hover:bg-red-700 transition-all duration-300">
                  <RiRobot2Fill className="text-white text-3xl" />
                </div>
              </div>
            </Link>
          </div>
        </>
      )}
    </>
  );
};

export default Browse;
