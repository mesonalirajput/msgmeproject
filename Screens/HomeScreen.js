import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {Avatar} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import moment from 'moment';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
const HomeScreen = () => {
  const [chats, setChats] = useState(['', '', '', '', '', '', '', '', '', '']);
  const renderItem = ({item}) => <ChatItem />;
  const navigation = useNavigation();
  useEffect(() => {
    if (auth().currentUser) {
      const lastSignIn = moment(auth().currentUser.lastSignIn);
      if (lastSignIn.isBefore(moment().subtract(1, 'hour'))) {
        auth().signOut();
      }
    }
  }, []);
  return (
    <View style={styles.homescreen__container}>
      {/* <View style={styles.space}></View> */}
      <FlatList
        data={chats}
        renderItem={renderItem}
        keyExtractor={(item, idx) => item || idx?.toString()}
      />
      <TouchableOpacity
        style={styles.contacts}
        onPress={() => navigation.navigate('LoadingScreen')}>
        <MaterialCommunityIcons
          name="message-reply-text"
          size={26}
          color="#fff"
        />
      </TouchableOpacity>
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
  homescreen__container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contacts: {
    width: 50,
    height: 50,
    backgroundColor: '#3366cc',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
    shadowColor: '#000',
    elevation: 3,
  },
  chatItem__container: {
    position: 'relative',
    flexDirection: 'row',
    // marginTop: 20,
    width: '100%',
    backgroundColor: '#fff',
    paddingTop: 20,
    // borderTopLeftRadius: 30,
    // borderTopRightRadius: 30,
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
