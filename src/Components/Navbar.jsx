import { Link } from 'react-router-dom';
// import '../Navbar.css';
// import '../index.css'
import './index.css'


const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>Food Ordering App</h1>
      </div>
      <ul className="navbar-menu">
        <li><Link to="/" >Home</Link></li>
        <li><Link to="/order-history">Order History</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
