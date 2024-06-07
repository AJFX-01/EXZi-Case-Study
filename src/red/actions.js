export const ADD_BIDS = 'ADD_BIDS';
export const ADD_ASKS = 'ADD_ASKS';
export const SET_CRYPTO_PAIR = 'SET_CRYPTO_PAIR';
export const SET_FORMATTED_CRYPTO_PAIR = 'SET_FORMATTED_CRYPTO_PAIR';
export const SET_BALANCE = 'SET_BALANCE';
export const UPDATE_BALANCE = 'UPDATE_BALANCE';
export const REDUCE_BALANCE = 'REDUCE_BALANCE';
export const ADD_ORDER = 'ADD_ORDER';

// balance
export const setBalance = (balance) => ({
  type: SET_BALANCE,
  payload: balance,
});

export const updateBalance = (balance) => ({
  type: UPDATE_BALANCE,
  payload: balance,
});

export const reduceBalance = (amount) => ({
  type: REDUCE_BALANCE,
  payload: amount,
});
// cryto paiirs
export const setCryptoPair = (pair) => ({
  type: SET_CRYPTO_PAIR,
  payload: pair,
}); 

export const setFormattedCryptoPair = (formattedPair) => ({
  type: SET_FORMATTED_CRYPTO_PAIR,
  payload: formattedPair,
});

// OrderBook
export const addBids = (bids) => ({
  type: ADD_BIDS,
  payload: bids,
});

export const addAsks = (asks) => ({
  type: ADD_ASKS,
  payload: asks,
});

// OrderHistory

export const addOrder = (order) => ({
  type: ADD_ORDER,
  payload: order,
});
