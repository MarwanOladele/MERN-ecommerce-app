import { useSelector } from "react-redux";

const Home = () => {
  const { user } = useSelector((state) => state.user);

  return <div>{user && <h1>{user.name}</h1>}</div>; 
};

export default Home;
