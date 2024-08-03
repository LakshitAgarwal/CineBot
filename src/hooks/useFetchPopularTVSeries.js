import { useEffect } from "react";
import { options, POPULAR_TV_SERIES_API_URL } from "../Utils/constants";
import { useDispatch } from "react-redux";
import { addPopularTVSeries } from "../Utils/moviesSlice";

const useFetchPopularTVSeries = () => {
  const dispatch = useDispatch();

  async function callMovieAPI() {
    const data = await fetch(POPULAR_TV_SERIES_API_URL, options);
    const jsonData = await data.json();
    dispatch(addPopularTVSeries(jsonData.results));
  }

  useEffect(() => {
    callMovieAPI();
  }, []);
};

export default useFetchPopularTVSeries;
