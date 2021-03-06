import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'styled-components';

import HomeSvg from '../assets/home.svg';
import CarSvg from '../assets/car.svg';
import PeopleSvg from '../assets/people.svg';

import { AppStackRoutes } from './app.stack.routes';
import { MyCars } from '../screens/MyCars';
import { Profile } from '../screens/Profile';

const { Navigator, Screen } = createBottomTabNavigator();

export function AppTabRoutes(){
  const theme = useTheme();

  return(
    <Navigator
    screenOptions={{
      tabBarActiveTintColor: theme.colors.main,
      headerShown: false,
      tabBarShowLabel: false,     
      tabBarStyle: {
          
          
          paddingVertical: Platform.OS === 'ios' ? 20 : 0,
          height: 50,
          backgroundColor: theme.colors.background_primary
        }
      }}
    >
      <Screen 
        name="Principal"
        component={AppStackRoutes}
        options={{
          tabBarLabel:"Home",
          headerShown: false,
          tabBarIcon: ({ color }) =>  <HomeSvg width={24} height={24} fill={color} />
          
        }}
      />
      <Screen 
        name="MyCars"
        component={MyCars}
        options={{
          headerShown: false,
          tabBarIcon: (({ color }) => (
            <CarSvg width={24} height={24} fill={color} />
          ))
        }}
      />
      <Screen 
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: (({ color }) => (
            <PeopleSvg width={24} height={24} fill={color}/>
          ))
        }}       
      />
    </Navigator>
  )
}