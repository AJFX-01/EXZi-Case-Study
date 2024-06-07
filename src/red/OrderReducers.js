import {
  SET_CRYPTO_PAIR,
  SET_FORMATTED_CRYPTO_PAIR,
  ADD_BIDS,
  ADD_ASKS,
  ADD_ORDER,
  SET_BALANCE, UPDATE_BALANCE, REDUCE_BALANCE
} from './actions';

import { combineReducers } from 'redux';


const initialAppState = {
  cryptoPair: 'btcusdt',
  formattedCryptoPair: 'BTC/USDT',
};

const initialBalanceState = {
  balance: 0,
};

const initialOrderBookState = {
  bids: [],
  asks: [],
};

const initialOrderState = {
  orders: [],
};

// CrytoPairs
const appReducer = (state = initialAppState, action) => {
  switch (action.type) {
    case SET_CRYPTO_PAIR:
      return {
        ...state,
        cryptoPair: action.payload,
      };
    case SET_FORMATTED_CRYPTO_PAIR:
      return {
        ...state,
        formattedCryptoPair: action.payload,
      };
    default:
      return state;
  }
};
// OrderBook
const orderBookReducer = (state = initialOrderBookState, action) => {
  switch (action.type) {
    case ADD_BIDS:
      return {
        ...state,
        bids: action.payload,
      };
    case ADD_ASKS:
      return {
        ...state,
        asks: action.payload,
      };
    default:
      return state;
  }
};

// Balance
const balanceReducer = (state = initialBalanceState, action) => {
  switch (action.type) {
    case SET_BALANCE:
      return {
        ...state,
        balance: action.payload,
      };
    case UPDATE_BALANCE:
      return {
        ...state,
        balance: state.balance + action.payload,
      };
    case REDUCE_BALANCE:
      return {
        ...state,
        balance: state.balance - action.payload,
      };
    default:
      return state;
  }
};

// Orders
const orderReducer = (state = initialOrderState, action) => {
  switch (action.type) {
    case ADD_ORDER:
      return {
        ...state,
        orders: [action.payload, ...state.orders],
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  app: appReducer,
  orderBook: orderBookReducer,
  balance: balanceReducer,
  order: orderReducer
});

export default rootReducer;
