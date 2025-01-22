const Tagline = () => {
  return (
    <main
      id="tagline"
      className="flex flex-col items-start justify-center px-4 sm:px-6 md:px-10 lg:px-12 bg-yellow-300"
      style={{ height: "20rem" }} // Default height for mobile
    >
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight md:leading-snug">
        CONNECTING TRAVELERS WORLDWIDE,
        <br />
        FLYMATE IS THE ULTIMATE PLATFORM
        <br />
        FOR IN-FLIGHT SOCIAL NETWORKING.
      </h1>
    </main>
  );
};

export default Tagline;
