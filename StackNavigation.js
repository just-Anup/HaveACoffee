import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HomeScreen from './src/screen/HomeScreen'
import Payment from './src/screen/Payment'
import TabNavigator from './TabNavigator'
import Favarites from './src/screen/Favarites'
import CartScreen from './src/screen/CartScreen'
import DetailScreen from './src/screen/DetailScreen'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()
const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="TabNavigator" component={TabNavigator} options={{animation:"slide_from_bottom"}}/>
        <Stack.Screen name="DetailScreen" component={DetailScreen} options={{animation:"slide_from_bottom"}}/>
        <Stack.Screen name="Payment" component={Payment} options={{animation:"slide_from_bottom"}}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default StackNavigation

const styles = StyleSheet.create({})