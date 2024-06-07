const OrderHistory = () => {


    return (
        <div className="order-book-section">
          <h3 style={{ textAlign: "start", fontSize: "12px", color: "rgb(126, 122, 122)"}}>Asks</h3>
          <table style={{ background:"rgb(21, 24, 33)"}}>
            <thead>
              <tr>
                <th style={{fontSize: "10px", width: "70px"}}>Price </th>
                <th style={{fontSize: "10px" ,width: "70px"}}>Qty </th>
                <th style={{fontSize: "10px", width: "70px"}}>Total</th>
                <th style={{fontSize: "10px", width: "70px"}}>Total</th>
                <th style={{fontSize: "10px", width: "70px"}}>Total</th>
                <th style={{fontSize: "10px", width: "70px"}}>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontSize: "10px", color: "white"}} ></td>
                <td  style={{ fontSize: "10px", color: "white"}}></td>
                <td  style={{ fontSize: "10px", color: "white"}}></td>
              </tr>
            </tbody>
          </table>
        </div>
    );
}



export default OrderHistory;