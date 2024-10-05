import PropTypes from 'prop-types';
import '../App.css';

const OrderHistory = ({ orders }) => {
  return (
    <div className="order-history-container">
      <h2>Order History</h2>
      {orders.length === 0 ? (
        <p>No orders placed yet.</p>
      ) : (
        <div className="order-list">
          {orders.map((order, index) => (
            <div key={index} className="order-item">
              <h3>Order {index + 1}</h3>
              <p><strong>Table Number:</strong> {order.tableNumber}</p>
              <p><strong>Mobile Number:</strong> {order.mobileNumber}</p>
              <p><strong>Date:</strong> {order.orderDate}</p>
              <p><strong>Time:</strong> {order.orderTime}</p>

              <h4>Items:</h4>
              <ul>
                {order.orders.map((item) => (
                  <li key={item.id}>
                    {item.name} - Quantity: {item.quantity} - Price: ${item.price.toFixed(2)} - Subtotal: ${(item.price * item.quantity).toFixed(2)}
                  </li>
                ))}
              </ul>

              <h4>Total Price: ${order.totalPrice.toFixed(2)}</h4>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

OrderHistory.propTypes = {
  orders: PropTypes.array.isRequired,
};

export default OrderHistory;
