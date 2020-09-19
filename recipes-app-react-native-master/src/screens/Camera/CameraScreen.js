import React from 'react'
import { StyleSheet, Text, View, Platform, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native'
import { Camera } from 'expo-camera'
import * as Permissions from 'expo-permissions'
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { getUsername } from '../../lib/authentification.js'
import Theme from '../../constant/Theme.js';

import ResultScreen from '../Results/ResultScreen';


export default class CameraScreen extends React.Component {
  state = {
    hasCameraPermission: false,
    type: Camera.Constants.Type.back,
    flashMode: Camera.Constants.FlashMode.off,
    autoFocus: Camera.Constants.AutoFocus.on,
    zoom: 0,
    whiteBalance: Camera.Constants.WhiteBalance.auto,
    focusDepth: 0,
    ratio: '16:9',
    processing: false,
  }

  static navigationOptions = ({ navigation }) => {
    return {
        headerTransparent: 'true'
    };
};

  render() {
    const {
      hasCameraPermission,
      type,
      flashMode,
      zoom,
      whiteBalance,
      focusDepth,
      photo,
      processing
    } = this.state

    if (!hasCameraPermission) {
      return <View style={styles.container} />
    }

    return (
      <View style={styles.container}>
        <Camera
          style={styles.camera}
          ref={ref => (this._cameraInstance = ref)}
          type={type}
          flashMode={flashMode}
          zoom={zoom}
          whiteBalance={whiteBalance}
          focusDepth={focusDepth}
        />


        {processing == false ? (
          <View style={styles.controls}>
            <TouchableOpacity
              style={styles.camera_button}
              // title="Take photo"
              onPress={this._takePictureButtonPressed} >

              <Ionicons name='ios-camera' size={50.0} color='white' />
            </TouchableOpacity>
            {photo && <Image style={styles.photo} source={photo} />}
          </View>
        ) : (
          <View style={styles.activity_indicator}>
            
            <ActivityIndicator color={Theme.COLORS.PRIMARY} size='large' />
            <Text style={styles.processing_label}>Processing Food</Text>
          </View>
        )}


      </View>
    )
  }

  async componentDidMount() {
    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA)

      this.setState({ hasCameraPermission: status === 'granted' })

      if (status !== 'granted') {
        alert('Hey! You might want to enable Camera in your phone settings.')
      }
    } catch (err) {
      console.log('err', err)
    }

    if (Platform.OS === 'android') {
      try {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)

        this.setState({ hasCameraPermission: status === 'granted' })

        if (status !== 'granted') {
          alert('Hey! You might want to enable Camera in your phone settings.')
        }
      } catch (err) {
        console.log('err', err)
      }
    }


  }

  _takePictureButtonPressed = async () => {
    if (this._cameraInstance) {
      const options = { quality: 0.1, base64: true };
      const photo = await this._cameraInstance.takePictureAsync(options);
      this.setState({ photo })
      const { uri, width, height, base64 } = photo;
      // console.log({uri, width, height});

      // Post the base54 image data
      const username = await getUsername()
      console.log(username)
      const formData = new FormData()
      formData.append("username", username);
      formData.append("image", base64);

      this.setState({
        processing: true
      });

      var self = this;
      axios({
        method: 'post',
        timeout: 10000,
        url: 'http://192.168.2.115:5000/api/process_food', // 10.15.1.254 192.168.2.115
        data: formData,
        headers: {
          'content-type': 'multipart/form-data',
          "Accept": "application/json"
        }
      })
        .then(function (response) {
          self.setState({
            processing: false
          });
          
          self.props.navigation.navigate('Results', {response: response});
        })
        .catch(function (error) {
          self.setState({
            processing: false
          });

          Alert.alert('Error', 'There has been a problem with your fetch operation.')
          console.log('There has been a problem with your fetch operation: ' + error.message);
          // ADD THIS THROW error
          throw error;
        });
    }
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    position: 'relative',
  },

  camera: {
    flex: 1,
  },

  camera_button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 75,
    height: 75,
    backgroundColor: Theme.COLORS.PRIMARY,
    borderRadius: 50,
    marginBottom: 48,
  },

  activity_indicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },

  processing_label: {
    fontSize: 17,
    fontWeight: 'bold',
    color: Theme.COLORS.PRIMARY,
  },

  controls: {
    position: 'absolute',
    zIndex: 10,
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },

  photo: {
    width: 100,
    height: 100,
    position: 'absolute',
    right: 0,
    bottom: 0,
    top: 0,
  }
})
