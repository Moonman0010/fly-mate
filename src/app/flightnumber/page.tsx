import Header from "../shared/header";
import Footer from "../shared/footer";
import FlightNumber from "../components/flightnumber/flightForm";

const FlightNumberPage= () => {
    return (
        <div>
            <Header /> {/* Reusing the existing Header component */}
            <FlightNumber />
            <Footer /> {/* Reusing the existing Footer component */}
        </div>
    );
};

export default FlightNumberPage;