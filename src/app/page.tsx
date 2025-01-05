import Image from "next/image";
import FlyMateLogo from "../../public/logo/logoFlymate"

export default function Home() {
  return (
    <div>
    <div className="first-container">
    <div className="flex flex-row row-start-1 col-start-2">
      <div className="flex items-start gap-8 font-black">
        <FlyMateLogo />
      </div>
    
      <div className="flex items-center text-3xl">
        Fly Mate
      </div>
    </div>        
    <p className="flex flex-col items-start gap-8 text-5xl row-start-2 col-start-2 p-4">
      CONNECTING TRAVELERS WORLDWIDE,<br /> 
      FLYMATE IS THE ULTIMATE PLATFORM<br />
      FOR IN-FLIGHT SOCIAL NETWORKING.
    </p>
  </div>
  <div className="second-container">
    
  </div>
  </div>
  );
}
