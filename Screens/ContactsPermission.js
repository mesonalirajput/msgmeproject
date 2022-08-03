import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, PermissionsAndroid} from 'react-native';
import Contacts from 'react-native-contacts';
const ContactsPermission = () => {
  // const [contacts, setContacts] = useState();
  const navigation = useNavigation();
  useEffect(() => {
    try {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: 'Contacts',
        message: 'This app would like to view your contacts.',
        buttonPositive: 'Please accept bare mortal',
      }).then(res => {
        Contacts.getAll()
          .then(contacts => {
            // work with contacts
            // console.log(contacts[0].phoneNumbers);
            // let cntcts = contacts;
            // setContacts(cntcts);
            navigation.navigate('ContactsScreen', {contacts});
          })
          .catch(e => {
            console.log(e);
          });
      });
    } catch (err) {
      console.log('err:', err);
    }
  }, []);

  return (
    <View style={styles.contactsPermission__container}>
      <Text style={styles.contactsPermission__heading}>
        Contacts Permission
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  contactsPermission__container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactsPermission__heading: {
    fontSize: 22,
    color: '#3366cc',
    fontWeight: '600',
    marginTop: 50,
  },
});

export default ContactsPermission;
