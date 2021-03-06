import * as React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import RootReducer from './reducers';

import LogoScreen from './containers/LogoScreen';
import RecordListScreen from './containers/record/RecordListScreen';
import RecordEditScreen from './containers/record/RecordEditScreen';
import RecordStatisticScreen from './containers/record/RecordStatisticScreen';
import SettingListScreen from './containers/setting/SettingListScreen';
import TypeSettingScreen from './containers/setting/TypeSettingScreen';
import WalletSettingScreen from './containers/setting/WalletSettingScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CreateTypeScreen from './containers/setting/CreateTypeScreen';
import CreateWalletScreen from './containers/setting/CreateWalletScreen';

const store = createStore(RootReducer, applyMiddleware(thunk));

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabStack = () => {
  const icon = {
    RecordList: 'md-wallet',
    RecordStatistic: 'md-bar-chart',
    SettingList: 'settings-sharp',
  };
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          return <Ionicons name={icon[route.name]} size={size} color={color} />;
        },
      })}
    >
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
      <Stack.Screen name="CreateType" component={CreateTypeScreen} />
      <Stack.Screen name="CreateWallet" component={CreateWalletScreen} />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="Logo" component={LogoScreen} />
          <Stack.Screen name="TabStack" component={TabStack} />
          <Stack.Screen name="RecordEdit" component={RecordEditScreen} />
          <Stack.Screen name="SettingStack" component={SettingStack} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
