import RNFetchBlob from 'rn-fetch-blob';
import moment from 'moment';
import _ from 'lodash';

const _DIR = RNFetchBlob.fs.dirs.SDCardApplicationDir;
const _FILENAME = moment().format('YYYY-MM-DD') + '.json';
const _TODAY_FILE_PATH = _DIR + '/files/' + _FILENAME;

export const getRecordsByDate = async (date) => {
  const DATE_FILENAME =
    _DIR + '/files/' + moment(date).format('YYYY-MM-DD') + '.json';
  const fileExist = await RNFetchBlob.fs
    .exists(DATE_FILENAME)
    .then((exist) => exist);
  if (!fileExist) {
    await RNFetchBlob.fs.createFile(DATE_FILENAME, JSON.stringify([]), 'utf8');
    return [];
  }
  return await RNFetchBlob.fs
    .readFile(DATE_FILENAME, 'utf8')
    .then((data) => JSON.parse(data));
};

export const createRecordByDate = async (date, record) => {
  const recordsData = await getRecordsByDate(date);
  recordsData.push(record);
  storeRecordByDate(date, recordsData);
};

export const storeRecordByDate = (date, records) => {
  const DATE_FILENAME =
    _DIR + '/files/' + moment(date).format('YYYY-MM-DD') + '.json';
  const idData = _.map(records, (record, idx) => ({...record, id: idx + 1}));
  RNFetchBlob.fs.writeFile(DATE_FILENAME, JSON.stringify(idData), 'utf8');
};

export const getRecordByMonth = async (year, month) => {
  month -= 1;
  const startMonthDate = moment().set({year, month}).startOf('month');
  const endMonthDate = moment().set({year, month}).endOf('month');

  let days = [];
  while (startMonthDate <= endMonthDate) {
    days.push(startMonthDate.format('YYYY-MM-DD'));
    startMonthDate.add(1, 'day');
  }

  let recordsMonth = [];
  for (const day of days) {
    const data = await getRecordsByDate(day);
    if (data.length != 0) recordsMonth = _.concat(recordsMonth, data);
  }

  return recordsMonth;
};
