import RNFetchBlob from 'rn-fetch-blob';
import {Platform} from 'react-native';
import moment from 'moment';
import _ from 'lodash';

const _DIR = RNFetchBlob.fs.dirs.SDCardApplicationDir;
const _FILENAME = moment().format('YYYY-MM-DD') + '.json';
const _TODAY_FILE_PATH = _DIR + '/files/' + _FILENAME;

export const createRecord = async (record) => {
  const data = await getTodayRecords();
  data.push(record);
  storeRecords(data);
};

export const storeRecords = (records) => {
  RNFetchBlob.fs.writeFile(_TODAY_FILE_PATH, JSON.stringify(records), 'utf8');
};

export const getTodayRecords = async () => {
  RNFetchBlob.fs.exists(_TODAY_FILE_PATH).then((exist) => {
    if (!exist)
      RNFetchBlob.fs.createFile(_TODAY_FILE_PATH, JSON.stringify([]), 'utf8');
  });
  return await RNFetchBlob.fs
    .readFile(_TODAY_FILE_PATH, 'utf8')
    .then((data) => JSON.parse(data));
};

export const getRecordsByDate = async (date) => {
  const DATE_FILENAME =
    _DIR + '/files/' + moment(date).format('YYYY-MM-DD') + '.json';
  RNFetchBlob.fs.exists(DATE_FILENAME).then((exist) => {
    if (!exist) {
      RNFetchBlob.fs.createFile(DATE_FILENAME, JSON.stringify([]), 'utf8');
      return [];
    }
  });

  return await RNFetchBlob.fs
    .readFile(DATE_FILENAME, 'utf8')
    .then((data) => JSON.parse(data));
};

export const createRecordByDate = async (date, record) => {
  const DATE_FILENAME =
    _DIR + '/files/' + moment(date).format('YYYY-MM-DD') + '.json';
  const recordsData = await getRecordsByDate(DATE_FILENAME);
  recordsData.push(record);
  storeRecordByDate(date, recordsData);
};

export const storeRecordByDate = (date, records) => {
  const DATE_FILENAME =
    _DIR + '/files/' + moment(date).format('YYYY-MM-DD') + '.json';
  RNFetchBlob.fs.writeFile(DATE_FILENAME, JSON.stringify(records), 'utf8');
};
