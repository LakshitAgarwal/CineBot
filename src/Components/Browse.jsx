import { useSelector } from "react-redux";
import useFecthMovies from "../hooks/useFecthMovies";
import useFecthOnAirSeries from "../hooks/useFecthOnAirSeries";
import useFetchPopularMovies from "../hooks/useFetchPopularMovies";
import useFetchPopularTVSeries from "../hooks/useFetchPopularTVSeries";
import useFetchUpcomingMovies from "../hooks/useFetchUpcomingMovies";
import Hero from "./BrowseComponents/Hero";
import MoviesCatalouge from "./BrowseComponents/MoviesCatalouge";
import AiSearch from "./AiSearch";

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
          <div className="h-full bg-black">
            <Hero />
            <MoviesCatalouge />
          </div>
        </>
      )}
    </>
  );
};

export default Browse;
