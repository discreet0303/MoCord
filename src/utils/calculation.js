import _ from 'lodash';

const operation = {
  add: '+',
  sub: '-',
  div: '/',
  mlt: '*',
  mod: '%',
  exp: '^',
};

operation.operateOrder = [
  [[operation.mlt], [operation.div], [operation.mod], [operation.exp]],
  [[operation.add], [operation.sub]],
];

export default mathCalculate = (mathStack) => {
  let _mathStack = _.cloneDeep(mathStack);
  let mathString = _.join(_mathStack, '');
  // clean up unnecessary characters
  mathString = mathString.replace(/[^0-9%^*\/()\-+.]/g, '');

  let output;
  for (let i = 0, n = operation.operateOrder.length; i < n; i++) {
    // Regular Expression to look for operators between floating numbers or integers
    let re = new RegExp(
      '(\\d+\\.?\\d*)([\\' +
        operation.operateOrder[i].join('\\') +
        '])(\\d+\\.?\\d*)',
    );
    re.lastIndex = 0;
    while (re.test(mathString)) {
      output = _calculate(RegExp.$1, RegExp.$2, RegExp.$3);
      if (isNaN(output) || !isFinite(output)) return output; // exit early if not a number
      mathString = mathString.replace(re, output);
    }
  }

  if (output === undefined) {
    if (_.includes(['+', '-'], _.last(_mathStack))) _mathStack.pop();
    return _.toInteger(_.join(_mathStack, ''));
  }
  return output;
};

const _calculate = (a, op, b) => {
  a = a * 1;
  b = b * 1;
  switch (op) {
    case operation.add:
      return a + b;
    case operation.sub:
      return a - b;
    case operation.div:
      return a / b;
    case operation.mlt:
      return a * b;
    case operation.mod:
      return a % b;
    case operation.exp:
      return Math.pow(a, b);
    default:
      null;
  }
};
