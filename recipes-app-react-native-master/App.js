import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppContainer from './src/navigations/AppNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Theme from './src/constant/Theme';

import HomeScreen from './src/screens/Home/HomeScreen';
import NewsFeedScreen from './src/screens/NewsFeed/NewsFeed';
import DietOverviewScreen from './src/screens/DietOverview/DietOverview';
import CategoriesScreen from './src/screens/Categories/CategoriesScreen';
import SearchScreen from './src/screens/Search/SearchScreen';
import CameraScreen from './src/screens/Camera/CameraScreen';
import Profile from './src/screens/Profile/Profile';
import ResultScreen from './src/screens/Results/ResultScreen';

const HomeStack = createStackNavigator();

function HomeScreenStack() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Recipes" component={HomeScreen} />
    </HomeStack.Navigator>
  );
}

const NewsFeed = createStackNavigator();

function NewsFeedStack() {
  return (
    <NewsFeed.Navigator>
      <NewsFeed.Screen name="DietOverview" component={NewsFeedScreen} />
    </NewsFeed.Navigator>
  );
}

const DietOverview = createStackNavigator();

function DietOverviewStack() {
  return (
    <DietOverview.Navigator>
      <DietOverview.Screen name="DietOverview" component={DietOverviewScreen} />
    </DietOverview.Navigator>
  );
}

const CameraStack = createStackNavigator();

function CameraScreenStack() {
  return (
    <CameraStack.Navigator>
      <CameraStack.Screen name="Camera" component={CameraScreen} />
      <CameraStack.Screen name="Results" component={ResultScreen} />
    </CameraStack.Navigator>
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

            if (route.name === 'NewsFeed') {
              iconName = 'ios-home';
            }else if (route.name === 'Recipes') {
              iconName = 'ios-home';
            } else if (route.name === 'Overview') {
              iconName = 'list-outline';
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
          activeTintColor: Theme.COLORS.PRIMARY,
          inactiveTintColor: Theme.COLORS.SWITCH_OFF,
        }}
      >
        <Tab.Screen name="NewsFeed" component={NewsFeedStack} />
        <Tab.Screen name="Recipes" component={HomeScreenStack} />
        <Tab.Screen name="Overview" component={DietOverviewStack} />
        <Tab.Screen name="Scan" component={CameraScreenStack} />
        <Tab.Screen name="Profile" component={ProfileScreenStack} />
      </Tab.Navigator>
    </NavigationContainer >
  );
}
