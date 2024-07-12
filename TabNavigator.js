import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HomeScreen from './src/screen/HomeScreen'
import Favarites from './src/screen/Favarites'
import CartScreen from './src/screen/CartScreen'
import OrderScreen from './src/screen/OrderScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { COLORS } from './src/Theme/theme'
import Icon from 'react-native-vector-icons/Ionicons';
import CustomIcon from '../Coffee/src/component/CustomIcon'
const Tab = createBottomTabNavigator()

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown:false ,
     tabBarStyle: styles.tabBarStyle, 
     tabBarHideOnKeyboard: false, 
     tabBarShowLabel: false,
  
     }}>
      <Tab.Screen name="Home"
       options={{
        tabBarIcon: ({focused, color, size}) => (
            <Icon name="home" size={25}  color={
                focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
              }/>
        ),
      }}
      component={HomeScreen} />
      <Tab.Screen name="Favarites" 
       options={{
        tabBarIcon: ({focused, color, size}) => (
            <Icon name="heart" size={25}  color={
                focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
              }/>
        ),
      }}
      component={Favarites} />
      <Tab.Screen name="CartScreen" 
       options={{
        tabBarIcon: ({focused, color, size}) => (
            <Icon name="cart" size={25}  color={
                focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
              }/>
        ),
      }}
      component={CartScreen} />
      <Tab.Screen name="OrderScreen" 
       options={{
        tabBarIcon: ({focused, color, size}) => (
            <Icon name="list" size={25}  color={
                focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
              }/>
        ),
      }}
      component={OrderScreen} />
    </Tab.Navigator>
  )
}

export default TabNavigator

const styles = StyleSheet.create({
    tabBarStyle: {
        height: 80,
        position: 'absolute',
        backgroundColor: COLORS.primaryBlackRGBA,
        borderTopWidth: 0,
        elevation: 0,
        borderTopColor: 'transparent',
      },
      BlurViewStyles: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      },
})