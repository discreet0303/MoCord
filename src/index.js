import * as React from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import recordsReducer from './reducers/RecordsReducer';

import RecordListScreen from './containers/RecordListScreen';
import RecordEditScreen from './containers/RecordEditScreen';
import RecordStatisticScreen from './containers/RecordStatisticScreen';
import SettingScreen from './containers/SettingScreen';

const store = createStore(recordsReducer, applyMiddleware(thunk));

const Stack = createStackNavigator();
const RecordStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="RecordList" component={RecordListScreen} />
      <Stack.Screen name="RecordEdit" component={RecordEditScreen} />
      <Stack.Screen name="RecordStatistic" component={RecordStatisticScreen} />
    </Stack.Navigator>
  );
};
const SettingStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Setting" component={SettingScreen} />
    </Stack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="RecordStack" component={RecordStack} />
          <Tab.Screen name="SettingStack" component={SettingStack} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
