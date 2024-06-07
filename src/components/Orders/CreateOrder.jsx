import { useState, useEffect } from "react"
import InputField from "../Inputs/InputField"
import OrderTypeDropdown, {orderTypes} from "./OrderType"
import { useSelector } from "react-redux"
import QuantitySlider from "./QuantityRange"
import { formatPrice, formatToFiveDecimalPlaces } from "../../utils/orders"
const CreateOrder = () => {

    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const formattedCryptoPair = useSelector((state) => state.app.formattedCryptoPair);
    const [selectedOrderType, setSelectedOrderType] = useState(orderTypes[0]);
    const balance = useSelector((state) => state.balance.balance);
    const [sliderValue, setSliderValue] = useState(0);

    const handleOrderTypeChange = (event) => setSelectedOrderType(event.target.value);
    // const handlePriceChange1 = (e) => {
    //     const newPrice = e.target.value;
    //     setPrice(newPrice);
    //     // Recalculate quantity based on the new price and current slider percentage
    //     const newQuantity = (sliderValue / 100) * (balance / newPrice);
    //     setQuantity(newQuantity);
    
    // }
    // const handleQuantityChange2 = (e) => setQuantity(e.target.value)

    // const handleQuantityRangeChange = (newQuantity, percentage) => {
    //     setQuantity(newQuantity);
    //     setSliderValue(percentage); 
    // };

    // const updateQuantity = (price, percentage) => {
    //     const newQuantity = formatToFiveDecimalPlaces((balance * percentage) / (100 * price));
    //     setQuantity(newQuantity);
    // };

    // useEffect(() => {
    //     // Update quantity whenever price or sliderValue changes
    //     if (price > 0) {
    //       const newQuantity = (sliderValue / 100) * (balance / price);
    //       setQuantity(newQuantity);
    //     }
    // }, [price, sliderValue, balance]);

    const handlePriceChange1 = (e) => {
        const newPrice = e.target.value;
        setPrice(newPrice);
    };
    
      const handleQuantityChange2 = (e) => {
        const newQuantity = formatToFiveDecimalPlaces(e.target.value);
        setQuantity(newQuantity);
      };
    
      const updateQuantity = (price, percentage) => {
        if (price > 0) {
          const newQuantity = formatToFiveDecimalPlaces((balance * percentage) / (100 * price));
          setQuantity(newQuantity);
        }
      };
    
      const handleSliderChange = (value) => {
        setSliderValue(value);
        updateQuantity(price, value);
      };
    
      const isOrderValid = quantity * price <= balance;
    
      useEffect(() => {
        updateQuantity(price, sliderValue);
      }, [price, sliderValue]);
    
    return (
        <div style={{marginRight: "20px"}}>
            <h1 style={{ fontSize: "12px", color: "white"}}>Create an Order</h1>
            <div style={{
                padding: "20px",
                border: "1px solid white"
            }}>
               <div style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignContent: "center"
               }}>
                <OrderTypeDropdown selectedOrderType={selectedOrderType} onChange={handleOrderTypeChange}/>
                <span style={{color: "white", fontSize: "12px", marginTop: "20px"}}>{formattedCryptoPair.toUpperCase()}</span>
                </div> 
                <InputField
                    label="Price"
                    type="number"
                    value={(formatPrice(price))}
                    onChange={handlePriceChange1}
                />
                <InputField
                    label="quantity"
                    type="number"
                    value={quantity}
                    onChange={handleQuantityChange2}
                />
                <QuantitySlider value={sliderValue} onChange={handleSliderChange} />
                <button style={{
                    marginTop: "20px",
                     color:"white",
                     height: "30px",
                     width: "120px",
                     fontSize: "12px",
                     background: "blue",
                     borderRadius: "8px",
                     padding: "2px 5px",
                     borderColor: "white",
                     color: "white",
                     cursor: "pointer"
                     
                }}  disabled={!isOrderValid}>
                    {selectedOrderType}
                </button>
            </div>
        </div>
    )
}



export default CreateOrder