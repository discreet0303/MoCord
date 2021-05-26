import _ from 'lodash';
import { useSelector } from 'react-redux';
import { OPERATOR_TYPE } from '../../config';

export const recordGroupByType = (records) => {
  const types = useSelector((state) => state.types);
  const groupByType = _.groupBy(records, 'type');
  let data = [];

  _.each(_.keys(groupByType), (recordType) => {
    const type = _.find(types, ['label', recordType]);
    const metadata = {
      records: groupByType[recordType],
      amount: calcuRecordMoneyAmountWithType(groupByType[recordType], type, 'money'),
      type,
    };
    data.push(metadata);
  });

  return data;
};

export const calcuRecordMoneyAmount = (records, key = 'money') => {
  return _.sumBy(records, (item) => Number(item[key]));
};

export const calcuRecordMoneyAmountWithType = (records, type, key = 'money') => {
  const amount = _.sumBy(records, (item) => Number(item[key]));
  if (type.operator === OPERATOR_TYPE.COST) return -amount;
  else return amount;
};
