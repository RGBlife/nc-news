import TopicsDropDown from "./TopicsDropDown";

const Nav = () => {
  return (
    <nav className="flex justify-center items-center">
      <ul className="flex gap-5">
        <TopicsDropDown />
        <li className="flex items-center">
          <a className="lg:text-[20px] text-[#FFFFFF] font-semibold hover:text-[#50192b]">
            <button
              onClick={() => {
                alert("'Add an article / Add a Topic' feature coming soon");
              }}
              className="flex justify-center items-center leading-3 bg-[#D83367] rounded-lg h-[35px] w-[35px] hover:bg-[#C02759] transition delay-75"
            >
              +
            </button>
          </a>
        </li>
        <li className="flex items-center">
          <a
            onClick={() => {
              alert("'User profile' feature coming soon");
            }}
            className="lg:text-[20px] text-[#D83367] font-semibold hover:text-[#50192b] transition delay-75"
          >
            User
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
