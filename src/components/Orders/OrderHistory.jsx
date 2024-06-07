import { useSelector } from 'react-redux';

const OrderTable = () => {
  const orders = useSelector((state) => state.order.orders);

  return (
    <div style={{ margin: '20px' }}>
      <h2 style={{ color: 'white' }}>Order History</h2>
      <table style={{ width: '100%', border: '1px solid white', color: 'white' }}>
        <thead>
          <tr>
            <th>Order Type</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Date Created</th>
            <th>Completed Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td>{order.orderType}</td>
              <td>{order.price}</td>
              <td>{order.quantity}</td>
              <td>{order.total}</td>
              <td>{order.dateCreated}</td>
              <td>{order.completedDate}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;