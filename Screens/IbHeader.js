import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Avatar} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const IbHeader = () => {
  return (
    <View style={styles.ibHeader__container}>
      <View style={styles.ibHeader__container__left}>
        <Avatar.Icon
          size={45}
          icon="account"
          backgroundColor="#fff"
          color="#3366cc"
          style={{marginLeft: 10, marginRight: 10}}
        />
        <Text style={styles.ibHeader__name}>Sonali Rajput</Text>
      </View>
      <View style={styles.ibHeader__container__right}>
        <Ionicons name="call" size={24} color="#85a3e0" />
        <Ionicons name="videocam" size={24} color="#85a3e0" />
        <MaterialCommunityIcons name="dots-vertical" size={24} color="#fff" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ibHeader__container: {
    height: 60,
    backgroundColor: '#3366cc',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ibHeader__container__left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ibHeader__name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  ibHeader__container__right: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '30%',
    marginRight: 10,
  },
});

export default IbHeader;
