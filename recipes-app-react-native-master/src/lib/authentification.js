import { AsyncStorage } from 'react-native';


export const setUsername = () =>{
  AsyncStorage.clear();
  AsyncStorage.setItem('username', 'angel');
}

export const getUsername = async () =>{
  const username = await AsyncStorage.getItem('username');
  // username = "angel"
  return username
}
