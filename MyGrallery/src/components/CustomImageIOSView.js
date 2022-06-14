import { View, Text,Image,Dimensions } from 'react-native'
import React,{useState,useEffect} from 'react'
const { width, height } = Dimensions.get("window")
const CustomImageIOSView = (props) => {
  const [heights,setHeights] = useState(0)
  useEffect(()=>{
    Image.getSize(
      props.uri,
      (srcWidth, srcHeight) => {
        const ratio = Math.max(width / srcWidth, height / srcHeight);
        setHeights({ height: srcHeight * ratio });
      },
      error => console.log(error)
    );
    
  },[])
  return (
    <View style={{flex:1}}>
       <Image
        style={{
            height:heights.height,
            width:width,
        }}
        resizeMode="contain"
        source={{
            uri:props.uri,
            cache: 'only-if-cached'
        }}
       
        />
    </View>
  )
}

export default CustomImageIOSView
