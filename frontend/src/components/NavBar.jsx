import { Link } from "react-router-dom";
import '../css/navbar.css';

function NavBar() {
    return (
        <nav className="navigation-bar">
            <div className="navbar">
                <Link to ="/">Personal Finance Dashboard</Link>
            </div>
            <div className="navbar-links">
                <Link to ="/" className="navbar-link">Home</Link>
                <Link to ="/transactions" className="navbar-link">Transactions</Link>
                <Link to ="/transactionsNew" className="navbar-link">New</Link>
            </div>
        </nav>
    )
}

export default NavBar