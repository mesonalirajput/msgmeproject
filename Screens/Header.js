import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './HomeScreen';
import SecondScreen from './SecondScreen';
const Tab = createBottomTabNavigator();
const Header = ({color1, fontWeight, color2, color3}) => {
  return (
    <View style={styles.header__container}>
      {/* <View style={styles.header__container__top}> */}
      <Text
        style={{
          fontSize: 23,
          fontWeight: '500',
          color: '#fff',
          marginLeft: 15,
        }}>
        MessageMe
      </Text>
      <View style={styles.header__container__top__icons}>
        <Fontisto name="search" size={20} color="#fff" />
        <MaterialCommunityIcons name="dots-vertical" size={25} color="#fff" />
      </View>
      {/* </View> */}
      {/* <View style={styles.header__container__bottom}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: '10%',
          }}>
          <Entypo
            name="camera"
            size={20}
            color="#e6e6e6"
            // style={{marginLeft: 10, marginRight: 12}}
          />
        </View>
        <View style={styles.header__container__bottom__right}>
          <TouchableOpacity
            style={{
              width: '33.3%',
              borderBottomWidth: 4,
              justifyContent: 'center',
              borderBottomColor: color1,
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: fontWeight,
                color: color1,
                marginLeft: 15,
              }}>
              CHATS
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: '33.3%',
              borderBottomWidth: 4,
              justifyContent: 'center',
              borderBottomColor: color2,
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '400',
                color: '#f2f2f2',
                marginLeft: 15,
              }}>
              STATUS
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: '33.3%',
              borderBottomWidth: 4,
              justifyContent: 'center',
              borderBottomColor: color3,
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '400',
                color: '#f2f2f2',
                marginLeft: 15,
              }}>
              CALLS
            </Text>
          </TouchableOpacity>
        </View>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  header__container: {
    height: 60,
    backgroundColor: '#3366cc',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  // header__container__top: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'space-between',
  // height: '50%',
  // },
  header__container__top__icons: {
    flexDirection: 'row',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 60,
  },
  header__container__bottom: {
    height: '50%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  header__container__bottom__right: {
    flexDirection: 'row',
    // marginLeft: 15,
    height: '100%',
    width: '90%',
  },
  header__container__bottom__right__btn: {
    width: '32%',
    // height: 40,
    borderBottomWidth: 1,
    justifyContent: 'center',
  },
});

export default Header;
