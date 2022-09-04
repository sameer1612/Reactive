import {NavigationContainer, RouteProp} from '@react-navigation/native';
import {createStackNavigator, StackNavigationOptions} from '@react-navigation/stack';
import React from 'react';
import {Todo, TodosProvider} from './contexts/todos-context';
import {Details} from './screens/details';
import {Home} from './screens/home';

export type RootStackParamList = {
  Home: undefined;
  Details: {todo: Todo};
};

const Stack = createStackNavigator<RootStackParamList>();

const headerOptions = {
  title: 'Todos',
  headerStyle: {
    backgroundColor: 'rgba(255,0,0,0.5)',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontSize: 20,
  },
};

const App = () => {
  return (
    <TodosProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} options={headerOptions} />
          <Stack.Screen name="Details" component={Details} options={{...headerOptions, title: 'Details'}} />
        </Stack.Navigator>
      </NavigationContainer>
    </TodosProvider>
  );
};

export default App;
