import MovieCard from "./MovieCard";

const SearchResultMovies = ({ movies}) => {
  return (
    // <div className="md:ml-12 ml-7 md:my-16 mt-8">
    <div className="md:mb-8">
      <div className="relative z-10 md:space-x-6">
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
