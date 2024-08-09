import MovieCard from "./MovieCard";
import ShimmerUi from "../ShimmerUi";

const MovieList = ({ movies, title }) => {
  return (
    <div>
      {movies ? (
        <div className="ml-12 my-6">
          <p className="text-3xl relative z-10 archivo-black-regular mb-8 text-white">
            {title}
          </p>
          <div className="relative z-10 overflow-x-scroll whitespace-nowrap hiding-scrollbar">
            <div className="inline-flex flex-row-reverse space-x-6">
              {movies.map((movie, index) => (
                <MovieCard
                  key={index}
                  movieData={movie}
                  moviePosterPath={movie.poster_path}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <ShimmerUi />
      )}
    </div>
  );
};

export default MovieList;
