const Nav = () => {
    return (
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
    )
}

export default Nav