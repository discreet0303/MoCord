import {
  getTodayRecords,
  createRecord,
  storeRecords,
} from '../utils/fileManager';

export const fetchRecord = () => {
  return (dispatch) => {
    getTodayRecords().then((res) => {
      dispatch({
        type: 'FETCH_RECORD',
        payload: res,
      });
    });
  };
};

export const addRecord = (record) => {
  createRecord(record);
  return {
    type: 'ADD_RECORD',
    payload: record,
  };
};

export const setRecord = (records) => {
  storeRecords(records);
  return {
    type: 'SET_RECORD',
    payload: records,
  };
};
