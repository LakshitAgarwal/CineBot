import { useDispatch, useSelector } from "react-redux";
import { MOVIE_POSTER_URL } from "../Utils/constants";
import { useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { BsBookmarkDashFill } from "react-icons/bs";
import { removeFav } from "../Utils/favouriteSlice";

const Favourites = () => {
  const dispatch = useDispatch();
  const [infoDiv, setInfoDiv] = useState(null);
  const handleInfo = (movie) => {
    setInfoDiv(movie);
  };

  const closeInfo = () => {
    setInfoDiv(null);
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  const handleRemove = (index) => {
    dispatch(removeFav(index));
  };

  const favMovies = useSelector((store) => store.favourites.favourites);

  return (
    <div className="min-h-screen min-w-screen relative pt-[8%] pb-14 pl-12">
      <div className="absolute top-0 left-0 z-[-2] h-full w-full bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <h1 className="text-white text-3xl text-center mb-20">Favourites</h1>

      {favMovies.length === 0 ? (
        <div className="text-center text-white text-xl">
          <p>You haven't added any movies to your favourites yet.</p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-4">
          {favMovies.map((movie, index) => (
            <div
              key={index}
              className="md:w-52 md:h-70 w-36 h-42 mr-6 flex-shrink-0 relative"
            >
              <>
                <img
                  src={MOVIE_POSTER_URL + movie.poster_path}
                  alt="poster"
                  className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                  onClick={() => handleInfo(movie)}
                />
                <div
                  className="text-white text-4xl absolute top-0 -ml-1 opacity-85 cursor-pointer"
                  onClick={() => handleRemove(index)}
                >
                  <BsBookmarkDashFill />
                </div>
              </>
            </div>
          ))}
        </div>
      )}

      {infoDiv &&
        createPortal(
          <>
            {/* Dark Background Overlay */}
            <div
              onClick={closeInfo}
              className="fixed inset-0 bg-black opacity-70 z-[10000]"
            ></div>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 flex items-center justify-center z-[10001]"
              onClick={closeInfo}
            >
              <div
                className="w-[85vw] md:w-[70vw] h-[90vh] md:h-auto bg-white p-8 rounded-lg relative overflow-y-auto"
                onClick={stopPropagation}
              >
                <button
                  onClick={closeInfo}
                  className="absolute top-4 right-4 text-white bg-red-600 rounded-full w-8 h-8 flex items-center justify-center"
                >
                  &times;
                </button>
                <div className="flex flex-col md:flex-row">
                  <img
                    src={MOVIE_POSTER_URL + infoDiv.poster_path}
                    alt="poster"
                    className="w-full md:w-[37%] h-auto rounded-2xl mb-4 md:mb-0"
                  />
                  <div className="md:w-2/3 md:ml-8">
                    <h1 className="dm-sans-md text-2xl md:text-4xl my-2 font-semibold text-gray-800">
                      {infoDiv.title || infoDiv.name}
                    </h1>
                    <p className="text-gray-600 text-sm my-1">
                      Release Date:{" "}
                      {infoDiv.release_date || infoDiv.first_air_date}
                    </p>
                    <p className="my-4">{infoDiv.overview}</p>
                    <p className="my-4 flex items-center ">
                      Rating: <FaStar className="text-yellow-500 ml-2 mr-1" />
                      {Math.round(infoDiv.vote_average * 10) / 10}/10
                    </p>
                    <hr />
                    <p className="py-4">
                      Language: {infoDiv.original_language}
                    </p>
                    <hr />
                  </div>
                </div>
              </div>
            </motion.div>
          </>,
          document.body // Render the modal at the end of the DOM
        )}
    </div>
  );
};

export default Favourites;
