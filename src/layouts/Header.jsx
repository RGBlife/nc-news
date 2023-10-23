import { Link } from "react-router-dom";

const Header = () => {
    return (
        <nav className=" bg-[#F5F5F5] flex justify-between max-w-6xl mx-auto px-4 border-solid border-1 border-[#F5F5F5] sticky top-0 space-x-1 items-center lg:max-w-full">
            <a className="py-4 px-2  text-[#D83367] font-semibold hover:text-green-500 transition duration-300">Topics</a>
            <Link className="py-4 px-2 text-[#D83367] font-semibold " to="/" ><img alt="Company Logo" className="lg:w-[15%] w-[40%] hover:fill-slate-100 transition duration-300" src="dblp.svg"></img></Link>
            <a className="py-4 px-2 text-[#D83367] font-semibold hover:text-green-500 transition duration-300">+</a>
            <a className="py-4 px-2 text-[#D83367] font-semibold hover:text-green-500 transition duration-300">User</a>
        </nav>
    )
}

export default Header