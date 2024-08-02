const HeroFg = ({ title, desc }) => {
  return (
    <div className="pt-[19%] absolute -mt-[5.6rem] text-white bg-gradient-to-tr from-black w-screen aspect-video z-10">
      <div>
        <h1 className="font-bold text-6xl ml-12 w-1/2 leading-normal shadows-into-light-regular">
          {title}
        </h1>
        <p className="mt-6 w-1/4 ml-12  text-gray-100">{desc}</p>
      </div>
      <div className="my-6 ml-12 ">
        <button className="bg-white text-black py-3 px-8 rounded-md font-bold text-lg hover:bg-opacity-90 ">
          {" "}
          ▶️ Play
        </button>
        <button className="bg-gray-300 text-lg py-3 px-8 rounded-md text-white font-bold hover:bg-gray-400 ml-3 bg-opacity-40">
          More Info
        </button>
      </div>
    </div>
  );
};

export default HeroFg;
