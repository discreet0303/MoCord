import * as React from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import recordsReducer from './reducers/RecordsReducer';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import RecordListScreen from './containers/RecordListScreen';
import RecordEditScreen from './containers/RecordEditScreen';
import TestModal from './containers/modal/TestModal';

const store = createStore(recordsReducer, applyMiddleware(thunk));

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="RecordList" component={RecordListScreen} />
          <Stack.Screen name="RecordEdit" component={RecordEditScreen} />
          <Stack.Screen name="TestModal" component={TestModal} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
