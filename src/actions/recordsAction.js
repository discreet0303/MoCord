import _ from 'lodash';
import {
  getTodayRecords,
  createRecord,
  storeRecords,
  getRecordsByDate,
  createRecordByDate,
} from '../utils/fileManager';

export const fetchRecord = (date) => async (dispatch) => {
  const data = await getRecordsByDate(date);
  dispatch({
    type: 'FETCH_RECORD',
    payload: data,
  });
};

export const addRecord = (record) => {
  record.id = _.uniqueId();
  createRecordByDate(record.datetime, record);
  return {
    type: 'ADD_RECORD',
    payload: record,
  };
};

export const updateRecord = (record) => async (dispatch) => {
  const data = await getTodayRecords();
  const idx = _.findIndex(data, ['id', record.id]);
  data[idx] = record;
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
