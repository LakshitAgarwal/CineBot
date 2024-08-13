import { useState, useEffect } from "react";
import { MOVIE_POSTER_URL, options } from "../../Utils/constants";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";
import { FaStar } from "react-icons/fa";
import { BsBookmarkPlusFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { addfav } from "../../Utils/favouriteSlice";
import { BsFillBookmarkCheckFill } from "react-icons/bs";

const MovieCard = ({ moviePosterPath, movieData }) => {
  const [Click, setClick] = useState(false);
  const [infoDiv, setInfoDiv] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const addFavs = () => {
    dispatch(addfav(movieData));
  };
  const handleFavs = () => {
    setClick(!Click);
    addFavs();
  };

  const handleInfo = () => {
    setInfoDiv(movieData);
    fetchVideo();
  };
  console.log(trailer);

  const closeInfo = () => {
    setInfoDiv(null);
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  /**
   * Problem (i faced):
   * what i am doing is when someone clicks on a movie card then the trailerapi must be called at that moment and it should give me trailer details, but what happening is when I click on movie card and prints the result as of now initially it says null, and when I close the card and clicks on it again then it shows the trailer data
   *
   *Solution:
   * Uska solution is ki, get a loading screen or shimmer ui hand have a state variable of loading, set it default false aur api call krne se pehle usko true krdo aur jab api call complete hojaye to false krdo
   */
  const fetchVideo = async () => {
    setIsLoading(true);
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${movieData.id}/videos?language=en-US`,
      options
    );
    const jsonData = await data.json();
    console.log(jsonData);
    if (jsonData.success === false) {
      setIsLoading(false);
      return;
    }
    const onlyTrailers = jsonData.results.filter(
      (videos) => videos?.type === "Trailer"
    );
    const finalTrailer = onlyTrailers[0];
    setTrailer(finalTrailer);
    setIsLoading(false);
  };

  return (
    <>
      <div className="md:w-52 md:h-70 w-36 h-42 mr-6 flex-shrink-0">
        {moviePosterPath ? (
          <>
            <img
              src={MOVIE_POSTER_URL + moviePosterPath}
              alt="poster"
              className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
              onClick={handleInfo}
            />
            <div
              className="text-white text-3xl md:text-4xl absolute top-0 -ml-1 opacity-85 cursor-pointer"
              onClick={handleFavs}
            >
              {Click ? <BsFillBookmarkCheckFill /> : <BsBookmarkPlusFill />}
            </div>
          </>
        ) : (
          <div className="w-full h-full bg-gray-300 flex items-center justify-center">
            <span>No Poster Available</span>
          </div>
        )}
      </div>

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
                  <div className="w-full md:w-[37%] h-auto rounded-2xl mb-4 md:mb-0">
                    {isLoading ? (
                      <div className="w-full h-72 md:h-[30rem] bg-gray-200 rounded-lg animate-pulse"></div>
                    ) : (
                      <img
                        src={MOVIE_POSTER_URL + moviePosterPath}
                        alt="poster"
                        className="w-full h-72 md:h-full rounded-lg object-cover"
                      />
                    )}
                  </div>
                  <div className="md:w-2/3 md:ml-8">
                    {isLoading ? (
                      <>
                        <div className="h-8 bg-gray-200 rounded w-3/4 mb-4 animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2 mb-2 animate-pulse"></div>
                        <div className="h-24 bg-gray-200 rounded w-full mb-4 animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/4 mb-2 animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2 mb-2 animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                      </>
                    ) : (
                      <>
                        <h1 className="dm-sans-md text-2xl md:text-4xl my-2 font-semibold text-gray-800">
                          {movieData.title || movieData.name}
                        </h1>
                        <p className="text-gray-600 text-sm my-1">
                          Release Date:{" "}
                          {movieData.release_date || movieData.first_air_date}
                        </p>
                        <p className="my-4">{movieData.overview}</p>
                        <p className="my-4 flex items-center ">
                          Rating:{" "}
                          <FaStar className="text-yellow-500 ml-2 mr-1" />
                          {Math.round(movieData.vote_average * 10) / 10}/10
                        </p>
                        <hr />
                        <p className="py-4">
                          Language: {movieData.original_language}
                        </p>
                        <hr />
                        <div className="mt-8">
                          {trailer ? (
                            <a
                              href={`https://www.youtube.com/watch?v=${trailer.key}`}
                              target="_blank"
                              className="bg-red-600 text-white px-4 py-2 rounded-md "
                            >
                              Watch Trailer
                            </a>
                          ) : null}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </>,
          document.body // Render the modal at the end of the DOM
        )}
    </>
  );
};

export default MovieCard;

/**
 * Problem Recap:
When you clicked on a movie to see its details (the info div), other movie lists were appearing on top of that info div. The info div was supposed to be on top of everything else but was getting overlapped by other movie lists.

Solution Overview:
The key to fixing this problem was to ensure that the info div (the detailed view of the movie) appears on top of everything else on the page. We did this by:

Moving the Info Div to the End of the DOM Tree using something called a "Portal."
Using High z-index Values to make sure the info div and its dark background overlay are above everything else.
Step-by-Step Breakdown:
Understanding the DOM Tree:

The DOM (Document Object Model) is like a tree structure where all your HTML elements are organized.
Normally, elements that appear later in the DOM tree are rendered on top of elements that appear earlier.
Why the Info Div Was Overlapped:

In your original setup, the info div was placed inside each movie card. So when you clicked to open it, it stayed in the same position in the DOM tree.
Other movie lists might have been positioned later in the DOM or had higher z-index values, causing them to overlap the info div.
Solution: Moving the Info Div to the End Using a Portal:

A Portal in React allows you to render a component (like the info div) outside of its normal place in the DOM tree.
We used createPortal to move the info div to the very end of the DOM, inside the <body> element.
This way, no matter where the movie card is in the DOM tree, the info div always appears on top of everything else.
Ensuring the Info Div Stays on Top with z-index:

z-index is a CSS property that controls the stack order of elements. Elements with a higher z-index appear on top of elements with a lower z-index.
We set very high z-index values (10000 and 10001) for the dark overlay and the info div to ensure they stay above everything else on the page.
How It All Works Together:

Portal: By moving the info div to the end of the DOM, it naturally appears above other content.
High z-index: Ensures that even if other elements have their own z-index, the info div will still be on top.
Fixed Positioning: We kept the info div and overlay fixed, so they stay centered and visible no matter how much you scroll.
 */
