import { useEffect } from "react";
import { options, POPULAR_MOVIES_API_URL } from "../Utils/constants";
import { useDispatch } from "react-redux";
import { addPopularMovies } from "../Utils/moviesSlice";

const useFetchPopularMovies = () => {
  const dispatch = useDispatch();

  async function callMovieAPI() {
    const data = await fetch(POPULAR_MOVIES_API_URL, options);
    const jsonData = await data.json();
    dispatch(addPopularMovies(jsonData.results));
  }

  useEffect(() => {
    callMovieAPI();
  }, []);
};

export default useFetchPopularMovies;
