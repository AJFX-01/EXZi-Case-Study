

import { useState, useEffect } from "react";
import InputField from "../Inputs/InputField";
import OrderTypeDropdown, { orderTypes } from "./OrderType";
import { useSelector, useDispatch } from "react-redux";
import QuantitySlider from "./QuantityRange";
import { toast } from "react-toastify";
import { formatToFiveDecimalPlaces, formatToSignificantDecimals, formatTradingPair } from "../../utils/orders";
import { reduceBalance, addOrder, setCryptoPair, setFormattedCryptoPair } from "../../red/actions";
import PairDropdown from "../Pairs";
import axios from 'axios';

const CreateOrder = ({ selectedPrice }) => {
  const dispatch = useDispatch();
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const formattedCryptoPair = useSelector((state) => state.app.formattedCryptoPair);
  const apiPair = formatTradingPair(formattedCryptoPair);
  const [selectedOrderType, setSelectedOrderType] = useState(orderTypes[0]);
  const balance = useSelector((state) => state.balance.balance);
  const [sliderValue, setSliderValue] = useState(0);
  const [marketPrice, setMarketPrice] = useState(null);

  const handleOrderTypeChange = (event) => setSelectedOrderType(event.target.value);

  const handlePriceChange1 = (e) => {
    const newPrice = e.target.value;
    setPrice(newPrice);
  };


  const handleQuantityChange2 = (e) => {
    const newQuantity = formatToSignificantDecimals(e.target.value);
    setQuantity(newQuantity);
  };

  const updateQuantity = (price, percentage) => {
    if (price > 0) {
      const newQuantity = formatToSignificantDecimals((balance * percentage) / (100 * price));
      setQuantity(newQuantity);
    }
  };

  const handleSliderChange = (value) => {
    setSliderValue(value);
    updateQuantity(price, value);
  };

  const handlePairChange = (event) => {
    const selectedPair = event.target.value.replace('/', '').toLowerCase();
    const formattedPair = event.target.value;

    dispatch(setCryptoPair(selectedPair));
    dispatch(setFormattedCryptoPair(formattedPair));
  };

  const isOrderValid = quantity * price <= balance;

  useEffect(() => {
    updateQuantity(price, sliderValue, updateQuantity);
  }, [price, sliderValue]);

  
  useEffect(() => {
    if (selectedPrice) {
      setPrice(selectedPrice);
    }
  }, [selectedPrice]);

  useEffect(() => {
    const fetchMarketPrice = async () => {
      try {
        const response = await axios({
          method: 'get',
          url: `https://rest.coinapi.io/v1/quotes/BINANCE_SPOT_${apiPair}/current`,
          headers: {
            'Accept': 'application/json',
            'X-CoinAPI-Key': '7290DAF8-7FD9-4C95-85EB-ADB13EF6DCB9'
          }
        });
        const data = response.data;
        if (data) {
          const marketPrice = data.ask_price;
          setMarketPrice(marketPrice);
          setPrice(marketPrice); // Set the initial price for LIMIT orders
        } else {
          toast.error("Failed to fetch market price");
          console.error("No market price data available");
        }
      } catch (error) {
        toast.error("Failed to fetch market price");
        console.error("Error fetching market price:", error);
      }
    };

    fetchMarketPrice();
  }, [formattedCryptoPair, marketPrice, apiPair, setMarketPrice, setPrice]);

  const handleCreateOrder = async () => {
    let finalPrice = price;

    // Adjust validation for market orders
    const isMarketOrder = selectedOrderType === 'MARKET SELL' || selectedOrderType === 'MARKET BUY';
    
    if (!isOrderValid) {
      toast.error("Insufficient funds");
      return;
    } else if (!isMarketOrder && (price <= 0 || quantity <= 0)) {
      toast.error("Please enter price and quantity");
      return;
    } else if (isMarketOrder && quantity <= 0) {
      toast.error("Please enter quantity");
      return;
    }

    if (isMarketOrder) {
      finalPrice = marketPrice;
      if (!finalPrice) {
        toast.error("Failed to fetch market price");
        return;
      }
    }

    const totalCost = finalPrice * quantity;

    let status, completedDate;
    const currentDate = new Date().toLocaleString();

    if (selectedOrderType === 'BUY LIMIT' || selectedOrderType === 'SELL LIMIT') {
      status = 'Pending';
      completedDate = '';
    } else if (isMarketOrder) {
      status = 'Filled';
      completedDate = currentDate;
    }

    const order = {
      pairs: formattedCryptoPair,
      orderType: selectedOrderType,
      price: finalPrice,
      quantity: quantity,
      total: totalCost.toFixed(2),
      dateCreated: new Date().toLocaleString(),
      completedDate: completedDate,
      status: status
    };

    dispatch(addOrder(order));
    dispatch(reduceBalance(totalCost));
    setQuantity('');
    setSliderValue(0);
    toast.success(`Your ${selectedOrderType} order for ${formattedCryptoPair} is completed`);
    setPrice(finalPrice);
    setMarketPrice(finalPrice);
  };

  return (
    <div style={{ width: "35%" }}>
      <h1 style={{ fontSize: "12px", color: "white" }}>Create an Order</h1>
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
          <OrderTypeDropdown selectedOrderType={selectedOrderType} onChange={handleOrderTypeChange} />
          <PairDropdown selectedPair={formattedCryptoPair} onChange={handlePairChange} />
        </div>

        {selectedOrderType === 'MARKET SELL' || selectedOrderType === 'MARKET BUY' ? (
          <>
            <InputField
              label="Market Price"
              type="text"
              value="Market Price"
              disabled
            />
            <input type="hidden" value={marketPrice} />
          </>
        ) : (
          <InputField
            label="Price"
            type="number"
            value={price}
            onChange={handlePriceChange1}
          />
        )}
        <InputField
          label="Quantity"
          type="number"
          value={quantity}
          onChange={handleQuantityChange2}
        />
        <QuantitySlider value={sliderValue} onChange={handleSliderChange} />
        <button style={{
          marginTop: "20px",
          color: "white",
          height: "30px",
          width: "120px",
          fontSize: "12px",
          background: "blue",
          borderRadius: "8px",
          padding: "2px 5px",
          borderColor: "white",
          cursor: "pointer"
        }} disabled={!isOrderValid}
          onClick={handleCreateOrder}
        >
          {selectedOrderType}
        </button>
      </div>
    </div>
  );
};

export default CreateOrder;
