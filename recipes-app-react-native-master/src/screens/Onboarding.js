import React from 'react';
import { StyleSheet, Dimensions, ImageBackground, Text, View, TextInput, TouchableOpacity } from 'react-native';
import Theme from '../constant/Theme.js';
import { Images } from '../constant';
import axios from 'axios';
import { AsyncStorage } from 'react-native';

const { width, height } = Dimensions.get('screen');

export default class App extends React.Component {

  state={
    username:"",
    password:""
  }

  _login = async () => {
    this.props.navigation.navigate('Recipes');
  }

  render(){

    const { setonBoardingStatus } = this.props;

    return (
      <View style={styles.container}>
      <ImageBackground source={Images.OnboardBackground} style={styles.image}>
      <View style={styles.contents}>
        <Text style={styles.logo}>FoodAIe</Text>
        <View style={styles.inputView} >
          <TextInput
            defaultValue={this.state.email}
            style={styles.inputText}
            placeholder="Username"
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({username:text})}/>
        </View>
        <View style={styles.inputView} >
          <TextInput
            defaultValue={this.state.password}
            secureTextEntry
            style={styles.inputText}
            placeholder="Password"
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({password:text})}/>
        </View>
        <TouchableOpacity>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtn}
                          onPress={() => login(this.state.username, setonBoardingStatus)} >
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.signup}>Signup</Text>
        </TouchableOpacity>

      </View>
      </ImageBackground>
      </View>
    );
  }
}


  async function login(username, setonBoardingStatus){
    console.log(username)
    await axios({
     method: 'get',
     url: 'http://10.15.1.254:5000/api/login/'+ username,
     headers: {'content-type': 'multipart/form-data',
               "Accept": "application/json"}
   })
   .then(async function (response) {
     // console.log(response.data)
     if (response.status === 200){
       AsyncStorage.setItem('username', username)
       setonBoardingStatus(true)
     }
     else{
       console.log("Login failed")
     }

   })
   .catch(function(error) {
     console.log('There has been a problem with your fetch operation: ' + error.message);
      // ADD THIS THROW error
       throw error;
 });
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  contents: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    paddingLeft: width * 0.15
  },
  logo:{
    fontWeight:"bold",
    fontSize:50,
    fontFamily: "monospace",
    marginLeft: width * 0.08,
    color:Theme.COLORS.PRIMARY,
    marginBottom:40
  },
  inputView:{
    width:"80%",
    backgroundColor:Theme.COLORS.DEFAULT,
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"white"
  },
  forgot:{
    color:"white",
    fontSize:11,
    paddingLeft: width * 0.22
  },
  loginBtn:{
    width:"80%",
    backgroundColor:Theme.COLORS.PRIMARY,
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
  loginText:{
    color:"white"
  },
  signup:{
    color:"white",
    paddingLeft: width * 0.27
  }
});
