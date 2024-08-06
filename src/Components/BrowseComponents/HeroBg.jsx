import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { options } from "../../Utils/constants";
import { addTrailer } from "../../Utils/moviesSlice";

const HeroBg = ({ id }) => {
  const dispatch = useDispatch();
  const trailerVideo = useSelector((store) => store.movies?.trailer);

  const fetchVideo = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      options
    );
    const jsonData = await data.json();
    const onlyTrailers = jsonData.results.filter(
      (videos) => videos.type === "Trailer"
    );
    const finalTrailer = onlyTrailers[0];
    /**
     * ok, so now we can't use the onTrailer thing that we filtered out directly to show the trailer as it is inside this fetchVideo function, i.e. it is not accessible outside this function.
     * So, there are 2 ways to handle this
     * 1. We can use the useState hook to set the trailer in the state and then use it in the Hero component
     * 2. We can store this Trailer data in out redux store and then we can access it from there
     *
     * We have used 1st approch many times before, lets do it with 2nd one this time.
     */

    dispatch(addTrailer(finalTrailer));
  };

  useEffect(() => {
    fetchVideo();
  }, []);

  return (
    <div className="relative">
      {trailerVideo ? (
        <div className="absolute top-0 -mt-12 w-full z-0">
          <iframe
            className="w-screen aspect-video scale-125"
            src={`https://www.youtube.com/embed/${trailerVideo?.key}?autoplay=1&mute=1&loop=1&controls=0&playlist=${trailerVideo?.key}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
          ></iframe>
        </div>
      ) : null}
    </div>
  );
};

export default HeroBg;
