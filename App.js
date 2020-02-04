import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  NativeModules,
  PermissionsAndroid,
} from 'react-native';
import { RtcEngine } from 'react-native-agora';
import { addListener, getHeadset } from 'react-native-bluetooth-headset-detect';

const { Agora } = NativeModules;
const APP_ID = "2e0cee1dfa824858a8acc127d9dd15ac";

class App extends React.Component {
  constructor(props) {
    super(props);
    //this.isBluetooth = getHeadset();
    this.state = {
      users: [],
    }

    /*addListener((device) => {
      this.isBluetooth = device !== null;
      RtcEngine.leaveChannel().then(() => {
        console.log("Leave channel");
        setTimeout(() => {
          this.joinChannel(() => RtcEngine.setEnableSpeakerphone(true));
        }, 1000);
      });

      console.log('Connected device:', device);
    });*/
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
      //audioScenario: this.isBluetooth ? 3 : Agora.AudioScenarioDefault,
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
