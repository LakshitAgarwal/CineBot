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

    dispatch(addTrailer(finalTrailer));
  };

  useEffect(() => {
    if (!trailerVideo) fetchVideo();
  }, [trailerVideo]);

  return (
    <div className="relative">
      {trailerVideo ? (
        <div className="absolute top-0 -mt-12 w-full z-0 overflow-x-hidden lg:block hidden">
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
