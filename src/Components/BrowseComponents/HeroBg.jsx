import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import { options } from "../../Utils/constants";
import { addTrailer } from "../../Utils/moviesSlice";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HeroBg = ({ id }) => {
  const moviesData = useSelector((store) => store.movies?.popularMovies);
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

  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
    autoplay: true,
    autoplaySpeed: 3000,
  };

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

      {/* Mobile-only carousel */}
      <div className="block lg:hidden mt-4">
        {moviesData ? (
          <Slider {...settings}>
            {moviesData.map((movie) => (
              <div key={movie.id} className="flex justify-center">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                  className="rounded-lg w-5/6 mx-auto"
                />
              </div>
            ))}
          </Slider>
        ) : null}
      </div>
    </div>
  );
};

export default HeroBg;
