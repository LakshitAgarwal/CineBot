import useFecthMovies from "../hooks/useFecthMovies";
import useFecthOnAirSeries from "../hooks/useFecthOnAirSeries";
import useFetchPopularMovies from "../hooks/useFetchPopularMovies";
import useFetchPopularTVSeries from "../hooks/useFetchPopularTVSeries";
import useFetchUpcomingMovies from "../hooks/useFetchUpcomingMovies";
import Hero from "./BrowseComponents/Hero";
import MoviesCatalouge from "./BrowseComponents/MoviesCatalouge";

const Browse = () => {
  useFecthMovies();
  useFetchPopularMovies();
  useFetchUpcomingMovies();
  useFetchPopularTVSeries();
  useFecthOnAirSeries();

  return (
    <div className="h-full bg-black">
      <Hero />
      <MoviesCatalouge />
    </div>
  );
};

export default Browse;
