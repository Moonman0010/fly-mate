import Image from "next/image";

const FlyMatePoster = () => {
  return (
    <section className="bg-yellow-300 px-4 sm:px-6 md:px-10 lg:px-12 mt-8">
      <div className="relative w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[600px] overflow-hidden rounded-lg shadow-lg">
        <Image
          src="/poster/FlyMatePoster.webp" // Path to your image
          alt="FlyMate Poster - Airplane Wing at Sunset"
          fill
          className="object-cover object-center" // Ensures image is centered and proportional
          priority
        />
      </div>
    </section>
  );
};

export default FlyMatePoster;