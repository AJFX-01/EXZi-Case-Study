
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  formatPrice } from '../../utils/orders';
import { addBids, addAsks, setCryptoPair, setFormattedCryptoPair } from '../../red/actions';
import PairDropdown from '../Pairs';
import './OrderBook.css';
import Balance from '../Balance/Balance';


const ORDERBOOK_LEVELS = 10;

const OrderBook = () => {
  const dispatch = useDispatch();
  const cryptoPair = useSelector((state) => state.app.cryptoPair);
  console.log(cryptoPair)
  const formattedCryptoPair = useSelector((state) => state.app.formattedCryptoPair);
  const bids = useSelector((state) => state.orderBook.bids);
  const asks = useSelector((state) => state.orderBook.asks);

  
  const depth = 10;

  useEffect(() => {

    if (!cryptoPair) return;

    const subscribe = {
      method: 'SUBSCRIBE',
      params: [`${cryptoPair}@depth${depth}@100ms`],
      id: 1,
    };

    const ws = new WebSocket('wss://stream.testnet.binance.vision/ws');
    ws.onopen = () => {
      ws.send(JSON.stringify(subscribe));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      process(data);
    };

    ws.onclose = () => {
      ws.close();
    };

    return () => {
      ws.close();
    };
  }, [cryptoPair]);

  let currentBids = [];
  let currentAsks = [];

  const process = (data) => {
    if (data?.bids?.length > 0) {
      currentBids = [...currentBids, ...data.bids];

      if (currentBids.length > ORDERBOOK_LEVELS) {
        dispatch(addBids(currentBids.slice(0, ORDERBOOK_LEVELS)));
        currentBids = currentBids.slice(ORDERBOOK_LEVELS);
      }
    }
    if (data?.asks?.length > 0) {
      currentAsks = [...currentAsks, ...data.asks];

      if (currentAsks.length > ORDERBOOK_LEVELS) {
        dispatch(addAsks(currentAsks.slice(0, ORDERBOOK_LEVELS)));
        currentAsks = currentAsks.slice(ORDERBOOK_LEVELS);
      }
    }
  };

  const buildPriceLevels = (levels, orderType) => {
    const sortedLevelsByPrice = [...levels].sort((currentLevel, nextLevel) =>
      parseFloat(orderType === 'BIDS' ? nextLevel[0] - currentLevel[0] : currentLevel[0] - nextLevel[0])
    );

    const priceStyle = {
      fontSize: '8px',
      color: orderType === 'BIDS' ? 'green' : 'red',
    };

    return sortedLevelsByPrice.map((level, idx) => {
      const price = formatPrice(parseFloat(level[0]));
      const size = (parseFloat(level[1]));
      const total = (parseFloat(level[1]));

      return (
        <tr key={idx}>
          <td style={priceStyle}>{price}</td>
          <td  style={{ fontSize: "10px", color: "white"}}>{size}</td>
          <td  style={{ fontSize: "10px", color: "white"}}>{total}</td>
        </tr>
      );
    });

    
  };

  const handlePairChange = (event) => {
    const selectedPair = event.target.value.replace('/', '').toLowerCase();
    const formattedPair = event.target.value;

    dispatch(setCryptoPair(selectedPair));
    dispatch(setFormattedCryptoPair(formattedPair));
  
  }

  const [base, quote] = formattedCryptoPair.split('/');
  return (
    <div className='maincon' style={{ marginLeft: "20px", marginRight: "20px",}}>
      <div style={{ display: 'flex', flexDirection: "row",  justifyContent: "space-between"}}>
        <PairDropdown selectedPair={formattedCryptoPair} onChange={handlePairChange} />
        <Balance/>
      </div>
      <h2 style={{ fontSize: "14px", color: "rgb(126, 122, 122)"}}>Order Book</h2>
      <div className="order-book-container">
        <div className="order-book-section">
          <h3 style={{ textAlign: "start", fontSize: "12px", color: "rgb(126, 122, 122)"}}>Asks</h3>
          <table style={{ background:"rgb(21, 24, 33)"}}>
            <thead>
              <tr>
                <th style={{fontSize: "10px", width: "70px"}}>Price ({quote})</th>
                <th style={{fontSize: "10px" ,width: "70px"}}>Qty ({base})</th>
                <th style={{fontSize: "10px", width: "70px"}}>Total</th>
              </tr>
            </thead>
            <tbody>
              {buildPriceLevels(asks, 'ASKS')}
            </tbody>
          </table>
        </div>
        <div className="order-book-section">
          <h3 style={{ textAlign: "start", fontSize: "12px", color: "rgb(126, 122, 122)"}}>Bids</h3>
          <table style={{ background: "rgb(21, 24, 33)"}}>
            <thead>
              <tr>
                <th style={{fontSize: "10px", width: "70px"}}>Price ({quote})</th>
                <th style={{fontSize: "10px", width: "70px"}}>Qty ({base})</th>
                <th style={{fontSize: "10px", width: "70px"}}>Total</th>
              </tr>
            </thead>
            <tbody>
              {buildPriceLevels(bids, 'BIDS')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};



export default OrderBook;
