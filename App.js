import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import OnboardingScreen from './screens/OnboardingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage'
import HomeScreen from './screens/HomeScreen';
import SplashScreen from './screens/SplashScreen';
import ProfileScreen from './screens/ProfileScreen';

export default function App() {
  const Stack = createNativeStackNavigator()
  const [userName, setUsername] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const [isSignedIn, setIsSignedIn] = React.useState(false)

   const loadUser = async () => {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    try {
      await sleep(2000)
      let userName = await AsyncStorage.getItem('username')
      setUsername(userName)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  React.useEffect(() => {
      loadUser()
  }, [])

  if (isLoading) {
    return <SplashScreen />
  }



  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={({route}) => ({
        headerShown: false
      })}>
        {
          userName === null ? (
            <>
              <Stack.Screen name='OnboardingScreen' component={OnboardingScreen}/>
              <Stack.Screen name='HomeScreen' component={HomeScreen} />
              <Stack.Screen name='ProfileScreen' component={ProfileScreen} /> 
            </>

          ) : (
            <>
              <Stack.Screen name='HomeScreen' component={HomeScreen} />
            </>
          )
        }
       
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
