import { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const OrderDetails = ({ orderItems, setOrderItems }) => {
  const [tableNumber, setTableNumber] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [orderStatus, setOrderStatus] = useState('');

  const handleSubmitOrder = () => {
    const orderData = {
      table_number: tableNumber,
      contact_number: contactNumber,
      order_items: orderItems.map(item => ({
        menu_item_id: item.id,
        quantity: item.quantity,
        price: item.price,
      })),
    };

    axios.post('https://api.jsonbin.io/v3/b/66faa41facd3cb34a88ed968/orders', orderData)
      .then(() => {
        setOrderStatus("Order placed successfully!");
        setOrderItems([]); 
      })
      .catch(error => {
        console.error("Error placing order:", error);
        setOrderStatus("Failed to place order.");
      });
  };

  return (
    <div>
      <h1>Order Details</h1>
      <input
        type="text"
        placeholder="Table Number"
        value={tableNumber}
        onChange={(e) => setTableNumber(e.target.value)}
      />
      <input
        type="text"
        placeholder="Contact Number"
        value={contactNumber}
        onChange={(e) => setContactNumber(e.target.value)}
      />
      <button onClick={handleSubmitOrder}>Place Order</button>
      {orderStatus && <p>{orderStatus}</p>}
    </div>
  );
};

OrderDetails.propTypes = {
  orderItems: PropTypes.array.isRequired,
  setOrderItems: PropTypes.func.isRequired,
};

export default OrderDetails;
