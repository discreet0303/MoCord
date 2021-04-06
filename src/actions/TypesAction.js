import _ from 'lodash';
import {
  getRecordTypes,
  createRecordType,
  storeRecordTypes,
} from '../utils/fileManager';

export const fetchTypes = () => async (dispatch) => {
  const data = await getRecordTypes();
  dispatch({
    type: 'SET_TYPES',
    payload: data,
  });
};

export const addType = (type) => async (dispatch) => {
  await createRecordType(type);
  const data = await getRecordTypes();
  dispatch({
    type: 'SET_TYPES',
    payload: data,
  });
};

export const removeType = (type) => async (dispatch) => {
  const data = await getRecordTypes();
  const filterTypes = _.filter(
    data,
    (typeItem) => typeItem.label !== type.label,
  );
  await storeRecordTypes(filterTypes);
  dispatch({
    type: 'SET_TYPES',
    payload: filterTypes,
  });
};
