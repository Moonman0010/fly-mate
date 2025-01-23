const FAQ = () => {
    return (
      <section className="bg-gray-900 text-white px-6 md:px-10 lg:px-12 py-16 sm:py-20 md:py-50 lg:py-50 mt-8 sm:mt-12 md:mt-16 lg:mt-20 mb-8 sm:mb-12 md:mb-16 lg:mb-20">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold">FAQs</h2>
          <p className="text-lg md:text-xl mt-4">
            Find answers to common queries about FlyMate below:
          </p>
        </div>
  
        {/* FAQ Grid */}
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {/* FAQ Item 1 */}
          <div>
            <h3 className="text-xl font-semibold mb-4">How to Join</h3>
            <p>
              To join a specific flight thread, simply enter your flight details
              and start connecting with fellow travelers sharing the same journey.
            </p>
          </div>
  
          {/* FAQ Item 2 */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Safety Measures</h3>
            <p>
              FlyMate prioritizes user safety by implementing strict guidelines
              and verification processes to ensure a secure and enjoyable
              networking experience.
            </p>
          </div>
  
          {/* FAQ Item 3 */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Privacy Settings</h3>
            <p>
              Manage your privacy preferences within the app to control who can
              view your profile and interact with you during your flight.
            </p>
          </div>
  
          {/* FAQ Item 4 */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Account Setup</h3>
            <p>
              Setting up your FlyMate account is quick and easy. Simply download
              the app, enter your details, and start connecting with passengers on
              your flight.
            </p>
          </div>
        </div>
      </section>
    );
  };
  
  export default FAQ;
  