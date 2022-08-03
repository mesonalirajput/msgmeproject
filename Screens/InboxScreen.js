import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import IbHeader from './IbHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import EmojiBoard from 'react-native-emoji-board';
import {useIsFocused} from '@react-navigation/native';
const InboxScreen = () => {
  const [DATA, setDATA] = useState(['', '', '', '']);
  const renderMessageItem = ({item}) => <RenderMessage item={item} />;
  const renderFooterComponent = () => <RenderFooter />;
  return (
    <View style={styles.inboxScreen__container}>
      <IbHeader />
      <View style={styles.belowHeader__container}>
        <FlatList
          style={{flex: 1}}
          data={DATA}
          renderItem={renderMessageItem}
          keyExtractor={item => item.id}
          ListHeaderComponent={renderFooterComponent}
          inverted
        />
      </View>
    </View>
  );
};

const RenderMessage = ({item}) => {
  return (
    // <View style={styles.receiverSide__container}>
    //   <Text style={styles.receiverSide__msg}>Hello, how are you?</Text>
    //   <Text style={styles.receiverSide__time}>2:03 PM</Text>
    // </View>
    <View style={styles.senderSide__container}>
      <Text style={styles.senderSide__msg}>Hey! I am doing great.</Text>
      <Text style={styles.senderSide__time}>2:03 PM</Text>
    </View>
  );
};

const RenderFooter = () => {
  const [message, setMessage] = useState();
  const [showEmoji, setShowEmoji] = useState(false);
  const [ifocused, setIFocused] = useState(false);
  return (
    <View style={styles.footer__container}>
      <View style={styles.footer__top}>
        <TouchableOpacity onPress={() => setShowEmoji(!showEmoji)}>
          <MaterialCommunityIcons
            size={27}
            color={'#99b3e6'}
            name="sticker-emoji"
          />
        </TouchableOpacity>
        {/* <EmojiBoard showBoard={showEmoji} onClick={setMessage} /> */}
        <TouchableOpacity>
          <FontAwesome5 size={24} color={'#99b3e6'} name="camera-retro" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="ios-image" size={27} color={'#99b3e6'} />
        </TouchableOpacity>
      </View>
      <View style={{...styles.footer__bottom}}>
        <TextInput
          style={StyleSheet.flatten([
            styles.input,
            ifocused && {
              borderBottomWidth: 2,
              borderBottomColor: '#3366cc',
            },
          ])}
          onChangeText={setMessage}
          value={message}
          placeholder="Message..."
          multiline={true}
          selectionColor={'#adc2eb'}
          numberOfLines={1}
          underlineColorAndroid="transparent"
          onFocus={() => setIFocused(true)}
          onBlur={() => setIFocused(false)}
          placeholderTextColor="#999"
        />
        <View style={{}}>
          <TouchableOpacity
            style={{
              width: 45,
              height: 45,
              alignItems: 'center',
              justifyContent: 'center',
              // backgroundColor: '#000',
            }}>
            <Ionicons name="ios-send" size={30} color="#3366cc" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  inboxScreen__container: {
    flex: 1,
    backgroundColor: '#3366cc',
  },
  belowHeader__container: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 5,
    backgroundColor: '#fff',
    flex: 1,
    // position: 'absolute',
    // left: 0,
    // right: 0,
    // bottom: 0,
    // top: 65,
  },
  receiverSide__container: {
    backgroundColor: '#f2f2f2',
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginLeft: 15,
    marginBottom: 5,
    marginRight: 15,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 8,
    paddingBottom: 8,
    maxWidth: '80%',
    alignSelf: 'flex-start',
  },
  receiverSide__msg: {
    color: '#000',
    fontSize: 14,
  },
  receiverSide__time: {
    color: '#666',
    fontSize: 11,
    textAlign: 'right',
    marginTop: 3,
  },
  senderSide__container: {
    backgroundColor: '#4775d1',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 10,
    marginLeft: 15,
    marginBottom: 5,
    marginRight: 15,
    paddingLeft: 12,
    paddingRight: 10,
    paddingTop: 8,
    paddingBottom: 8,
    maxWidth: '80%',
    alignSelf: 'flex-end',
  },
  senderSide__msg: {
    color: '#fff',
    fontSize: 14,
  },
  senderSide__time: {
    color: '#f2f2f2',
    fontSize: 11,
    textAlign: 'right',
    marginTop: 3,
  },
  footer__container: {
    width: '100%',
    // height: 410,
    // backgroundColor: '#ccc',
  },
  footer__top: {
    flexDirection: 'row',
    width: '35%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginBottom: 5,
  },
  footer__bottom: {
    flexDirection: 'row',
    // height: 40,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginBottom: 15,
    alignSelf: 'stretch',
    paddingHorizontal: 10,
    // backgroundColor: '#000',
  },
  input: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    color: '#000',
    fontSize: 18,
    paddingLeft: 10,
    paddingRight: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#3366cc',
  },
});

export default InboxScreen;
