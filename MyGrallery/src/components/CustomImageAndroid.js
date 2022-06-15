import { View, Text } from 'react-native'
import React,{useEffect,useState} from 'react'
import FastImage from 'react-native-fast-image'

const CustomImageAndroid = (props) => {
  const [height,setHeight] = useState(0)
  return (
  
      <View style={{height:110,justifyContent:"center",alignItems:"center",borderRadius:props.borderRadius,}}>
       <FastImage
        style={{
            height: height.height,
            width: 95,
            flex: 1,
            maxHeight:80
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
              evt.nativeEvent.height / evt.nativeEvent.width * 100, 
          })}
       
        />
      </View>
    
  )
}

export default CustomImageAndroid