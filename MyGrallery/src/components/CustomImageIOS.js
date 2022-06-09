import { View, Text,Image } from 'react-native'
import React from 'react'
const CustomImageIOS = (props) => {
  return (
    <View style={{flex:1}}>
       <Image
        style={{
            height: 100,
            minWidth: 100,
            flex: 1
        }}
        resizeMode="cover"
        source={{
            uri:props.uri,
            cache: 'only-if-cached'
        }}
       
        />
    </View>
  )
}

export default CustomImageIOS