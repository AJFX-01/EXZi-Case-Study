export const pairs = [
    'BTC/USDT',
    'ETH/BTC',
    'LTC/USDT',
    'XRP/USDT',
];
  
const PairDropdown = ({ selectedPair, onChange }) => {
    return (
        <select value={selectedPair} onChange={onChange} style={{width: "100px", height: "30px", marginTop: "20px", borderRadius: "10px", padding: "5px", borderColor: "white", color: "white", background: "rgb(21, 24, 33)"}}>
            {pairs.map((pair) => (
                <option key={pair} value={pair}>
                {pair}
                </option>
            ))}
        </select>
    );
};

export default PairDropdown;