export const orderTypes = [
    "BUY LIMIT",
    "SELL LIMIT",
    "MARKET BUY",
    "MARKET SELL",
]

  
const OrderTypeDropdown = ({ selectedOrderType, onChange }) => {
    return (
        <select value={selectedOrderType} onChange={onChange} style={{width: "120px", height: "30px", marginTop: "20px", borderRadius: "10px", padding: "5px", borderColor: "white", color: "white", background: "rgb(21, 24, 33)"}}>
            {orderTypes.map((orderType) => (
                <option key={orderType} value={orderType}>
                {orderType}
                </option>
            ))}
        </select>
    );
};

export default OrderTypeDropdown;