import Chart from "../../components/Chart";
import OrderBook from "../../components/orderbook/OrderBook"
import CreateOrder from "../../components/Orders/CreateOrder";
import { ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OrderTable from "../../components/Orders/OrderHistory";
import { useState } from'react';

const LandingPage = () => {


    const [selectedPrice, setSelectedPrice] = useState('');

    const handlePriceClick = (price) => {
      setSelectedPrice(price);
    };

    return (
        <>
            <ToastContainer
            position="top-right"
            autoClose={2001}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            width="600px"
            pauseOnFocusLoss
            draggable
            pauseOnHover={false}
            transition={Bounce}
            theme="colored"
            />
            <div style={{ display: "flex", flexDirection: "row"}}>
                <OrderBook onPriceClick={handlePriceClick}/>
                <Chart/>
            </div>
            <div style={{ justifyContent: "space-between", display: "flex", flexDirection: "row", width: "95%", padding: "20px"}}>
                <CreateOrder selectedPrice={selectedPrice}/>
                <OrderTable/>
            </div>
        </>
    );
}

export default LandingPage;