import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import OrderHistory from './Components/OrderHistory';
import './App.css';
import './index.css';
import MenuPage from './Components/Menupage';

const App = () => {
  const [orderHistory, setOrderHistory] = useState([]);

  const handleAddToOrder = (menuItem) => {
    // Logic for adding the menu item to the order can go hgit ere
  };

  const handleOrderPlaced = (orderDetails) => {
    setOrderHistory(prevOrders => [...prevOrders, orderDetails]);
  };

  return (
    <Router>
      <nav>
        <Link to="/">Menu</Link>
        <Link to="/order-history">Order History</Link>
      </nav>
      <Routes>
        <Route
          path="/"
          element={<MenuPage onAddToOrder={handleAddToOrder} onOrderPlaced={handleOrderPlaced} />}
        />
        <Route path="/order-history" element={<OrderHistory orders={orderHistory} />} />
      </Routes>
    </Router>
  );
};

export default App;
