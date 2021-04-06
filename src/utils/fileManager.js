import RNFetchBlob from 'rn-fetch-blob';
import moment from 'moment';
import _ from 'lodash';

import {DEFAULT_RECORD_TYPE} from '../config';

/* Global Variable */
const _DIR = RNFetchBlob.fs.dirs.SDCardApplicationDir;
const checkFolderExist = async (folderPath) => {
  const isFolderExist = await RNFetchBlob.fs
    .exists(folderPath)
    .then((exist) => exist);
  if (!isFolderExist) RNFetchBlob.fs.mkdir(folderPath);
};

/* Record Information Handler */
const dateToFilename = (date) => moment(date).format('YYYY-MM-DD') + '.json';
const dateToFilePath = (date) => _DIR + '/files/' + dateToFilename(date);

export const getRecordsByDate = async (date) => {
  const path = dateToFilePath(date);
  const isFileExist = await RNFetchBlob.fs.exists(path).then((exist) => exist);
  if (!isFileExist) {
    await RNFetchBlob.fs.createFile(path, JSON.stringify([]), 'utf8');
    return [];
  }
  return await RNFetchBlob.fs
    .readFile(path, 'utf8')
    .then((data) => JSON.parse(data));
};

export const createRecordByDate = async (date, record) => {
  const recordsData = await getRecordsByDate(date);
  recordsData.push(record);
  storeRecordByDate(date, recordsData);
};

export const storeRecordByDate = (date, records) => {
  const path = dateToFilePath(date);
  const idData = _.map(records, (record, idx) => ({...record, id: idx + 1}));
  RNFetchBlob.fs.writeFile(path, JSON.stringify(idData), 'utf8');
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

/* Setting Information Handler */
const recordTypesFilePath = _DIR + '/files/setting/types.json';

export const getRecordTypes = async () => {
  await checkFolderExist(_DIR + '/files/setting');

  const isFileExist = await RNFetchBlob.fs
    .exists(recordTypesFilePath)
    .then((exist) => exist);
  if (!isFileExist) {
    const idData = _.map(DEFAULT_RECORD_TYPE, (type, idx) => ({
      ...type,
      id: idx + 1,
    }));
    await RNFetchBlob.fs.createFile(
      recordTypesFilePath,
      JSON.stringify(idData),
      'utf8',
    );
    return idData;
  }

  return await RNFetchBlob.fs
    .readFile(recordTypesFilePath, 'utf8')
    .then((data) => JSON.parse(data));
};

export const createRecordType = async (type) => {
  const typesData = await getRecordTypes();
  typesData.push(type);
  await storeRecordTypes(_.uniqBy(typesData, 'label'));
};

export const storeRecordTypes = async (types) => {
  await checkFolderExist(_DIR + '/files/setting');
  const idData = _.map(types, (type, idx) => ({...type, id: idx + 1}));
  RNFetchBlob.fs.writeFile(recordTypesFilePath, JSON.stringify(idData), 'utf8');
};
