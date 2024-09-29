import {Link} from 'react-router-dom'
import "./index.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-link"><img src="logo.png" alt="logo" className="nav-logo" /></Link>
      <div className="nav-menus">
        <p className="menu">About</p>
        <p className="menu">Services</p>
        <Link to="/users" className="nav-link"><p className="menu">Users</p></Link>
      </div>
    </nav>
  );
};
export default Navbar;
