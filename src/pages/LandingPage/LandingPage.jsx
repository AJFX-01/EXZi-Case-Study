import Chart from "../../components/Chart";
import OrderBook from "../../components/orderbook/OrderBook"
import CreateOrder from "../../components/Orders/CreateOrder";
import { ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LandingPage = () => {


    return (
        <>
            <ToastContainer
            position="top-right"
            autoClose={2001}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover={false}
            transition={Bounce}
            theme="colored"
            />
            <div style={{ display: "flex", flexDirection: "row"}}>
                <OrderBook/>
                <Chart/>
            </div>
            <div style={{marginRight: "20px", width: "40%", height: "600px"}}>
                <CreateOrder/>
            </div>
        </>
    );
}

export default LandingPage;