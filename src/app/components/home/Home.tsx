import Header from "./header";
import Tagline from "./tagline";
import FlyMatePoster from "./poster";
import About from"./about";
import FAQ from "./faq";

const Home = () => {
  return (
    <div className="min-h-screen bg-yellow-300">
      <Header />
      <Tagline />
      <FlyMatePoster />
      <About/>
      <FAQ />
    </div>
  );
}

export default Home;