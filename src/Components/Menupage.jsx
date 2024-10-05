import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import '../App.css';
import '../index.css'

const MenuPage = ({ onAddToOrder, onOrderPlaced }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [tableNumber, setTableNumber] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [orderDate, setOrderDate] = useState('');
  const [orderTime, setOrderTime] = useState('');

  useEffect(() => {
   
    axios.get('https://api.jsonbin.io/v3/b/66faa41facd3cb34a88ed968')
      .then(response => setMenuItems(response.data.record))
      .catch(error => console.error("Error fetching menu:", error));
  }, []);

  useEffect(() => {

    if (showPopup) {
      const currentDate = new Date();
      setOrderDate(currentDate.toLocaleDateString('en-CA')); 
      setOrderTime(currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }
  }, [showPopup]);

  const incrementQuantity = (itemId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: (prevQuantities[itemId] || 0) + 1,
    }));
  };

  const decrementQuantity = (itemId) => {
    setQuantities((prevQuantities) => {
      const newQuantity = Math.max(0, (prevQuantities[itemId] || 0) - 1);
      return {
        ...prevQuantities,
        [itemId]: newQuantity,
      };
    });
  };

  const handlePlaceOrder = () => {
    setShowPopup(true);
  };

  const handleConfirmOrder = () => {
    const selectedOrders = menuItems.map(item => ({
      ...item,
      quantity: quantities[item.id] || 0,
    })).filter(order => order.quantity > 0);

    if (selectedOrders.length > 0 && tableNumber && mobileNumber) {
    
      const totalPrice = selectedOrders.reduce((sum, item) => {
        return sum + (item.price * item.quantity);
      }, 0);

      const orderDetails = {
        orders: selectedOrders,
        tableNumber,
        mobileNumber,
        orderDate,
        orderTime,
        totalPrice
      };

      onAddToOrder(orderDetails);
      onOrderPlaced(orderDetails);

      setQuantities({});
      setTableNumber('');
      setMobileNumber('');
      setShowPopup(false);
      setShowSuccess(true);

      setTimeout(() => setShowSuccess(false), 3000);
    } else {
      alert("Please fill in all details and select at least one item.");
    }
  };

  return (
    <div className="menu-container">
      <h1>Taste Haven</h1>
      <button className="place-order" onClick={handlePlaceOrder}>Place Order</button>

      <div className="card-container">
        {menuItems.map(item => (
          <div className="menu-card" key={item.id}>
            <img src={item.image_url} alt={item.name} className="menu-image" />
            <h3>{item.name}</h3>
            <p className="category">Category: {item.category}</p>
            <p className="sub-category">Sub-Category: {item.sub_category}</p>
            <p className="type">Type: {item.type}</p>
            <p className="price">Price: ${item.price.toFixed(2)}</p>
            <p className="description">{item.description}</p>
            <p>Available Quantity: {item.available_quantity}</p>
            <div className="quantity-selector">
              <button onClick={() => decrementQuantity(item.id)} disabled={!quantities[item.id]}>-</button>
              <span>{quantities[item.id] || 0}</span>
              <button onClick={() => incrementQuantity(item.id)} disabled={quantities[item.id] >= item.available_quantity}>+</button>
            </div>
          </div>
        ))}
      </div>

      {showPopup && (
        <div className="popup">
          <h2>Place Your Order</h2>
          <label>
            Table Number:
            <input
              type="text"
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
            />
          </label>
          <label>
            Mobile Number:
            <input
              type="text"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
          </label>
          <label>
            Date:
            <input
              type="text"
              value={orderDate}
              readOnly
            />
          </label>
          <label>
            Time:
            <input
              type="text"
              value={orderTime}
              readOnly
            />
          </label>
          <button onClick={handleConfirmOrder}>Confirm</button>
          <button onClick={() => setShowPopup(false)}>Cancel</button>
        </div>
      )}

      {showSuccess && (
        <div className="success-popup">
          <h3>Order Placed Successfully!</h3>
        </div>
      )}
    </div>
  );
};

MenuPage.propTypes = {
  onAddToOrder: PropTypes.func.isRequired,
  onOrderPlaced: PropTypes.func.isRequired,
};


export default MenuPage;
