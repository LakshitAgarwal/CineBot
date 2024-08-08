import MovieCard from "./MovieCard";

const PopularMovies = ({ popularMovies }) => {
  // console.log(popularMovies);
  return (
    <div className="my-6">
      <div className="ml-12">
        <p className="text-3xl relative z-30 archivo-black-regular mb-8 text-white">
          Popular Movies
        </p>
        <div className="relative z-10 overflow-x-scroll whitespace-nowrap hidding-scrollbar">
          <div className="inline-flex space-x-6">
            {popularMovies
              ? popularMovies.map((popMovie, index) => (
                  <MovieCard
                    key={index}
                    moviePosterPath={popMovie.poster_path}
                  />
                ))
              : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularMovies;
