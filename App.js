import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import InitialScreen from './Screens/InitialScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SecondScreen from './Screens/SecondScreen';
import ThirdScreen from './Screens/ThirdScreen';
import FourthScreen from './Screens/FourthScreen';
import LoadingScreen from './Screens/LoadingScreen';
import HomeScreen from './Screens/HomeScreen';
import TabNavigation from './Screens/TabNavigation';
import auth, {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
const Stack = createNativeStackNavigator();

const App = () => {
  const [user, setUser] = useState();
  useEffect(() => {
    // auth().signOut();
    firestore()
      .collection('users')
      .doc('test')
      .set({this: 'that'})
      .catch(err => console.log('firestore test!'));
    let usr = auth().currentUser;
    setUser(usr);
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="InitialScreen">
        {!user ? (
          <>
            <Stack.Screen name="InitialScreen" options={{headerShown: false}}>
              {props => <InitialScreen {...props} />}
            </Stack.Screen>
            <Stack.Screen name="SecondScreen" options={{headerShown: false}}>
              {props => <SecondScreen {...props} />}
            </Stack.Screen>
            <Stack.Screen name="ThirdScreen" options={{headerShown: false}}>
              {props => <ThirdScreen {...props} />}
            </Stack.Screen>
            <Stack.Screen name="FourthScreen" options={{headerShown: false}}>
              {props => <FourthScreen {...props} />}
            </Stack.Screen>
          </>
        ) : null}

        {/* <Stack.Screen name="LoadingScreen" options={{headerShown: false}}>
          {props => <LoadingScreen {...props} />}
        </Stack.Screen> */}
        <Stack.Screen name="TabNavigation" options={{headerShown: false}}>
          {props => <TabNavigation {...props} />}
        </Stack.Screen>
        <Stack.Screen name="HomeScreen" options={{headerShown: false}}>
          {props => <HomeScreen {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default App;
