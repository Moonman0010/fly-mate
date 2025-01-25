const FlightFormPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-300 p-4">
            {/* Main Content Container */}
            <div className="bg-yellow-200 p-6 rounded-2xl shadow-md w-full max-w-4xl">
                {/* Form Section */}
                <h1 className="text-3xl font-bold text-center mb-8">Enter Flight Number</h1>

                <form className="flex flex-col space-y-4">
                    {/* Flight Number Input */}
                    <div className="flex flex-col">
                        <label htmlFor="flightNumber" className="text-lg font-medium mb-2">
                            Flight Number
                        </label>
                        <input
                            id="flightNumber"
                            type="text"
                            placeholder="UA0142"
                            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="departure" className="text-lg font-medium mb-2">
                            Departure
                        </label>
                        <input
                            id="departure"
                            list="cities"
                            placeholder="FROM"
                            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                    </div>

                    {/* Arrival Input */}
                    <div className="flex flex-col">
                        <label htmlFor="arrival" className="text-lg font-medium mb-2">
                            Arrival
                        </label>
                        <input
                            id="arrival"
                            list="cities"
                            placeholder="TO"
                            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                    </div>

                    <datalist id="cities">
                        <option value="New York" />
                        <option value="Los Angeles" />
                        <option value="Chicago" />
                        <option value="Houston" />
                        <option value="San Francisco" />
                    </datalist>

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