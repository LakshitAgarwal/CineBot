import { useEffect } from "react";
import { options, UPCOMING_MOVIES_API_URL } from "../Utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUpcomingMovies } from "../Utils/moviesSlice";

const useFetchUpcomingMovies = () => {
  const dispatch = useDispatch();
  const Movies = useSelector((store) => store.movies.upcomingMovies);

  async function callMovieAPI() {
    const data = await fetch(UPCOMING_MOVIES_API_URL, options);
    const jsonData = await data.json();
    dispatch(addUpcomingMovies(jsonData.results));
  }

  useEffect(() => {
    if (!Movies) callMovieAPI();
  }, []);
};

export default useFetchUpcomingMovies;
