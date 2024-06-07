
export const formatTradingPair = (pair) => {
    return pair.replace('/', '_');
};

export const formatNumber = (arg) => {
    return new Intl.NumberFormat('en-US').format(arg);
};


export const formatPrice = (arg) => {
    return arg.toLocaleString("en", { useGrouping: true, minimumFractionDigits: 2 })
};


export const formatToFiveDecimalPlaces = (number) => {
    const num = parseFloat(number);
    if (isNaN(num)) return '';
    return num.toFixed(5);
};

export const formatToSignificantDecimals = (number) => {
    const num = parseFloat(number);
    if (num === 0) return '0';
    if (isNaN(num)) return '';
  
    // Check for numbers close to zero (considered insignificant)
    if (Math.abs(num) < 1e-7) {
      return num.toFixed(2);
    }
  
    // Calculate magnitude and significant figures
    const mag = Math.floor(Math.log10(Math.abs(num)));
    const sigFigs = Math.ceil(Math.log10(Math.abs(num) / (10**mag)));
  
    const decimals = sigFigs <= 2 ? 2 : 5;
  
    return num.toFixed(decimals);
  };

