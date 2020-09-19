import React from 'react'
import { StyleSheet, Text, View, Platform, Button, Image } from 'react-native'
import { Camera} from 'expo-camera'
import * as Permissions from 'expo-permissions'
import axios from 'axios';

export default class App extends React.Component {
  state = {
    hasCameraPermission: false,
    type: Camera.Constants.Type.back,
    flashMode: Camera.Constants.FlashMode.off,
    autoFocus: Camera.Constants.AutoFocus.on,
    zoom: 0,
    whiteBalance: Camera.Constants.WhiteBalance.auto,
    focusDepth: 0,
    ratio: '16:9',
  }

  render() {
    const {
      hasCameraPermission,
      type,
      flashMode,
      zoom,
      whiteBalance,
      focusDepth,
      photo,
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

        <View style={styles.controls}>
          <Button
            title="Take photo"
            onPress={this._takePictureButtonPressed}
          />

          {photo && <Image style={styles.photo} source={photo} />}
        </View>
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
      const options = { quality: 0.1, base64: true};
      const photo = await this._cameraInstance.takePictureAsync(options);
      this.setState({ photo })
      const {uri, width, height,base64} = photo;
      // console.log({uri, width, height});

      // Post the base54 image data
      console.log("hola")
      axios({
        method: 'post',
        url: 'http://10.15.0.208:5000/api/process_food/',
        data: {img: base64},
        headers: {'content-type': 'multipart/form-data',
                  "Accept": "application/json"}
      })
      .then(function (response) {
        console.log(response.data)
      })
      .catch(function(error) {
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
