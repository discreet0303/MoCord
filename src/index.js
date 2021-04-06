import * as React from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import RootReducer from './reducers';

import RecordListScreen from './containers/RecordListScreen';
import RecordEditScreen from './containers/RecordEditScreen';
import RecordStatisticScreen from './containers/RecordStatisticScreen';
import SettingScreen from './containers/SettingScreen';

const store = createStore(RootReducer, applyMiddleware(thunk));

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabStack = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="RecordList" component={RecordListScreen} />
      <Tab.Screen name="RecordStatistic" component={RecordStatisticScreen} />
      <Tab.Screen name="Setting" component={SettingScreen} />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="TabStack" component={TabStack} />
          <Stack.Screen name="RecordEdit" component={RecordEditScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
