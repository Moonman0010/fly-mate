"use client"
import React, { useState } from "react";

const FlightFormPage = () => {
    // State for form fields
    const [flightNumber, setFlightNumber] = useState("");
    const [departure, setDeparture] = useState("");
    const [arrival, setArrival] = useState("");

    // State for validation errors
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    // List of valid cities
    const cities = ["New York", "Los Angeles", "Chicago", "Houston", "San Francisco"];

    // Validation logic
    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        // Validate flight number
        if (!flightNumber) {
            newErrors.flightNumber = "Flight number is required.";
        } else if (!/^[A-Z0-9]+$/.test(flightNumber)) {
            newErrors.flightNumber = "Flight number must be alphanumeric, e.g., 'UA0142'.";
        }

        // Validate departure
        if (!departure) {
            newErrors.departure = "Departure city is required.";
        } else if (!cities.includes(departure)) {
            newErrors.departure = "Please select a valid departure city.";
        }

        // Validate arrival
        if (!arrival) {
            newErrors.arrival = "Arrival city is required.";
        } else if (!cities.includes(arrival)) {
            newErrors.arrival = "Please select a valid arrival city.";
        }

        // Check if departure and arrival are the same
        if (departure && arrival && departure === arrival) {
            newErrors.arrival = "Departure and arrival cities cannot be the same.";
        }

        setErrors(newErrors);

        // Return true if no validation errors
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // Prevent form refresh

        // Post Validation actions to be implemented later
        if (validateForm()) {
            alert("Form submitted successfully!");
            // Reset fields
            setFlightNumber("");
            setDeparture("");
            setArrival("");
            setErrors({});
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-300 p-4">
            {/* Main Content Container */}
            <div className="bg-yellow-200 p-6 rounded-2xl shadow-md w-full max-w-4xl">
                {/* Form Section */}
                <h1 className="text-3xl font-bold text-center mb-8">Enter Flight Number</h1>

                <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
                    {/* Flight Number Input */}
                    <div className="flex flex-col">
                        <label htmlFor="flightNumber" className="text-lg font-medium mb-2">
                            Flight Number
                        </label>
                        <input
                            id="flightNumber"
                            type="text"
                            placeholder="UA0142"
                            className={`border ${
                                errors.flightNumber ? "border-red-500" : "border-gray-300"
                            } rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500`}
                            value={flightNumber}
                            onChange={(e) => setFlightNumber(e.target.value.toUpperCase())}
                        />
                        {errors.flightNumber && (
                            <small className="text-red-500 mt-1">{errors.flightNumber}</small>
                        )}
                    </div>

                    {/* Departure Input */}
                    <div className="flex flex-col">
                        <label htmlFor="departure" className="text-lg font-medium mb-2">
                            Departure
                        </label>
                        <input
                            id="departure"
                            list="cities"
                            placeholder="From"
                            className={`border ${
                                errors.departure ? "border-red-500" : "border-gray-300"
                            } rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500`}
                            value={departure}
                            onChange={(e) => setDeparture(e.target.value)}
                        />
                        <datalist id="cities">
                            {cities.map((city) => (
                                <option key={city} value={city} />
                            ))}
                        </datalist>
                        {errors.departure && (
                            <small className="text-red-500 mt-1">{errors.departure}</small>
                        )}
                    </div>

                    {/* Arrival Input */}
                    <div className="flex flex-col">
                        <label htmlFor="arrival" className="text-lg font-medium mb-2">
                            Arrival
                        </label>
                        <input
                            id="arrival"
                            list="cities"
                            placeholder="To"
                            className={`border ${
                                errors.arrival ? "border-red-500" : "border-gray-300"
                            } rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500`}
                            value={arrival}
                            onChange={(e) => setArrival(e.target.value)}
                        />
                        <datalist id="cities">
                            {cities.map((city) => (
                                <option key={city} value={city} />
                            ))}
                        </datalist>
                        {errors.arrival && (
                            <small className="text-red-500 mt-1">{errors.arrival}</small>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="bg-black text-white text-lg font-medium py-2 rounded-lg hover:bg-gray-800 transition-all w-1/6 self-center "
                    >
                        {`>`}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default FlightFormPage;