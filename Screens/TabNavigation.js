import * as React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import HomeScreen from './HomeScreen';
import StatusScreen from './StatusScreen';
import Header from './Header';
import CallScreen from './CallScreen';
const Tab = createMaterialTopTabNavigator();

const TabNavigation = () => {
  return (
    <>
      <Header title={'MessageMe'} />
      <Tab.Navigator
        initialRouteName="Chats"
        screenOptions={{
          tabBarStyle: {backgroundColor: '#3366cc'},
        }}>
        <Tab.Screen
          name="Chats"
          component={HomeScreen}
          options={{
            tabBarActiveTintColor: '#fff',
            tabBarLabelStyle: {
              //   color: '#e6e6e6',
              fontSize: 15,
              fontWeight: '600',
            },
            tabBarIndicatorStyle: {
              borderBottomWidth: 3,
              borderBottomColor: '#fff',
            },
          }}
        />
        <Tab.Screen
          name="Status"
          component={StatusScreen}
          options={{
            tabBarActiveTintColor: '#fff',
            tabBarLabelStyle: {
              //   color: '#e6e6e6',
              fontSize: 15,
              fontWeight: '600',
            },
            tabBarIndicatorStyle: {
              borderBottomWidth: 3,
              borderBottomColor: '#fff',
            },
          }}
        />
        <Tab.Screen
          name="Calls"
          component={CallScreen}
          options={{
            tabBarActiveTintColor: '#fff',
            tabBarLabelStyle: {
              //   color: '#e6e6e6',
              fontSize: 15,
              fontWeight: '600',
            },
            tabBarIndicatorStyle: {
              borderBottomWidth: 3,
              borderBottomColor: '#fff',
            },
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default TabNavigation;
