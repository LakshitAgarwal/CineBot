import MovieCard from "./MovieCard";

const SearchResultMovies = ({ movies, title }) => {
  return (
    <div className="ml-12 my-6">
      <p className="text-3xl relative z-30 archivo-black-regular mb-8 text-white">
        {title}
      </p>
      <div className="relative z-10 flex flex-wrap space-x-6">
        {movies
          ? movies
              .filter((movie) => movie.poster_path)
              .map((movie, index) => (
                <MovieCard
                  key={index}
                  movieData={movie}
                  moviePosterPath={movie.poster_path}
                />
              ))
          : null}
      </div>
    </div>
  );
};

export default SearchResultMovies;
