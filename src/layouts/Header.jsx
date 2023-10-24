import { Link } from "react-router-dom";
import Nav from "./Nav";

const Header = () => {
  return (
    <header className="top-0 z-999 fixed w-full bg-[#F5F5F5] border-b border-solid border-[#F5F5F5]">
      <div className="flex align-center justify-between py-0 px-7 min-h-[64px]">
        <Link to="/">
          <img
            alt="Company Logo"
            className="lg:w-[10%] w-[30%] "
            src="/dblp.svg"
          ></img>
        </Link>
        <Nav/>
      </div>
    </header>
  );
};

export default Header;
