import {
  SET_CRYPTO_PAIR,
  SET_FORMATTED_CRYPTO_PAIR,
  ADD_BIDS,
  ADD_ASKS,
} from './actions';
import { SET_BALANCE, UPDATE_BALANCE } from './actions';

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
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  app: appReducer,
  orderBook: orderBookReducer,
  balance: balanceReducer
});

export default rootReducer;
