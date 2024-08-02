import { useEffect } from "react";
import { API_URL, options } from "../Utils/constants";
import { useDispatch } from "react-redux";
import { addMovies } from "../Utils/moviesSlice";

const useFecthMovies = () => {
  const dispatch = useDispatch();

  async function callMovieAPI() {
    const data = await fetch(API_URL, options);
    const jsonData = await data.json();
    dispatch(addMovies(jsonData.results));
    console.log(jsonData.results);
  }

  useEffect(() => {
    callMovieAPI();
  }, []);
};

export default useFecthMovies;
