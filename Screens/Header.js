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
const Header = ({title}) => {
  return (
    <View style={styles.header__container}>
      <Text
        style={{
          fontSize: 23,
          fontWeight: '500',
          color: '#fff',
          marginLeft: 15,
        }}>
        {title}
      </Text>
      <View style={styles.header__container__top__icons}>
        <Fontisto name="search" size={20} color="#fff" />
        <MaterialCommunityIcons name="dots-vertical" size={25} color="#fff" />
      </View>
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
