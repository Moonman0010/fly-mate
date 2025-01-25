import Header from "../shared/header";
import Tagline from "../components/home/tagline";
import FlyMatePoster from "../components/home/poster";
import About from"../components/home/about";
import FAQ from "../components/home/faq";
import Footer from "../shared/footer";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-yellow-300">
      <Header />
      <Tagline />
      <FlyMatePoster />
      <About/>
      <FAQ />
      <Footer />
    </div>
  );
}

export default HomePage;