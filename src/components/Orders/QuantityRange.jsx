const QuantitySlider = ({ value, onChange }) => {
    const handleSliderChange = (event) => {
      onChange(Number(event.target.value));
    };
  
    return (
      <div>
        <input
          type="range"
          min="0"
          max="100"
          step="20"
          value={value}
          onChange={handleSliderChange}
          style={{ width: "100%" }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'white' }}>
          <span>0%</span>
          <span>20%</span>
          <span>40%</span>
          <span>60%</span>
          <span>80%</span>
          <span>100%</span>
        </div>
      </div>
    );
};
  
export default QuantitySlider;