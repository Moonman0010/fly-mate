import Image from "next/image";

const FlyMatePoster = () => {
  return (
    <section className="bg-yellow-300 px-6 md:px-10 lg:px-12 mt-8">
      <div className="relative w-full h-[600px] overflow-hidden rounded-lg shadow-lg">
        <Image
          src="/poster/FlyMatePoster.webp" // Path to your image
          alt="FlyMate Poster - Airplane Wing at Sunset"
          layout="fill" // Ensures the image covers the container
          objectFit="cover" // Keeps the image proportional
          priority
        />
      </div>
    </section>
  );
};

export default FlyMatePoster;