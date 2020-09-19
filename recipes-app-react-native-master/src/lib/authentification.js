import { AsyncStorage } from 'react-native';


export const setUsername = () =>{
  AsyncStorage.setItem('username', 'test');
}

export const getUsername = async () =>{
  const username = await AsyncStorage.getItem('username');
  return username
}
