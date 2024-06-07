export function formatPairs(pair) {
    return pair.toUpperCase().match(/.{1,3}/g);
}

export const pairs = [
    "BTC/USDT",
    "ETH/BTC",
    "LTC/USDT",
    "XRP/USDT",
];