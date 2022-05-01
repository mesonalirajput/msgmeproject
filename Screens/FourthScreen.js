import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Avatar} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useRoute} from '@react-navigation/native';
const FourthScreen = () => {
  const route = useRoute();
  const {phoneNumber} = route.params;
  const [userName, setUserName] = useState('');
  const uid = auth()?.currentUser?.uid;

  // useEffect(() => {
  //   createUserCollection();
  // }, []);
  const createUserCollection = () => {
    console.log('uid:', uid);
    const userData = firestore()
      .collection('users')
      .doc('Ksip4a5M7KXs3j08OcmHAGLr0vu1')
      .get()
      .then(() => console.log('Worked!!'))
      .catch(err => console.log('fetch error:', err));
    if (!userData.exists) {
      console.log('No such document!');
    } else {
      console.log('Document data:', userData.data());
    }
  };
  return (
    <View style={styles.fourthScreen__container}>
      <Text style={styles.fourthScreen__heading}>Profile info</Text>
      <Text
        style={{
          fontSize: 15,
          marginTop: 15,
          marginBottom: 15,
          color: '#4d4d4d',
        }}>
        Please provide your name and an optional profile photo
      </Text>
      <Avatar.Icon
        size={95}
        icon="account"
        backgroundColor="#3366cc"
        color="#fff"
      />
      <View style={styles.userNameInput}>
        <TextInput
          style={styles.fourthScreen__userNameInput}
          onChangeText={setUserName}
          value={userName}
          placeholder="Enter your username"
          keyboardType="default"
          maxLength={30}
          placeholderTextColor="#ccc"
        />
        <MaterialCommunityIcons
          name="sticker-emoji"
          size={28}
          color="#3366cc"
        />
      </View>
      <TouchableOpacity
        style={styles.fourthScreen__nxtBtn}
        onPress={() => createUserCollection()}>
        <Text style={{fontSize: 18, fontWeight: '400', color: '#fff'}}>
          Next
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  fourthScreen__container: {
    alignItems: 'center',
  },
  fourthScreen__heading: {
    fontSize: 22,
    color: '#3366cc',
    fontWeight: '600',
    marginTop: 50,
  },
  userNameInput: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fourthScreen__userNameInput: {
    height: 40,
    margin: 12,
    borderBottomWidth: 2,
    padding: 10,
    borderBottomColor: '#3366cc',
    width: '80%',
    color: '#4d4d4d',
    fontWeight: '600',
    fontSize: 17,
  },
  fourthScreen__nxtBtn: {
    width: 80,
    height: 45,
    backgroundColor: '#3366cc',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
});

export default FourthScreen;
