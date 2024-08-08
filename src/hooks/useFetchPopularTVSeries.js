import { useEffect } from "react";
import { options, POPULAR_TV_SERIES_API_URL } from "../Utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addPopularTVSeries } from "../Utils/moviesSlice";

const useFetchPopularTVSeries = () => {
  const dispatch = useDispatch();
  const Movies = useSelector((store) => store.movies.popularTVSeries);

  async function callMovieAPI() {
    const data = await fetch(POPULAR_TV_SERIES_API_URL, options);
    const jsonData = await data.json();
    dispatch(addPopularTVSeries(jsonData.results));
  }

  useEffect(() => {
    if (!Movies) callMovieAPI();
  }, []);
};

export default useFetchPopularTVSeries;
