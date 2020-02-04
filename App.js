import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  NativeModules,
  PermissionsAndroid,
} from 'react-native';
import { RtcEngine } from 'react-native-agora';
const { Agora } = NativeModules;
import { APP_ID } from './AppId';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    }
  }

  componentDidMount() {
    this.requestPermission();
    this.joinChannel();
  }

  async requestPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          'title': "Please allow mic",
          'buttonPositive': "OK",
        }
      );
      return granted;
    } catch (err) {
      console.warn(err);
      throw e;
    }
  }

  joinChannel = (callback=null) => {
    RtcEngine.init({
      appid: APP_ID,
      channelProfile: 0,
      mode: 0,
      audioProfile: Agora.AudioProfileDefault,
      audioScenario: 3,
    });

    RtcEngine.setParameters("{\"che.audio.force.bluetooth.a2dp\":true}")

    RtcEngine.joinChannel("demoChannel1").then(res => {
      console.log("joined");
      callback && callback();
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Text</Text>
      </View>
    );
  }
}

export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
