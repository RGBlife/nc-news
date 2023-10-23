import { Link } from "react-router-dom";

const Header = () => {
    return (
        <nav className="flex justify-center border-solid border-2 border-sky-500 sticky top-0 bg-cyan-500">
            <Link to="/" >Logo</Link>
            <a>Topics</a>
            <a>+ (Articles)</a>
            <a>User</a>
        </nav>
    )
}

export default Header