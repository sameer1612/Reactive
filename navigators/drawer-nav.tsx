import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {ContextNav, ReduxToolkitNav} from './stack-nav';

const Drawer = createDrawerNavigator();

const headerOptions = {
  headerStyle: {
    backgroundColor: 'rgba(255,0,0,0.5)',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontSize: 20,
  },
};

export default function DrawerNav() {
  return (
    <Drawer.Navigator initialRouteName="ReduxToolkit" screenOptions={{headerShown: false}}>
      <Drawer.Screen
        name="ReduxToolkit"
        component={ReduxToolkitNav}
        options={{...headerOptions, title: 'Redux Toolkit'}}
      />
      <Drawer.Screen name="Context" component={ContextNav} options={{...headerOptions, title: 'Context'}} />
    </Drawer.Navigator>
  );
}
