import { Link } from "react-router-dom";
import Nav from "./Nav";

const Header = () => {
  return (
    <header className="top-0 z-50 fixed w-full bg-[#F5F5F5] border-b border-solid border-[#F5F5F5] shadow-sm">
      <div className="flex align-center justify-between py-0 px-7 h-[50px]">
        <Link to="/" className="flex justify-center items-center gap-3 lg:gap-10">
          <img alt="Company Logo" className="h-full w-auto" src="/dblp.svg" />
          <h1 className="text-[20px] text-[#D83367] font-semibold hover:text-[#50192b] transition delay-75">Home</h1>
        </Link>
        <Nav/>
      </div>
    </header>
  );
};

export default Header;
