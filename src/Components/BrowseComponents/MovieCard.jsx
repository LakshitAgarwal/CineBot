import { useState } from "react";
import { MOVIE_POSTER_URL } from "../../Utils/constants";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";

const MovieCard = ({ moviePosterPath, movieData }) => {
  const [infoDiv, setInfoDiv] = useState(null);

  const handleInfo = () => {
    setInfoDiv(movieData);
  };

  const closeInfo = () => {
    setInfoDiv(null);
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      <div className="w-52 h-70 flex-shrink-0" onClick={handleInfo}>
        {moviePosterPath ? (
          <img
            src={MOVIE_POSTER_URL + moviePosterPath}
            alt="poster"
            className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gray-300 flex items-center justify-center">
            <span>No Image Available</span>
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
                className="w-[90vw] md:w-[70vw] h-[80vh] bg-white p-8 rounded-lg relative overflow-y-auto"
                onClick={stopPropagation}
              >
                <button
                  onClick={closeInfo}
                  className="absolute top-4 right-4 text-white bg-red-500 rounded-full w-8 h-8 flex items-center justify-center"
                >
                  &times;
                </button>
                <div className="flex flex-col md:flex-row">
                  <img
                    src={MOVIE_POSTER_URL + moviePosterPath}
                    alt="poster"
                    className="w-full md:w-1/3 h-auto rounded-2xl mb-4 md:mb-0"
                  />
                  <div className="md:w-2/3 md:ml-8">
                    <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
                      {movieData.title}
                    </h1>
                    <p className="text-gray-600 text-sm my-1">
                      Release Date: {movieData.release_date}
                    </p>
                    <p className="my-4">{movieData.overview}</p>
                    <p className="my-4">Rating: {Math.round(movieData.vote_average*10)/10}/10</p>
                    <hr />
                    <p className="py-4">
                      Language: {movieData.original_language}
                    </p>
                    <hr />
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