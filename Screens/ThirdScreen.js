import React, {useState, useRef, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
const CELL_COUNT = 6;

const ThirdScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {phoneNumber} = route.params;
  const [confirm, setConfirm] = useState(null);
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  useEffect(() => {
    // console.log(phoneNumber);
    signInWithPhoneNumber();
  }, []);

  async function signInWithPhoneNumber() {
    try {
      const confirmation = await auth().signInWithPhoneNumber(
        phoneNumber,
        true,
      );
      setConfirm(confirmation);
    } catch (e) {
      console.log('ThirdScreen > signin error:', e);
    }
  }

  async function confirmCode() {
    try {
      // console.log(confirm);
      const response = await confirm.confirm(value);
      if (response) {
        let uid = auth().currentUser?.uid;
        firestore()
          .collection('users')
          .doc(uid)
          .set({phoneNumber, uid})
          .then(() => {
            navigation.navigate('FourthScreen', {phoneNumber: phoneNumber});
          })
          .catch(err => {
            console.log('ThirdScreen.JS > confirmCode onerr: ', err);
          });
      }
    } catch (e) {
      console.log('ThirdScreen > confirm error:', e);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.thirdScreen__container}>
        <Text style={styles.thirdScreen__heading}>Verifying your number</Text>
        <Text style={{fontSize: 15, color: '#808080', fontWeight: '600'}}>
          Waiting to automatically detect an SMS sent to
        </Text>
        <Text style={{fontSize: 15, color: '#808080', fontWeight: '600'}}>
          {phoneNumber}.
        </Text>
        <CodeField
          ref={ref}
          {...props}
          // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({index, symbol, isFocused}) => (
            <Text
              key={index}
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />
        <Text
          style={{
            fontSize: 14,
            color: '#4d4d4d',
            marginTop: 10,
            fontWeight: '500',
            marginBottom: 20,
          }}>
          Enter 6-digit code
        </Text>
        <TouchableOpacity
          style={styles.verifyBtn}
          onPress={() => confirmCode()}>
          <Text style={{fontSize: 17, color: '#fff', fontWeight: '600'}}>
            Verify OTP
          </Text>
        </TouchableOpacity>
        <View
          style={{flexDirection: 'row', marginTop: 10, alignItems: 'center'}}>
          <Text
            style={{
              fontSize: 14,
              color: '#4d4d4d',
              fontWeight: '500',
            }}>
            Didn't get otp?{' '}
          </Text>
          <TouchableOpacity onPress={() => signInWithPhoneNumber()}>
            <Text
              style={{
                fontSize: 14,
                color: '#3366cc',
                fontWeight: '600',
              }}>
              Resend SMS.
            </Text>
          </TouchableOpacity>
        </View>
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
  thirdScreen__container: {
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#fff',
    marginTop: 100,
    height: 360,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  thirdScreen__heading: {
    fontSize: 22,
    color: '#3366cc',
    fontWeight: '600',
    marginTop: 50,
    marginBottom: 15,
  },
  codeFieldRoot: {marginTop: 20},
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderBottomWidth: 2,
    borderBottomColor: '#adc2eb',
    textAlign: 'center',
    marginRight: 10,
    color: '#000',
  },
  focusCell: {
    borderBottomColor: '#3366cc',
  },
  verifyBtn: {
    width: 120,
    height: 40,
    backgroundColor: '#3366cc',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
});

export default ThirdScreen;

//pending
