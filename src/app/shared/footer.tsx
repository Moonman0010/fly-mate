const Footer = () => {
    return (
      <footer className="bg-yellow-300 text-gray-900 px-6 md:px-10 lg:px-12 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {/* Column 1: Logo and Description */}
          <div>
            <h2 className="text-2xl font-bold mb-4">FLYMATE</h2>
            <p>
              Connecting travelers worldwide for a better social networking
              experience in the skies.
            </p>
          </div>
  
          {/* Column 2: Contact Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Contact Information</h3>
            <p>123-456-7890</p>
            <p>info@mysite.com</p>
            <p>500 Terry Francine Street, 6th Floor, San Francisco, CA 94158</p>
          </div>
  
          {/* Column 3: Subscription Form */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Stay Connected with FlyMate</h3>
            <form className="flex flex-col space-y-4">
              <input
                type="email"
                placeholder="Enter Your Email *"
                className="px-4 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring focus:ring-gray-600"
              />
              <button
                type="submit"
                className="bg-black text-white font-semibold px-4 py-2 rounded-md hover:bg-gray-800 transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
  
        {/* Bottom Section */}
        <div className="mt-12 text-center border-t border-gray-500 pt-6">
          <p>Contact Us</p>
        </div>
      </footer>
    );
  };
  
  export default Footer;
      