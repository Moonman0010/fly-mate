"use client";



const About = () => {
      const sectionSecond = "Design to enhance the travle experience, FlyMate provides a unique opportunity for Passenger to engage with like-minded individual. fostering new friendships and networking opportunities while in the air."
      const About = "FlyMate is revolutionizing the way travelers connect by facilitating interactions among passangers sharing the same flight. Our app creates destination-speciific threads, allowing users to socializ and build connections en route to their final destination"
      return (
            <div className="grid  gap-4 h-3/4  grid-flow-row  sm:grid-flow-col  sm:h-1/2 sm:gap-2  md:grid-flow-col ...">
                  <div className="row-span-1 sm:row-span-2 md:row-span-1 p-10 sm:p-20 ">
                        <div className="flex  ">
                              <p className="sm:text-6xl text-4xl font-semibold">ABOUT</p>
                        </div>
                        <div className="flex my-4 sm:my-6">

                              <p className=" text-lg sm:text-sm  max-w-screen-md w-full ">
                                    {`Connecting Travelers`}
                              </p></div>
                        <div className="flex sm:pr-8 sm:mb-8">

                              <p className=" text-lg text-left sm:text-2xl text-justify">
                                    {About}
                              </p>

                        </div>
                        <div className=" flex h-2/4 w-full sm:h-2/4 sm:w-3/4  overflow-hidden pt-8 sm:pt-16">
                              <img className="flex-start" src="/banner/aboutbanner.jpeg" />
                        </div>


                  </div>

                  <div className="row-span-1 sm:row-span-2 p-10 sm:p-20 flex ... ">
                        <div  className="self-end pb:10 sm:pb-20">

                              <div className="w-full text-justify">
                                    {sectionSecond}

                                   
                              </div>
                              <button className="bg-black text-white font-bold py-2 px-4 rounded w-40 shadow my-5 sm:my-10 cursor-pointer ">
                                    Explore More
                              </button>
                              </div>
                  </div>
            </div>

      );
}
export default About;