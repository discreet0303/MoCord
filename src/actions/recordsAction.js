import {
  getTodayRecords,
  createRecord,
  storeRecords,
} from '../utils/fileManager';

export const fetchRecord = () => async (dispatch) => {
  const data = await getTodayRecords();
  dispatch({
    type: 'FETCH_RECORD',
    payload: data,
  });
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
