import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

const InitialScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.initialscreen__container}>
      <Text style={styles.initialscreen__heading}>Welcome to MessageMe</Text>
      <Image
        style={styles.initialscreen__container__img}
        source={require('../assets/image.png')}
      />
      <Text style={styles.InitialScreen__txt}>
        Share happiness with your close ones
      </Text>
      <TouchableOpacity
        style={styles.initialscreen__btnView}
        onPress={() => navigation.navigate('SecondScreen')}>
        <Text style={styles.initialscreen__btnText}>Let's start</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  initialscreen__container: {
    alignItems: 'center',
    // justifyContent: 'center',
  },
  initialscreen__heading: {
    fontSize: 27,
    marginTop: 100,
    fontWeight: '600',
    color: '#3366cc',
  },
  initialscreen__container__img: {
    marginTop: 70,
    width: '100%',
    height: 210,
  },
  InitialScreen__txt: {
    fontSize: 15,
    marginTop: 70,
    fontWeight: '500',
    color: '#4d4d4d',
  },
  initialscreen__btnView: {
    width: 300,
    height: 40,
    backgroundColor: '#3366cc',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: 15,
  },
  initialscreen__btnText: {
    fontSize: 15,
    color: '#fff',
    fontWeight: '500',
  },
});

export default InitialScreen;
