const Header = () => {
    return (
      <header className="flex items-center justify-between px-6 py-4 bg-transparent shadow-md">
        <div className="flex items-center gap-4">
          <img src="/icon.ico" alt="Fly Mate Logo" width={50} height={50} />
          <h1 className="text-3xl font-bold">Fly Mate</h1>
        </div>
        <nav className="flex gap-6">
          <a href="#hero" className="text-lg font-medium hover:text-white">
            Home
          </a>
          <a href="#features" className="text-lg font-medium hover:text-white">
            Features
          </a>
          <a href="#contact" className="text-lg font-medium hover:text-white">
            Contact
          </a>
        </nav>
      </header>
    );
  };

  export default Header;