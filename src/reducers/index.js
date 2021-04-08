import {combineReducers} from 'redux';
import RecordsReducer from './RecordsReducer';
import TypesReducer from './TypesReducer';
import WalletsReducer from './WalletsReducer';

export default combineReducers({
  records: RecordsReducer,
  types: TypesReducer,
  wallets: WalletsReducer,
});
