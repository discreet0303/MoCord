import { DEFAULT_WALLET } from '../config';
const INITIAL_TYPES_STATE = DEFAULT_WALLET;

const WalletsReducer = (state = INITIAL_TYPES_STATE, action) => {
  switch (action.type) {
    case 'ADD_WALLET':
      return [...state, action.payload];
    case 'SET_WALLETS':
      return [...action.payload];
    default:
      return state;
  }
};

export default WalletsReducer;
