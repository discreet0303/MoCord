import {combineReducers} from 'redux';

const INITIAL_STATE = {
  records: [],
};

const recordsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'FETCH_RECORD':
      return {
        records: action.payload,
      };
    case 'ADD_RECORD':
      const {records} = state;
      records.push(action.payload);
      const newState = {records};
      return newState;
    case 'SET_RECORD':
      return {records: action.payload};
    default:
      return state;
  }
};

export default combineReducers({
  records: recordsReducer,
});
