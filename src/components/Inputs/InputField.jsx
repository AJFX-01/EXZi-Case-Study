import React from 'react';
import './InputField.css';

const InputField = ({ label, type, value, onChange }) => {
  return (
    <div className="input-container">
      <label className="input-label">{label}</label>
      <input
        className="input-field"
        type={type}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputField;
