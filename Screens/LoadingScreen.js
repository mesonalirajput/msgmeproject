import {useRoute} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, PermissionsAndroid} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import Contacts from 'react-native-contacts';
const LoadingScreen = () => {
  // const route = useRoute();
  // const {title} = route.params;
  const [contacts, setContacts] = useState();
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
            let cntcts = contacts;
            setContacts(cntcts);
            navigation.navigate('ContactsScreen', {contacts: cntcts});
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
    <View style={styles.container}>
      <View style={styles.loading__container}>
        <View style={styles.loading__heading__container}>
          <Text style={{fontSize: 20, fontWeight: '600', color: '#3366cc'}}>
            Wait for a moment...
          </Text>
          {/* <Text style={{fontSize: 16, color: '#4d4d4d', marginTop: 5}}>
            Please wait a moment
          </Text> */}
        </View>
        <Image
          style={styles.loadingscreen__container__img}
          source={require('../assets/image.png')}
        />

        <ActivityIndicator
          size="small"
          color="#3366cc"
          style={{marginBottom: 30}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#3366cc',
  },
  loading__container: {
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#fff',
    marginTop: 100,
    height: 500,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  loading__heading__container: {
    alignItems: 'center',
    marginTop: 40,
  },
  loadingscreen__container__img: {
    width: '100%',
    height: 210,
    marginTop: 60,
    marginBottom: 60,
  },
});
export default LoadingScreen;
