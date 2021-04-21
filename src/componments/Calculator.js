import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import _ from 'lodash';

import mathCalculate from '../utils/calculation';

const calcuOperators = [
  [{ text: '7' }, { text: '8' }, { text: '9' }, { text: 'AC' }],
  [{ text: '4' }, { text: '5' }, { text: '6' }, { text: '+' }],
  [{ text: '1' }, { text: '2' }, { text: '3' }, { text: '-' }],
  [{ text: 'x' }, { text: '0' }, { text: '.' }, { text: 'v' }],
];
const calcuOperatorsFlatten = [
  { text: '7' },
  { text: '8' },
  { text: '9' },
  { text: 'AC' },
  { text: '4' },
  { text: '5' },
  { text: '6' },
  { text: '+' },
  { text: '1' },
  { text: '2' },
  { text: '3' },
  { text: '-' },
  { text: 'x' },
  { text: '0' },
  { text: '.' },
  { text: 'v' },
];

const styles = StyleSheet.create({
  root: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    backgroundColor: '#282c34',
  },
  operator: {
    width: '25%',
  },
  operatorText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f7f7f7',
    textAlign: 'center',
    padding: 12,
  },
});

const Calculator = ({ mathStack, setRecord, handleMoneyCalculate }) => {
  const [stack, setStack] = useState(mathStack);
  const handleOperator = (op) => {
    if (op === 'v') {
      handleMoneyCalculate();
      return;
    }
    if (op === 'x') return;

    const lastOp = _.last(stack);
    let _stack = stack;
    if (stack[0] === '0') {
      _stack.shift();
      setStack(_stack);
    }
    if (op === 'AC') {
      _stack.pop();
      setStack(_stack);
    } else if (_.includes(['+', '-', '.'], lastOp) && _.includes(['+', '-', '.'], op)) {
      _stack.pop();
      _stack.push(op);
      setStack(_stack);
    } else {
      _stack.push(op);
      setStack(_stack);
    }
    const money = mathCalculate(_stack);
    setRecord((record) => ({ ...record, money, equation: _stack.join('') }));
  };
  return (
    <View style={styles.root}>
      {_.map(calcuOperatorsFlatten, (op) => (
        <TouchableOpacity
          key={op.text}
          style={styles.operator}
          onPress={() => handleOperator(op.text)}
        >
          <Text style={styles.operatorText}>{op.text}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Calculator;
