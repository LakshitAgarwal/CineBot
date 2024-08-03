import { useEffect } from "react";
import { options, UPCOMING_MOVIES_API_URL } from "../Utils/constants";
import { useDispatch } from "react-redux";
import { addUpcomingMovies } from "../Utils/moviesSlice";

const useFetchUpcomingMovies = () => {
  const dispatch = useDispatch();

  async function callMovieAPI() {
    const data = await fetch(UPCOMING_MOVIES_API_URL, options);
    const jsonData = await data.json();
    dispatch(addUpcomingMovies(jsonData.results));
  }

  useEffect(() => {
    callMovieAPI();
  }, []);
};

export default useFetchUpcomingMovies;
