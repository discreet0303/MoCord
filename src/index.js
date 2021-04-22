import * as React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import RootReducer from './reducers';

import RecordListScreen from './containers/RecordListScreen';
import RecordEditScreen from './containers/RecordEditScreen';
import RecordStatisticScreen from './containers/RecordStatisticScreen';
import SettingListScreen from './containers/setting/SettingListScreen';
import TypeSettingScreen from './containers/setting/TypeSettingScreen';
import WalletSettingScreen from './containers/setting/WalletSettingScreen';

const store = createStore(RootReducer, applyMiddleware(thunk));

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabStack = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="RecordList" component={RecordListScreen} />
      <Tab.Screen name="RecordStatistic" component={RecordStatisticScreen} />
      <Tab.Screen name="SettingList" component={SettingListScreen} />
    </Tab.Navigator>
  );
};

const SettingStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="TypeSetting" component={TypeSettingScreen} />
      <Stack.Screen name="WalletSetting" component={WalletSettingScreen} />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="TabStack" component={TabStack} />
          <Stack.Screen name="RecordEdit" component={RecordEditScreen} />
          <Stack.Screen name="SettingStack" component={SettingStack} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
