import { Platform } from 'react-native';
import { PERMISSIONS, checkMultiple, requestMultiple } from 'react-native-permissions';

import _ from 'lodash';

const PERMISSION_ROLE = {
  readExternalStorage: {
    ios: null,
    android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
  },
  writeExternalStorage: {
    ios: null,
    android: PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
  },
};

const PLATFORM_OS = Platform.OS;

export const checkPermission = async () => {
  const roles = _.map(PERMISSION_ROLE, (role) => role[PLATFORM_OS]);
  const result = await checkMultiple(roles);

  return result;
};

export const requestPermission = async () => {
  const roles = _.map(PERMISSION_ROLE, (role) => role[PLATFORM_OS]);
  const result = await requestMultiple(roles);

  return result;
};

const checkResult = (result) => _.every(_.map(result), (res) => res === 'granted');

export const handlePermission = async () => {
  const res = await checkPermission();

  const isSuc = checkResult(res);
  if (isSuc) {
    return true;
  } else {
    const requestResult = await requestPermission();
    return checkResult(requestResult);
  }
};
