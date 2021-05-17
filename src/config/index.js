export const OPERATOR_TYPE = {
  INCOME: 'income',
  COST: 'cost',
};

export const DEFAULT_RECORD_TYPE = [
  { label: '食物', color: '#FF8F8F', operator: OPERATOR_TYPE.COST, icon: 'restaurant' },
  { label: '飲品', color: '#8EC2B9', operator: OPERATOR_TYPE.COST, icon: 'ios-pint' },
  { label: '交通', color: '#82D1FF', operator: OPERATOR_TYPE.COST, icon: 'bus' },
  { label: '消費', color: '#FFB14A', operator: OPERATOR_TYPE.COST, icon: 'cart-sharp' },
  { label: '居家', color: '#C6D64F', operator: OPERATOR_TYPE.COST, icon: 'home' },
  { label: '收入', color: '#FFD75E', operator: OPERATOR_TYPE.INCOME, icon: 'md-briefcase-sharp' },
  { label: '其他', color: '#CCCCCC', operator: OPERATOR_TYPE.COST, icon: 'ios-document-attach' },
];

export const DEFAULT_WALLET = [{ label: '錢包' }, { label: '信用卡' }, { label: '悠遊卡' }];

export const ALL_ICON = [
  'airplane',
  'alarm-outline',
  'alert-circle-outline',
  'basket-outline',
  'bed-outline',
  'bus-outline',
  'business-outline',
  'call-outline',
];
