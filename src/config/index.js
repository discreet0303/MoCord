export const OPERATOR_TYPE = {
  position: 'pos',
  negative: 'neg',
};

export const DEFAULT_RECORD_TYPE = [
  {label: '食物', operator: OPERATOR_TYPE.position},
  {label: '飲品', operator: OPERATOR_TYPE.position},
  {label: '交通', operator: OPERATOR_TYPE.position},
  {label: '消費', operator: OPERATOR_TYPE.position},
  {label: '居家', operator: OPERATOR_TYPE.position},
  {label: '收入', operator: OPERATOR_TYPE.negative},
  {label: '其他', operator: OPERATOR_TYPE.position},
];

export const DEFAULT_WALLET = [
  {label: '錢包'},
  {label: '信用卡'},
  {label: '悠遊卡'},
];
