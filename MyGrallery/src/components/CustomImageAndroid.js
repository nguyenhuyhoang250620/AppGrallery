import { View, Text } from 'react-native'
import React,{useEffect} from 'react'
import FastImage from 'react-native-fast-image'

const CustomImageAndroid = (props) => {
  return (
    <View style={{flex:1}}>
       <FastImage
        style={{
            height: 100,
            minWidth: 100,
            flex: 1
        }}
        resizeMode={FastImage.resizeMode.cover}
        source={{
            uri:props.uri,
            headers: { Authorization: 'someAuthToken' },
            priority: FastImage.priority.high,
            cache:FastImage.cacheControl.immutable
        }}
       
        />
    </View>
  )
}

export default CustomImageAndroid