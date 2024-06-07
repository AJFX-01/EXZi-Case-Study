import { useSelector, useDispatch } from 'react-redux';
import { formatNumber } from '../../utils/orders';
import { cancelOrder } from '../../red/actions'; 
import { toast } from 'react-toastify';

// const OrderTable = () => {
//   const orders = useSelector((state) => state.order.orders);
//   const dispatch = useDispatch();

//   const handleCancelOrder = async (index) => {
//     console.log("clicked")
//     try {
//       dispatch(cancelOrder(index));
//       console.log("worked")
//     } catch (error) {
//       toast.error(error.message)
//     }
//   };

//   return (
//     <div style={{ width: "60%" }}>
//       <h2 style={{ color: 'white', fontSize: "12px" }}>Order History</h2>
//       <table style={{ width: '100%', border: '1px solid white', color: 'white' }}>
//         <thead>
//           <tr>
//             <th style={{ fontSize: "12px" }}>Order</th>
//             <th style={{ fontSize: "12px" }}>Pair</th>
//             <th style={{ fontSize: "12px" }}>Order Type</th>
//             <th style={{ fontSize: "12px" }}>Price</th>
//             <th style={{ fontSize: "12px" }}>Quantity</th>
//             <th style={{ fontSize: "12px" }}>Total</th>
//             <th style={{ fontSize: "12px" }}>Date Created</th>
//             <th style={{ fontSize: "12px" }}>Completed Date</th>
//             <th style={{ fontSize: "12px" }}>Status</th>
//             <th style={{ fontSize: "12px" }}>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {orders.map((order, index) => (
//             <tr key={index}>
//               <td style={{ fontSize: "10px", textAlign: "center" }}>{index + 1}</td>
//               <td style={{ fontSize: "10px", textAlign: "center" }}>{order.pairs}</td>
//               <td style={{ fontSize: "10px", textAlign: "center" }}>{order.orderType}</td>
//               <td style={{ fontSize: "10px", textAlign: "center" }}>{order.price}</td>
//               <td style={{ fontSize: "10px", textAlign: "center" }}>{formatNumber(order.quantity)}</td>
//               <td style={{ fontSize: "10px", textAlign: "center" }}>{formatNumber(order.total)}</td>
//               <td style={{ fontSize: "10px", textAlign: "center" }}>{order.dateCreated}</td>
//               <td style={{ fontSize: "10px", textAlign: "center" }}>{order.completedDate}</td>
//               <td style={{ fontSize: "10px", textAlign: "center" }}>{order.status}</td>
//               <td style={{ fontSize: "10px", textAlign: "center" }}>
//                 {order.status === 'Pending' ? (
//                   <button style={{ color: "white", backgroundColor: "red", border: "none", cursor: "pointer" }} onClick={() => handleCancelOrder(index)}>Cancel</button>
//                 ) : (
//                   <button style={{ color: "white", backgroundColor: "grey", border: "none", cursor: "not-allowed" }} disabled>Cancel</button>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default OrderTable;


const OrderTable = () => {
    const orders = useSelector((state) => state.order.orders);
    const dispatch = useDispatch();
  
    const handleCancelOrder = (index) => {
      dispatch(cancelOrder(index));
    };
  
    return (
      <div style={{ width: "60%"}}>
        <h2 style={{ color: 'white', fontSize: "12px"}}>Order History</h2>
        <table style={{ width: '100%', border: '1px solid white', color: 'white' }}>
          <thead>
            <tr>
              <th style={{ fontSize: "12px"}}>Action</th>
              <th style={{ fontSize: "12px"}}>Pair</th>
              <th style={{ fontSize: "12px"}}>Order Type</th>
              <th style={{ fontSize: "12px"}}>Price</th>
              <th style={{ fontSize: "12px"}}>Quantity</th>
              <th style={{ fontSize: "12px"}}>Total</th>
              <th style={{ fontSize: "12px"}}>Date Created</th>
              <th style={{ fontSize: "12px"}}>Completed Date</th>
              <th style={{ fontSize: "12px"}}>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td style={{ fontSize: "10px", textAlign: "center"}}>
                  <button 
                    onClick={() => handleCancelOrder(index)} 
                    disabled={order.status !== 'Pending'}
                    style={{
                      backgroundColor: order.status === 'Pending' ? 'red' : 'grey',
                      color: 'white',
                      cursor: order.status === 'Pending' ? 'pointer' : 'not-allowed',
                      border: 'none',
                      borderRadius: '4px',
                      padding: '5px 10px',
                    }}
                  >
                    {order.status === 'Pending' ? 'Cancel' : 'Cancelled'}
                  </button>
                </td>
                <td style={{ fontSize: "10px", textAlign: "center"}}>{order.pairs}</td>
                <td style={{ fontSize: "10px", textAlign: "center"}}>{order.orderType}</td>
                <td style={{ fontSize: "10px", textAlign: "center"}}>{order.price}</td>
                <td style={{ fontSize: "10px", textAlign: "center" }} >{formatNumber(order.quantity)}</td>
                <td style={{ fontSize: "10px", textAlign: "center" }}>{formatNumber(order.total)}</td>
                <td style={{ fontSize: "10px", textAlign: "center"}}>{order.dateCreated}</td>
                <td style={{ fontSize: "10px", textAlign: "center"}}>{order.completedDate}</td>
                <td style={{ fontSize: "10px", textAlign: "center"}}>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default OrderTable;
  