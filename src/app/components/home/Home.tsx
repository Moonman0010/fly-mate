import Header from "./header";
import Tagline from "./tagline";
import FlyMatePoster from "./poster";

const Home = () => {
  return (
    <div className="min-h-screen bg-yellow-300">
      <Header />
      <Tagline />
      <FlyMatePoster />
    </div>
  );
}

export default Home;