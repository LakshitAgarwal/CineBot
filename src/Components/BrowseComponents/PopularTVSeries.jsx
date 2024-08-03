import MovieCard from "./MovieCard"


const PopularTVSeries = ({popularTVSeries}) => {
  return (
    <div>
      <div className="my-6">
      <div className="ml-12">
        <p className="text-3xl relative z-30 archivo-black-regular mb-8 text-white">
          Popular TV Series
        </p>
        <div className="relative z-10 overflow-x-scroll whitespace-nowrap hidding-scrollbar">
          <div className="inline-flex space-x-6">
            {popularTVSeries
              ? popularTVSeries.map((popTV, index) => (
                  <MovieCard
                    key={index}
                    moviePosterPath={popTV.poster_path}
                  />
                ))
              : null}
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default PopularTVSeries
