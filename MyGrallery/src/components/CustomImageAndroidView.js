import { View, Text,Dimensions } from 'react-native'
import React,{useEffect,useState} from 'react'
import FastImage from 'react-native-fast-image'
const { width } = Dimensions.get("window")
const CustomImageAndroidView = (props) => {
  const [height,setHeight] = useState(0)
  return (
    <View style={{flex:1}}>
       <FastImage
        style={{
            height: height.height,
            width: width,
            flex: 1,
            
        }}
        resizeMode={FastImage.resizeMode.cover}
        source={{
            uri:props.uri,
            headers: { Authorization: 'someAuthToken' },
            priority: FastImage.priority.high,
            cache:FastImage.cacheControl.immutable
        }}
        onLoad={evt =>
          setHeight({
            height:
              evt.nativeEvent.height / evt.nativeEvent.width * width, 
          })}
       
        />
    </View>
  )
}

export default CustomImageAndroidView
