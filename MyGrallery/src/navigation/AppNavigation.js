import * as React from 'react';
import { SafeAreaView} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons'
import PhotoScreen from '../screens/Photo/PhotoScreen'
import AlbumScreen from '../screens/Album/AlbumScreen'
Icon.loadFont()

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator initialRouteName='Image' screenOptions={{headerShown:false}}>
      <Tab.Screen name="Image" component={PhotoScreen}
        options={{
          tabBarIcon:({color,size})=>(
            <Icon
              name='image-outline'
              size={size}
              color={color}
            />
          )
        }}
      />
      <Tab.Screen name="Album" component={AlbumScreen} 
        options={{
          tabBarIcon:({color,size})=>(
            <Icon
              name='albums-outline'
              color={color}
              size={size}
            />
          )
        }}      
      />
    </Tab.Navigator>
  );
}

export default function AppNavigation() {
  return (
      <MyTabs />
  );
}