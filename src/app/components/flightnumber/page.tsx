import Header from "../shared/header";
import Footer from "../shared/footer";
import FlightNumber from "./flightNumber";

const Page= () => {
    return (
        <div>
            <Header /> {/* Reusing the existing Header component */}
            <FlightNumber />
            <Footer /> {/* Reusing the existing Footer component */}
        </div>
    );
};

export default Page;