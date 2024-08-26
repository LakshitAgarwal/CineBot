import { FaPlay } from "react-icons/fa";

const HeroFg = ({ title, desc }) => {
  return (
    <div className="hidden md:block md:pt-[17%] pt-[25%] overflow-x-hidden -mt-12 absolute text-white bg-gradient-to-tr from-black w-full aspect-video z-10">
      <div>
        <h1 className="font-bold md:text-6xl text-4xl md:ml-12 ml-6 md:w-1/2 shadows-into-light-regular">
          {title}
        </h1>
        <p className="mt-6 w-[28%] ml-12 hidden md:inline-block text-gray-100 line-clamp-5">
          {desc}
        </p>
      </div>
      <div className="md:my-6 my-4 md:ml-12 ml-6 flex">
        <button className="bg-white text-black md:py-3 md:px-8 px-2 py-1 rounded-md font-bold text-lg hover:bg-opacity-90">
          <span className="flex items-center text-sm md:text-lg">
            <FaPlay className="pr-1" /> Play
          </span>
        </button>
        <button className="bg-gray-300 hidden md:block text-lg py-3 px-8 rounded-md text-white font-bold hover:bg-gray-400 ml-3 bg-opacity-40">
          More Info
        </button>
      </div>
    </div>
  );
};

export default HeroFg;
