import Header from "./header";
import Tagline from "./tagline";
import FlyMatePoster from "./poster";
import FAQ from "./faq";

const Home = () => {
  return (
    <div className="min-h-screen bg-yellow-300">
      <Header />
      <Tagline />
      <FlyMatePoster />
      <FAQ />
    </div>
  );
}

export default Home;