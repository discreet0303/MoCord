import _ from 'lodash';

import { OPERATOR_TYPE } from '../config';

export const calcuTotalMoney = (records, types) => {
  let amount = _.map(records, (record) => {
    const [op] = _.filter(types, ['label', record.type]);
    const num = _.toInteger(record.money);
    if (!op) return num;
    else if (op.operator === OPERATOR_TYPE.position) return num;
    else if (op.operator === OPERATOR_TYPE.negative) return -num;
    return num;
  });

  return _.sum(amount);
};
