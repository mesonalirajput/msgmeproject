import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {Avatar} from 'react-native-paper';
import Header from './Header';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import moment from 'moment';
const HomeScreen = () => {
  const [chats, setChats] = useState(['', '', '', '', '', '', '', '', '', '']);
  const renderItem = ({item}) => <ChatItem />;

  useEffect(() => {
    // firestore()
    //   .collection('users')
    //   .get()
    //   .then(docs => {
    //     console.log(docs.size);
    //   })
    //   .catch(err => console.log('err', err));
    if (auth().currentUser) {
      const lastSignIn = moment(auth().currentUser.lastSignIn);
      if (lastSignIn.isBefore(moment().subtract(1, 'hour'))) {
        auth().signOut();
      }
    }
  }, []);
  return (
    <View style={styles.homescreen__container}>
      <FlatList
        data={chats}
        renderItem={renderItem}
        keyExtractor={(item, idx) => item || idx?.toString()}
      />
    </View>
  );
};
const ChatItem = () => {
  return (
    <View style={styles.chatItem__container}>
      <View style={styles.chatItem__container__left}>
        <Avatar.Icon
          size={60}
          icon="account"
          backgroundColor="#3366cc"
          color="#fff"
          style={{marginLeft: 10}}
        />
      </View>
      <View style={styles.chatItem__container__right}>
        <View style={styles.chatItem__container__top}>
          <Text style={{fontSize: 16, color: '#000', fontWeight: '500'}}>
            Sonali Rajput
          </Text>
          <Text style={{fontSize: 12, color: '#666', fontWeight: '300'}}>
            1:46 PM
          </Text>
        </View>
        <View style={styles.chatItem__container__bottom}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '400',
              color: '#666',
              marginBottom: 10,
            }}>
            Hello there! How u doing?
          </Text>
          <View style={styles.chatItem__container__bottom__unreadMsgNum}>
            <Text style={{color: '#fff', fontSize: 12, fontWeight: '500'}}>
              3
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  chatItem__container: {
    flexDirection: 'row',
    marginTop: 20,
    width: '100%',
  },
  chatItem__container__left: {
    width: '22%',
  },
  chatItem__container__right: {
    justifyContent: 'center',
    width: '75%',
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  chatItem__container__top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  chatItem__container__bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  chatItem__container__bottom__unreadMsgNum: {
    width: 21,
    height: 21,
    backgroundColor: '#008ae6',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
