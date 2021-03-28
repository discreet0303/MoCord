import _ from 'lodash';
import {
  getTodayRecords,
  createRecord,
  storeRecords,
  getDateRecords,
} from '../utils/fileManager';

export const fetchRecord = (date) => async (dispatch) => {
  const data = await getDateRecords(date);
  dispatch({
    type: 'FETCH_RECORD',
    payload: data,
  });
};

export const addRecord = (record) => {
  record.id = _.uniqueId();
  createRecord(record);
  return {
    type: 'ADD_RECORD',
    payload: record,
  };
};

export const updateRecord = (record) => async (dispatch) => {
  const data = await getTodayRecords();
  console.log('before', data);
  const idx = _.findIndex(data, ['id', record.id]);
  data[idx] = record;
  console.log('after', data);
  storeRecords(data);
  dispatch({
    type: 'SET_RECORD',
    payload: data,
  });
};

export const setRecord = (records) => {
  storeRecords(records);
  return {
    type: 'SET_RECORD',
    payload: records,
  };
};
