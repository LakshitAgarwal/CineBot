import { useSelector } from "react-redux";

const Browse = () => {
  const user = useSelector((store) => store.user);
  return (
    <div className="h-screen w-screen bg-black">
      <h1 className="text-center pt-36 text-red-600 text-5xl font-bold">
        {`Welcome ${user.name}!`}
      </h1>
    </div>
  );
};

export default Browse;
