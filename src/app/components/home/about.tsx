"use client";



const About = () => {
      const sectionSecond = "Design to enhance the travle experience, FlyMate provides a unique opportunity for Passenger to engage with like-minded individual. fostering new friendships and networking opportunities while in the air."
      const About = "FlyMate is revolutionizing the way travelers connect by facilitating interactions among passangers sharing the same flight. Our app creates destination-speciific threads, allowing users to socializ and build connections en route to their final destination"
      return (
            <div className="grid grid-flow-col gap-4 h-3/4 ...">
                  <div className="row-span-2 p-20">
                        <div className="flex  ">
                              <p className="text-6xl font-semibold">ABOUT</p>
                        </div>
                        <div className="flex my-6">

                              <p className=" text-lg max-w-screen-md w-full overflow-x">
                                    {`Connecting Travelers`}
                              </p></div>
                        <div className="flex pr-8 mb-8">

                              <p className="overflow-x text-left text-2xl text-justify">
                                    {About}
                              </p>

                        </div>
                        <div className=" flex h-2/4 w-3/4  overflow-hidden pt-16">
                              <img className="flex-start" src="/banner/aboutbanner.jpeg" />
                        </div>


                  </div>

                  <div className="row-span-2 p-20 flex ... ">
                        <div  className="self-end pb-20">

                              <div className="w-full text-justify">
                                    {sectionSecond}

                                   
                              </div>
                              <button className="bg-black text-white font-bold py-2 px-4 rounded w-1/4 shadow my-10 cursor-pointer ">
                                    Explore More
                              </button>
                              </div>
                  </div>
            </div>

      );
}
export default About;