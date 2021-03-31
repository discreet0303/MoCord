import {combineReducers} from 'redux';

const INITIAL_STATE = {
  records: [],
};

const recordsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'ADD_RECORD':
      return {
        ...state,
        records: [...state.records, action.payload],
      };
    case 'SET_RECORD':
      return {records: action.payload};
    default:
      return state;
  }
};

export default combineReducers({
  records: recordsReducer,
});
