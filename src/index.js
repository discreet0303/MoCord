import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import RecordListScreen from './containers/RecordListScreen';
import RecordEditScreen from './containers/RecordEditScreen';

const Stack = createStackNavigator();

const App = () => {
  React.useEffect(() => {});
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="RecordList" component={RecordListScreen} />
        <Stack.Screen name="RecordEdit" component={RecordEditScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
