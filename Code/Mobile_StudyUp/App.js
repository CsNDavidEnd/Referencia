import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { auth } from './Firebase';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import QuizzesScreen from './screens/QuizzesScreen';
import AccountScreen from './screens/AccountScreen';
import SubjectsScreen from './screens/SubjectsScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import _proba_quizzes from './screens/_proba_quizzes';
import LeaderBoard from './screens/LeaderBoard';
import TakingQuizScreen from './screens/TakingQuizScreen'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
/*
const STYLES = ['default', 'dark-content', 'light-content'];
const [statusBarStyle, setStatusBarStyle] = useState(STYLES[1]);

  const changeStatusBarStyle = () => {
    const styleId = STYLES.indexOf(statusBarStyle) + 1;
    if (styleId === STYLES.length) {
      setStatusBarStyle(STYLES[0]);
    } else {
      setStatusBarStyle(STYLES[styleId]);
    }
  }; 
  */
  
  function Tabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen name='FirstPage' component={HomeScreen} options={{ headerShown: false }} />
        <Tab.Screen name='Subjects' component={_proba_quizzes} options={{ headerShown: false }} />
        <Tab.Screen name='Quizzes' component={QuizzesScreen} options={{ headerShown: false }} />
        <Tab.Screen name='Leaderboard' component={LeaderBoard} options={{ headerShown: false }} />
        <Tab.Screen name='Profile' component={AccountScreen} options={{ headerShown: false }} />
      </Tab.Navigator>
    );
  }

export default function App() {
    const [user, setUser] = useState(null);
  
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        setUser(user);
      });
  
      return unsubscribe;
    }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
          name="Home"
          component={Tabs}
          options={{
            headerShown: false
          }}
          />
        <Stack.Screen
          name="proba"
          component={_proba_quizzes}
          options={{
            headerShown: false
          }} />
        <Stack.Screen
          name="TakingQuizScreen"
          component={TakingQuizScreen}
          options={{
            headerShown: false
          }} />
      <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{
            headerShown: false
          }} />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            title: 'Add meg az adataid',
            headerStyle: {
              backgroundColor: '#fff'
            },
            headerTintColor: '#8562AC'
          }} />

        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            title: 'Add meg az adataid',
            headerStyle: {
              backgroundColor: '#fff'
            },
            headerTintColor: '#8562AC'
          }} />
 
        
        <Stack.Screen
          name="Account"
          component={AccountScreen}
          options={{
            title: '',
            headerStyle: {
              backgroundColor: '#fff'
            },
            headerTintColor: '#8562AC'
          }} />
          <Stack.Screen
          name='ForgotPassword'
          component={ForgotPasswordScreen}
          options={{
            title: 'Állítsd vissza a jelszavad',
            headerStyle: {
              backgroundColor: '#fff'
            },
            headerTintColor: '#8562AC'
          }}/>

        <Stack.Screen
          name="Quizzes"
          component={QuizzesScreen} />
        <Stack.Screen
          name="Leaderboard"
          component={LeaderBoard} />
        <Stack.Screen
          name="Subjects"
          component={SubjectsScreen} />
       
      </Stack.Navigator>
    </NavigationContainer>
  );
}
