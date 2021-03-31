import _ from 'lodash';
import moment from 'moment';
import {
  getRecordsByDate,
  createRecordByDate,
  storeRecordByDate,
} from '../utils/fileManager';

export const fetchRecord = (date) => async (dispatch) => {
  const data = await getRecordsByDate(date);
  dispatch({
    type: 'SET_RECORD',
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
  const date = moment(record.datetime).format('YYYY-MM-DD');
  const recordsData = await getRecordsByDate(date);
  const idx = _.findIndex(recordsData, ['id', record.id]);
  recordsData[idx] = record;
  storeRecordByDate(date, recordsData);
  dispatch({
    type: 'SET_RECORD',
    payload: recordsData,
  });
};

export const setRecord = (date, records) => {
  storeRecordByDate(date, records);
  return {
    type: 'SET_RECORD',
    payload: records,
  };
};
