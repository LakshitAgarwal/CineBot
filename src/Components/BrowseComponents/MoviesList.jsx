import MovieCard from "./MovieCard";

const MovieList = ({ movies, title }) => {
  // console.log(movies);
  return (
    <div className="ml-12 my-6">
      <p className="text-3xl relative z-10 archivo-black-regular mb-8  text-white">
        {title}
      </p>
      <div className="relative z-10 overflow-x-scroll whitespace-nowrap hidding-scrollbar">
        <div className="inline-flex flex-row-reverse space-x-6">
          {movies
            ? movies.map((movie, index) => (
                <MovieCard
                  key={index}
                  movieData={movie}
                  moviePosterPath={movie.poster_path}
                />
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
