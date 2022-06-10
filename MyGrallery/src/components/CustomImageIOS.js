import { View, Text,Image,Dimensions } from 'react-native'
import React,{useState,useEffect} from 'react'

const CustomImageIOS = (props) => {
  const [height,setHeight] = useState(0)
  useEffect(()=>{
    Image.getSize(
      props.uri,
      (srcWidth, srcHeight) => {
        const ratio = Math.min(100 / srcWidth, 100 / srcHeight);
        setHeight({ height: srcHeight * ratio });
      },
      error => console.log(error)
    );
    console.log(height.height)
  },[])
  return (
    <View style={{height:110,width:110,borderWidth:1,justifyContent:"center",alignItems:"center",borderRadius:props.borderRadius}}>
       <Image
        url=''
        style={{
            width:100*0.9,
            height:height.height,
            maxHeight:90,
            borderRadius:props.borderRadius_img
            
        }}
        resizeMode="center"
        source={{
            uri:props.uri,
            cache: 'only-if-cached'
        }}
       
        />
    </View>
  )
}

export default CustomImageIOS