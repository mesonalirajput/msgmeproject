import {useNavigation} from '@react-navigation/native';
import React, {useState, useRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
const SecondScreen = () => {
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState('');
  const phoneInput = useRef(null);
  const createTwoButtonAlert = () => {
    // console.log('Next btn pressed!!');
    Alert.alert(
      `You entered the phone number: ${phoneNumber}`,
      'Is this OK, or would you like to edit the number?',
      [
        {
          text: 'Edit',
          onPress: () => console.log('Edit Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () =>
            navigation.navigate('ThirdScreen', {phoneNumber: phoneNumber}),
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.secondScreen__container}>
        <Text
          style={{
            fontSize: 22,
            color: '#3366cc',
            fontWeight: '600',
            marginTop: 40,
          }}>
          Enter your phone number
        </Text>
        <Text style={{fontSize: 15, marginTop: 10, color: '#4d4d4d'}}>
          MessageMe will need to verify your phone number.
        </Text>
        <PhoneInput
          ref={phoneInput}
          defaultValue={phoneNumber}
          defaultCode="IN"
          layout="first"
          withShadow
          autoFocus
          containerStyle={styles.phoneNumberView}
          textContainerStyle={{paddingVertical: 0}}
          onChangeFormattedText={text => {
            setPhoneNumber(text);
          }}
        />
        <TouchableOpacity
          style={styles.secondScreen__nxtBtn}
          onPress={createTwoButtonAlert}>
          <Text style={{fontSize: 16, fontWeight: '600', color: '#fff'}}>
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
  secondScreen__container: {
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#fff',
    marginTop: 100,
    height: 300,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  phoneNumberView: {
    marginTop: 30,
    borderBottomWidth: 2,
    borderBottomColor: '#3366cc',
  },
  secondScreen__nxtBtn: {
    width: 90,
    height: 45,
    backgroundColor: '#3366cc',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    borderRadius: 3,
  },
});

export default SecondScreen;
