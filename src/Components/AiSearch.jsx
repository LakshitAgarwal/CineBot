import { FaSearch } from "react-icons/fa";
import { useFormik } from "formik";
import genAI from "../Utils/geminiConfig";
import { options } from "../Utils/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  addRecommendations,
  removeRecommendations,
} from "../Utils/recommendationsSlice";
import SearchResultMovies from "./BrowseComponents/SearchResultMovies";
import { ImCross } from "react-icons/im";
import ShimmerUi from "./ShimmerUi";
import { useState } from "react";
import { IoMdHome } from "react-icons/io";
import { Link } from "react-router-dom";

const AiSearch = () => {
  const [searchInitiated, setSearchInitiated] = useState(false);
  const dispatch = useDispatch();
  const store = useSelector((store) => store.recommendations.recomendations);

  const searchMovie = async (movieName) => {
    const movieResult = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movieName +
        "&include_adult=false&language=en-US&page=1",
      options
    );
    const movieData = await movieResult.json();
    return movieData;
  };

  const formik = useFormik({
    initialValues: {
      AiSearch: "",
    },
    onSubmit: async (values) => {
      setSearchInitiated(true);
      dispatch(removeRecommendations());
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const query =
        "Act as a movie recommendation system and suggest some movies for the query: " +
        values.AiSearch +
        " only give me names of 5-6 movies, comma separated and no other text other than that";
      const result = await model.generateContent([query]);
      const finalMovies = result?.response?.text().split(",");
      const movieSearchListPromiseArray = finalMovies.map((movie) =>
        searchMovie(movie)
      );
      const movieSearchList = await Promise.all(movieSearchListPromiseArray);
      dispatch(addRecommendations(movieSearchList));
    },
  });

  return (
    <div className="min-h-screen min-w-screen relative">
      <div className="absolute top-0 left-0 z-[-2] h-full w-full bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>

      <form
        onSubmit={formik.handleSubmit}
        className="flex justify-center pt-32 mb-6 md:mb-0 relative w-[90%] mx-auto"
      >
        <div className="relative w-[40rem]">
          <input
            type="text"
            name="AiSearch"
            className="w-full p-4 pr-10 rounded-full shadow-lg shadow-red-600 focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-300"
            placeholder="Latest horror movies"
            onChange={formik.handleChange}
            value={formik.values.AiSearch}
          />
          {formik.values.AiSearch !== "" && (
            <ImCross
              className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-700 cursor-pointer transition duration-300"
              onClick={() => formik.setFieldValue("AiSearch", "")}
            />
          )}
        </div>
        <button
          type="submit"
          className="ml-4 text-white bg-red-600 px-5 py-2 rounded-full hover:bg-red-700 transition duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-red-600"
        >
          <FaSearch />
        </button>
      </form>
      {searchInitiated && store.length === 0 ? (
        <ShimmerUi />
      ) : (
        <div className="flex flex-wrap md:mr-12 pb-12">
          {store.map((movieList, index) => {
            const firstMovie = movieList?.results?.[0];
            return firstMovie ? (
              <SearchResultMovies key={index} movies={[firstMovie]} />
            ) : null;
          })}
        </div>
      )}
      <Link to="/browse">
        <div className="fixed z-50 bottom-4 right-4 md:hidden">
          <div className="flex items-center justify-center p-3 bg-red-600 rounded-full shadow-lg hover:bg-red-700 transition-all duration-300">
            <IoMdHome className="text-white text-3xl" />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default AiSearch;
