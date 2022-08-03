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
import auth from '@react-native-firebase/auth';
import ContactsPermission from './Screens/ContactsPermission';
import ContactsScreen from './Screens/ContactsScreen';
import InboxScreen from './Screens/InboxScreen';
import firestore from '@react-native-firebase/firestore';
const Stack = createNativeStackNavigator();

const App = () => {
  const [user, setUser] = useState(null);
  const [usrListener, setUsrListener] = useState(null);

  useEffect(() => {
    // _fetchUserListener();
    // auth().signOut();
    const authListener = auth().onAuthStateChanged(
      state => {
        // console.log('auth state: ', state);
        if (state) {
          _fetchUserListener(state?.uid);
        } else {
          setUser(null);
        }
      },
      err => {
        console.log('auth listener err App.JS> ', err);
      },
    );

    // firestore()
    //   .collection('users')
    //   .doc('a7KFycd05pdkLrmJH5EJ0rC1k3M2')
    //   .onSnapshot(
    //     dat => console.log(dat),
    //     err => console.log(err),
    //   );

    return () => {
      console.log('remove listeners');
      usrListener && usrListener();
      authListener && authListener();
    };
  }, []);

  const reloadUser = uid => {
    usrListener && usrListener();
    _fetchUserListener(uid);
    console.log('call');
  };

  const _fetchUserListener = uid => {
    // console.log(uid, 'listen');
    // let listener = firestore()
    //   .collection('users')
    //   .doc(uid)
    //   .onSnapshot(
    //     snap => {
    //       console.log('snap');
    //       if (!snap.exists) {
    //         // auth().signOut();
    //         setUser(null);
    //       } else {
    //         console.log('App.js > _fetchUserListener > : user Exists');
    //         setUser(snap.data());
    //       }
    //     },
    //     err => {
    //       console.log('App.js > _fetchUserListener > err: ', err);
    //     },
    //   );

    // firestore()
    //   .collection('users')
    //   .doc('a7KFycd05pdkLrmJH5EJ0rC1k3M2')
    //   .onSnapshot(
    //     dat => console.log('data from snap: ', dat),
    //     err => console.log(err),
    //   );

    firestore()
      .collection('users')
      .doc(uid)
      .get()
      .then(doc => {
        if (!doc.exists) {
          auth().signOut();
          setUser(null);
        } else {
          if (doc.data()?.filled) {
            setUser(doc.data());
          }
        }
      })
      .catch(err => console.log('err getting data'));

    // setUsrListener(sub);
  };

  console.log('user:', user);
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
              {props => <FourthScreen {...props} reloadUser={reloadUser} />}
            </Stack.Screen>
            {/* <Stack.Screen
              name="ContactsPermissionScreen"
              options={{headerShown: false}}>
              {props => <ContactsPermission {...props} />}
            </Stack.Screen>
            <Stack.Screen name="ContactsScreen" options={{headerShown: false}}>
              {props => <ContactsScreen {...props} />}
            </Stack.Screen> */}
          </>
        ) : (
          <>
            <Stack.Screen name="TabNavigation" options={{headerShown: false}}>
              {props => <TabNavigation {...props} />}
            </Stack.Screen>
            <Stack.Screen
              name="ContactsPermissionScreen"
              options={{headerShown: false}}>
              {props => <ContactsPermission {...props} />}
            </Stack.Screen>
            <Stack.Screen name="ContactsScreen" options={{headerShown: false}}>
              {props => <ContactsScreen {...props} />}
            </Stack.Screen>
            <Stack.Screen name="LoadingScreen" options={{headerShown: false}}>
              {props => <LoadingScreen {...props} />}
            </Stack.Screen>
            <Stack.Screen name="InboxScreen" options={{headerShown: false}}>
              {props => <InboxScreen {...props} />}
            </Stack.Screen>
          </>
        )}

        {/* <Stack.Screen name="LoadingScreen" options={{headerShown: false}}>
          {props => <LoadingScreen {...props} />}
        </Stack.Screen> */}

        {/* <Stack.Screen name="HomeScreen" options={{headerShown: false}}>
          {props => <HomeScreen {...props} />}
        </Stack.Screen> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default App;
