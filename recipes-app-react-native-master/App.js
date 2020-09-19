import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppContainer from './src/navigations/AppNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from './src/screens/Home/HomeScreen';
import CategoriesScreen from './src/screens/Categories/CategoriesScreen';
import SearchScreen from './src/screens/Search/SearchScreen';
import CameraScreen from './src/screens/Camera/CameraScreen';
import Profile from './src/screens/Profile/Profile';

const HomeStack = createStackNavigator();

function HomeScreenStack() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
    </HomeStack.Navigator>    
  );
}

const CameraStack = createStackNavigator();

function CameraScreenStack() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Camera" component={CameraScreen} />
    </HomeStack.Navigator>
  );
}

const ProfileStack = createStackNavigator();

function ProfileScreenStack() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="Profile" component={Profile} />
    </ProfileStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'ios-home';
            } else if (route.name === 'Scan') {
              iconName = 'ios-camera';
            } else if (route.name === 'Profile') {
              iconName = 'ios-person';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Home" component={HomeScreenStack} />
        <Tab.Screen name="Scan" component={CameraScreenStack} />
        <Tab.Screen name="Profile" component={ProfileScreenStack} />
      </Tab.Navigator>
    </NavigationContainer >
  );
}
