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
