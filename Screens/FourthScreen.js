import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Avatar} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation, useRoute} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';
const FourthScreen = ({reloadUser, ...props}) => {
  const navigation = useNavigation();
  const route = useRoute();
  const {phoneNumber} = route.params;
  const [userName, setUserName] = useState('');
  const uid = auth()?.currentUser?.uid;
  const [photo, setPhoto] = useState();
  // useEffect(() => {
  //   createUserCollection();
  // }, []);
  const createUserCollection = () => {
    if (userName.trim() == '') {
      Alert.alert('Username required!', 'Please enter your username', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
        },
      ]);
    } else {
      console.log('uid:', uid);
      firestore()
        .collection('users')
        .doc(uid)
        .set({
          uid: uid,
          phoneNumber: phoneNumber,
          profileUri: photo?.assets[0]?.uri,
          username: userName,
          filled: true,
        })
        .then(() => {
          reloadUser(uid);
          // navigation.navigate('ContactsPermissionScreen')s
        })
        .catch(err => console.log('createuser error error:', err));
    }
  };

  const handleChoosePhoto = () => {
    const options = {};
    launchImageLibrary(options, response => {
      console.log('response:', response.assets[0].uri);
      if (response) {
        setPhoto(response);
      }
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.fourthScreen__container}>
        <Text style={styles.fourthScreen__heading}>Profile info</Text>
        <Text
          style={{
            fontSize: 15,
            marginTop: 10,
            marginBottom: 15,
            color: '#4d4d4d',
          }}>
          Please provide your name and an optional profile photo
        </Text>
        <TouchableOpacity onPress={() => handleChoosePhoto()}>
          {!photo ? (
            <Avatar.Icon
              size={95}
              icon="account"
              backgroundColor="#3366cc"
              color="#fff"
            />
          ) : (
            <Avatar.Image size={95} source={{uri: photo?.assets[0]?.uri}} />
          )}
        </TouchableOpacity>

        <View style={styles.userNameInput}>
          <View style={styles.FourthScreen__input}>
            <TextInput
              style={styles.fourthScreen__userNameInput}
              onChangeText={setUserName}
              value={userName}
              placeholder="Type your name here"
              keyboardType="default"
              maxLength={30}
              placeholderTextColor="#ccc"
            />
            <Text style={{fontSize: 13, color: '#ccc', fontWeight: '600'}}>
              {30 - userName.length}
            </Text>
          </View>

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
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3366cc',
    justifyContent: 'flex-end',
  },
  fourthScreen__container: {
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#fff',
    marginTop: 100,
    height: 370,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  fourthScreen__heading: {
    fontSize: 22,
    color: '#3366cc',
    fontWeight: '600',
    marginTop: 35,
  },
  userNameInput: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  FourthScreen__input: {
    width: '80%',
    borderBottomColor: '#3366cc',
    borderBottomWidth: 2,
    margin: 12,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fourthScreen__userNameInput: {
    padding: 10,
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
