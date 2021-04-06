import {DEFAULT_RECORD_TYPE} from '../config';
const INITIAL_TYPES_STATE = DEFAULT_RECORD_TYPE;

const TypesReducer = (state = INITIAL_TYPES_STATE, action) => {
  switch (action.type) {
    case 'ADD_TYPE':
      return [...state, action.payload];
    case 'SET_TYPES':
      return [...action.payload];
    default:
      return state;
  }
};

export default TypesReducer;
