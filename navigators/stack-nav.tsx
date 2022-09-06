import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Details} from '../screens/details';
import {Home} from '../screens/home';
import {Todo, TodosProvider} from '../contexts/todos-context';
import {RTHome} from '../screens/RT-home';
import {RTDetails} from '../screens/RT-details';
import {Provider} from 'react-redux';
import {store} from '../redux/store';

export type RootStackParamList = {
  Home: undefined;
  Details: {todo: Todo};
};

export type RTRootStackParamList = {
  RTHome: undefined;
  RTDetails: {todo: Todo};
};

const Stack = createStackNavigator<RootStackParamList>();
const RTStack = createStackNavigator<RTRootStackParamList>();

export function ContextNav() {
  return (
    <TodosProvider>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Details" component={Details} />
      </Stack.Navigator>
    </TodosProvider>
  );
}

export function ReduxToolkitNav() {
  return (
    <Provider store={store}>
      <RTStack.Navigator initialRouteName="RTHome">
        <RTStack.Screen name="RTHome" component={RTHome} />
        <RTStack.Screen name="RTDetails" component={RTDetails} />
      </RTStack.Navigator>
    </Provider>
  );
}
