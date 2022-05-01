import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

const LoadingScreen = () => {
  return (
    <View style={styles.loading__container}>
      <View style={styles.loading__heading__container}>
        <Text style={{fontSize: 20, fontWeight: '600', color: '#3366cc'}}>
          Initializing...
        </Text>
        <Text style={{fontSize: 16, color: '#4d4d4d', marginTop: 5}}>
          Please wait a moment
        </Text>
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
  );
};

const styles = StyleSheet.create({
  loading__container: {
    alignItems: 'center',
    // justifyContent: 'space-evenly',
  },
  loading__heading__container: {
    alignItems: 'center',
    marginTop: 80,
  },
  loadingscreen__container__img: {
    width: '100%',
    height: 210,
    marginTop: 130,
    marginBottom: 130,
  },
});
export default LoadingScreen;
