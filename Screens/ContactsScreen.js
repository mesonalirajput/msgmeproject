import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import Header from './Header';
import {Avatar} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import {getContactsMatchingString} from 'react-native-contacts';
import LoadingScreen from './LoadingScreen';
import auth, {firebase} from '@react-native-firebase/auth';

const ContactsScreen = () => {
  const route = useRoute();
  const {contacts} = route.params;
  const renderItem = ({item}) => <ContactItem item={item} />;
  //   console.log('contacts:', contacts);
  const [contactList, setContactList] = useState([]);
  const [clList, setClList] = useState(true);
  useEffect(() => {
    getContacts();
  }, []);

  const getContacts = async () => {
    contacts.forEach(c => {
      let phNum = c?.phoneNumbers;
      phNum.forEach(num => {
        // console.log('num:', num?.number);
        firestore()
          .collection('users')
          .where('phoneNumber', '==', num?.number)
          .get()
          .then(res => {
            if (!res.empty) {
              res.docs.forEach(d => {
                // console.log('data', d.data());
                if (d.exists) {
                  let cl = [...contactList];
                  cl.push(d.data());
                  setContactList(cl);
                  // console.log('cl', cl);
                }
              });
            }
          })
          .catch(err =>
            console.log('ContactScreen > getContacts > fetching err:', err),
          );
      });
    });
    setClList(false);
  };
  console.log('contactList:', contactList);
  return (
    <View>
      {clList ? (
        <LoadingScreen />
      ) : (
        <>
          <Header title={'Select Contact'} />
          <FlatList
            data={contactList}
            renderItem={renderItem}
            keyExtractor={(item, idx) => item?.recordID || idx?.toString()}
          />
        </>
      )}
    </View>
  );
};

const ContactItem = ({item}) => {
  // console.log('items:', item);

  const navigation = useNavigation();
  const createChat = () => {
    const uid = auth().currentUser.uid;
    const id = item?.uid;
    let cid = uid + id;
    if (id > uid) {
      cid = id + uid;
    }
    console.log(cid);
    const chatRef = firestore().collection('chats').doc(cid);
    const doc = chatRef.get();
    if (!doc.exists) {
      firestore()
        .collection('chats')
        .doc(cid)
        .set({
          cid: cid,
          cTime: firebase.firestore.FieldValue.serverTimestamp(),
          prts: [id, uid],
        })
        .then(() => {
          navigation.navigate('InboxScreen');
        })
        .catch(err =>
          console.log('ContactsScreen > craeteChat > navigationError:', err),
        );
    } else {
      navigation.navigate('InboxScreen');
    }
  };

  return (
    <TouchableOpacity
      style={styles.contactItem__container}
      onPress={() => createChat()}>
      <View style={styles.contactItem__container__left}>
        <Avatar.Icon
          size={52}
          icon="account"
          backgroundColor="#3366cc"
          color="#fff"
          style={{marginLeft: 10}}
        />
      </View>
      <View style={styles.contactItem__container__right}>
        <Text style={{fontSize: 17, color: '#000', fontWeight: '500'}}>
          {item?.username}
        </Text>
        <Text style={{fontSize: 14, color: '#666', fontWeight: '300'}}>
          Hey there, I am using MessageMe.
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  contactItem__container: {
    flexDirection: 'row',
    marginTop: 20,
    width: '100%',
  },
  contactItem__container__left: {
    width: '22%',
  },
  contactItem__container__right: {
    justifyContent: 'center',
    width: '75%',
    // borderBottomWidth: 0.5,
    // borderBottomColor: '#ccc',
  },
});

export default ContactsScreen;
