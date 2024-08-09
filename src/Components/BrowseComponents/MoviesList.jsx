import MovieCard from "./MovieCard";
import ShimmerUi from "../ShimmerUi";

const MovieList = ({ movies, title }) => {
  return (
    <div>
      {movies ? (
        <div className="md:ml-12 ml-6 my-6">
          <p className="md:text-3xl text-xl relative z-10 archivo-black-regular md:mb-8 mb-4 text-white">
            {title}
          </p>
          <div className="relative z-10 overflow-x-scroll whitespace-nowrap hiding-scrollbar">
            <div className="inline-flex flex-row-reverse ">
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
