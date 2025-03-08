import logo from "../assets/logo.svg";

const Navbar = () => {
  return (
    <nav className="p-2 flex justify-between">
      <img src={logo} alt="GSynergy Logo" className="w-50" />
      <h1 className="text-[28px] flex items-center">GSynergy Data Viewer</h1>
      <div className="flex items-center space-x-4">
        <button className="bg-gray-400 text-[24px] text-white w-[50px] h-[50px] rounded-full">
          A
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
