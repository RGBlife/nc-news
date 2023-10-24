import { Link } from "react-router-dom";

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
        <nav className="flex justify-center items-center">
          <ul className="flex gap-10">
            <li>
              <a className="text-[20px] text-[#D83367] font-semibold hover:text-[#50192b] transition delay-75">
                Topics
              </a>
            </li>
            <li>
              <a className=" text-[20px] text-[#FFFFFF] font-semibold hover:text-[#50192b]">
                <button className="bg-[#D83367] rounded-lg h-[35px] w-[35px] hover:bg-[#C02759] transition delay-75">
                  +
                </button>
              </a>
            </li>
            <li>
              <a className=" text-[20px] text-[#D83367] font-semibold hover:text-[#50192b] transition delay-75">
                User
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
