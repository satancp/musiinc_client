import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar as Bar,
  LogBox
} from 'react-native';
import Toast from 'react-native-toast-message';
import { View, Text, Button, Colors } from 'react-native-ui-lib';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import CommunityListPage from './src/Pages/CommunityList';
import CommunityPublishPage from './src/Pages/CommunityPublish';
import PreparingPage from './src/Pages/Preparing';
import LoginPage from './src/Pages/Login';
import { i18n, initLang, changeLang } from './i18n';

LogBox.ignoreAllLogs();

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    paddingTop: Bar.currentHeight
  }
});

const LoginStack = createStackNavigator();
const CommunityStack = createStackNavigator();
const HomeTabs = createBottomTabNavigator();
const AppStack = createStackNavigator();

const LoginStackNavigator = () => (
  <LoginStack.Navigator
    screenOptions={{
      headerStyle: { elevation: 0 },
      cardStyle: { backgroundColor: '#ffffff' },
      headerShown: false
    }}
  >
    <LoginStack.Screen name="Login" component={LoginPage} />
    {/* <LoginStack.Screen name="Sign Up" component={Register} /> */}
  </LoginStack.Navigator>
);

const CommunityStackNavigator = () => (
  <CommunityStack.Navigator
    screenOptions={{
      headerStyle: { elevation: 0 },
      cardStyle: { backgroundColor: '#ffffff' }
    }}
  >
    <CommunityStack.Screen
      name="List"
      component={CommunityListPage}
      options={{ headerShown: false }}
    />
    <CommunityStack.Screen
      name="Publish"
      component={CommunityPublishPage}
      options={{ headerTitle: '' }}
    />
  </CommunityStack.Navigator>
);

const HomeTabNavigator = () => (
  <HomeTabs.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === i18n('APP.Tabs.community')) {
          iconName = focused ? 'md-home' : 'md-home-outline';
        } else if (route.name === i18n('APP.Tabs.video')) {
          iconName = focused ? 'md-videocam' : 'md-videocam-outline';
        } else if (route.name === i18n('APP.Tabs.message')) {
          iconName = focused ? 'md-chatbox' : 'md-chatbox-outline';
        } else if (route.name === i18n('APP.Tabs.shop')) {
          iconName = focused ? 'md-cart' : 'md-cart-outline';
        } else if (route.name === i18n('APP.Tabs.my')) {
          iconName = focused ? 'md-person' : 'md-person-outline';
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
      tabBarHideOnKeyboard: true
    })}
  >
    <HomeTabs.Screen
      name={i18n('APP.Tabs.community')}
      component={CommunityStackNavigator}
      key="community"
      options={{ headerShown: false }}
    />
    <HomeTabs.Screen
      name={i18n('APP.Tabs.video')}
      component={PreparingPage}
      key="video"
    />
    <HomeTabs.Screen
      name={i18n('APP.Tabs.message')}
      component={PreparingPage}
      key="message"
    />
    <HomeTabs.Screen
      name={i18n('APP.Tabs.shop')}
      component={PreparingPage}
      key="shop"
    />
    <HomeTabs.Screen
      name={i18n('APP.Tabs.my')}
      component={PreparingPage}
      key="my"
    />
  </HomeTabs.Navigator>
);

const AppStackNavigator = () => (
  <SafeAreaView style={styles.container}>
    <Toast ref={(ref) => Toast.setRef(ref)} />
    <NavigationContainer>
      <StatusBar style="auto" />
      <AppStack.Navigator
        initialRouteName={'LoginScreen'}
        screenOptions={{
          headerStyle: { elevation: 0 },
          cardStyle: { backgroundColor: '#ffffff' },
          headerShown: false
        }}
      >
        <AppStack.Screen name="LoginScreen" component={LoginStackNavigator} />
        <AppStack.Screen
          name="HomeScreen"
          component={HomeTabNavigator}
          key={'HomeScreen'}
        />
      </AppStack.Navigator>
    </NavigationContainer>
  </SafeAreaView>
);

export default AppStackNavigator;
