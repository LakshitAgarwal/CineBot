import { MOVIE_POSTER_URL } from "../../Utils/constants";

const MovieCard = ({ moviePosterPath }) => {
  return (
    <div className="w-52 h-70 flex-shrink-0">
      <img
        src={MOVIE_POSTER_URL + moviePosterPath}
        alt="poster"
        className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
      />
    </div>
  );
};

export default MovieCard;
