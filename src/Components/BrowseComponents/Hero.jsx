import { useSelector } from "react-redux";
import HeroBg from "./HeroBg";
import HeroFg from "./HeroFg";

const Hero = () => {
  const moviesData = useSelector((store) => store.movies?.nowPlayingMovies);

  if (!moviesData) return;

  const heroMovie = moviesData[0];
  // console.log(heroMovie);

  return (
    <div className="md:pt-0 pt-[33%]">
      <HeroFg title={heroMovie.original_title} desc={heroMovie.overview} />
      <HeroBg id={heroMovie.id} />
    </div>
  );
};

export default Hero;
