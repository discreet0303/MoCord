import {combineReducers} from 'redux';
import RecordsReducer from './RecordsReducer';
import TypesReducer from './TypesReducer';

export default combineReducers({
  records: RecordsReducer,
  types: TypesReducer,
});
