// import { useEffect, useState } from "react"
// import { formatNumber, formatPrice } from "../utils/orders";

// const OrderBook = () => {
//     const [orders, setOrders] = useState([]);
    
//     const crytoPair = "btcusdt"
//     const currencyArray = crytoPair.toUpperCase().match(/.{1,3}/g);
//     const depth = 10

//     useEffect(() => {
//         const subscirbe = {
//             "method" : "SUBSCRIBE",
//             "params": [
//                 `${crytoPair}@depth${depth}@100ms`
//             ],
//             "id": 1
//         }

//         const ws = new WebSocket('wss://stream.testnet.binance.vision/ws');
//         ws.onopen = () => {
//             ws.send(JSON.stringify(subscirbe));
//         };

//         ws.onmessage = (event) => {
//             const data = JSON.parse(event.data);
//             setOrders(data);
//             console.log(data);
//         }

//         ws.close = () => {
//             ws.close();
//         };

        
//     }, [crytoPair]);

//     const { bids, asks } = orders;

// const orderRows = (arr) => {
//   if (!arr) return null;

//   const sortedOrders = [...arr].sort((a, b) => b[0] - a[0]);

//   return (
//     sortedOrders.map((item, index) => {
//       const price = (item[1]);
//       const size = formatNumber(item[0]);
//       const total = (item[2]);

//       return (
//         <tr key={index}>
//           <td>{price}</td>
//           <td>{size}</td>
//           <td>{total}</td>
//         </tr>
//       );
//     })
//   );
// };



//     const orderHead = (title) => (
//         <thead>
//             <tr>
//                 <th colSpan="3">{title}</th>
//             </tr>
//             <tr>
//                 <th>Amount ({currencyArray[0]})</th>
//                 <th>Price ({currencyArray[1]})</th>
//                 <th>Total </th>
//             </tr>
//          </thead>
//     );

//     return (
//         <div className="order-book" style={{ background: "transparent"}}>
//             <table>
//                 {orderHead('Bids')}
//                 <tbody>
//                     {orderRows(bids)}
//                 </tbody>
//             </table>
//             <table>
//                 {orderHead('Asks')}
//                 <tbody>
//                     {orderRows(asks)}
//                 </tbody>
//             </table>
//         </div>
//     );
// }

// export default OrderBook;
// import React, { useState, useEffect } from 'react';

// const OrderBook = () => {
//   const [orders, setOrders] = useState([]);
//   const currencyPair = 'btcusd';

//   const currencyArray = currencyPair.toUpperCase().match(/.{1,3}/g);

//   useEffect(() => {
//     const subscribe = {
//     //   event: 'bts:subscribe',
//     //   data: {
//     //     channel: `order_book_${currencyPair}`
//     //   }
//     "event":"subscribe", "feed":"book_ui_1", "product_ids":["PI_XBTUSD"]
//     };
//     const ws = new WebSocket('wss://www.cryptofacilities.com/ws/v1');

//     ws.onopen = () => {
//       ws.send(JSON.stringify(subscribe));
//     };
//     ws.onmessage = (event) => {
//       const response = JSON.parse(event.data);
//       setOrders(response);
//     };
//     ws.onclose = () => {
//       ws.close();
//     };

//     return () => {
//       ws.close();
//     };
//   }, [currencyPair]);

//   const { bids, asks } = orders;

// const orderRows = (arr) => {
//   if (!arr) return null;

//   const sortedOrders = [...arr].sort((a, b) => b[0] - a[0]);

//   return (
//     sortedOrders.map((item, index) => {
//       const price = formatPrice(item[1]);
//       const size = formatNumber(item[0]);
//       const total = formatNumber(item[2]);

//       return (
//         <tr key={index}>
//           <td>{price}</td>
//           <td>{size}</td>
//           <td>{total}</td>
//         </tr>
//       );
//     })
//   );
// };

//   const orderHead = (title) => (
//     <thead>
//       <tr>
//         <th colSpan="3">{title}</th>
//       </tr>
//       <tr>
//         <th>Amount ({currencyArray[0]})</th>
//         <th>Price ({currencyArray[1]})</th>
//         <th>Total </th>
//       </tr>
//     </thead>
//   );
//   return (
//     <div className="order-container">
//       <table>
//         {orderHead('Bids')}
//         <tbody>{orderRows(bids)}</tbody>
//       </table>

//       <table>
//         {orderHead('Asks')}
//         <tbody>{orderRows(asks)}</tbody>
//       </table>

//     </div>
//   );
// };

// export default OrderBook;
// import { useEffect, useState } from "react";
// import { formatNumber, formatPrice } from "../utils/orders";

// const OrderBook = () => {
//     const [orders, setOrders] = useState({ bids: [], asks: [] });

//     const cryptoPair = "btcusdt";
//     const depth = 20
//     useEffect(() => {
//         const subscribe = {
//             method: "SUBSCRIBE",
//             params: [
//                 `${cryptoPair}@depth${depth}@100ms`
//             ],
//             id: 1
//         };

//         const ws = new WebSocket('wss://stream.testnet.binance.vision/ws');
//         ws.onopen = () => {
//             ws.send(JSON.stringify(subscribe));
//         };

//         ws.onmessage = (event) => {
//             const data = JSON.parse(event.data);
//             if (data.bids && data.asks) {
//                 setOrders({
//                     bids: data.bids,
//                     asks: data.asks
//                 });
//             }
//         };

//         ws.onclose = () => {
//             ws.close();
//         };

//         return () => {
//             ws.close();
//         };
//     }, [cryptoPair]);

//     const buildPriceLevels = (levels, orderType) => {
//         const sortedLevelsByPrice = [...levels].sort((currentLevel, nextLevel) => {
//             return parseFloat(orderType === "BIDS" ? nextLevel[0] - currentLevel[0] : currentLevel[0] - nextLevel[0]);
//         });

//         return (
//             sortedLevelsByPrice.map((level, idx) => {
//                 const price = formatPrice(parseFloat(level[0]));
//                 const size = (parseFloat(level[1]));
//                 const total = (parseFloat(level[1])); // Assuming total might be size if not provided

//                 return (
//                     <tr key={idx}>
//                         <td>{price}</td>
//                         <td>{size}</td>
//                         <td>{total}</td>
//                     </tr>
//                 );
//             })
//         );
//     };

//     return (
//         <div>
//             <h2>Order Book</h2>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Price</th>
//                         <th>Size</th>
//                         <th>Total</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {buildPriceLevels(orders.bids, "BIDS")}
//                     {buildPriceLevels(orders.asks, "ASKS")}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default OrderBook;


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
