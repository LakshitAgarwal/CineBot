import { useEffect } from "react";
import { ON_AIR_TV_SERIES_API_URL, options } from "../Utils/constants";
import { useDispatch } from "react-redux";
import { addOnAirSeries } from "../Utils/moviesSlice";

const useFecthOnAirSeries = () => {
  const dispatch = useDispatch();

  async function callMovieAPI() {
    const data = await fetch(ON_AIR_TV_SERIES_API_URL, options);
    const jsonData = await data.json();
    dispatch(addOnAirSeries(jsonData.results));
  }

  useEffect(() => {
    callMovieAPI();
  }, []);
};

export default useFecthOnAirSeries;
