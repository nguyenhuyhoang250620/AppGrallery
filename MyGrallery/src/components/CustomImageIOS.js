import { View,Image } from 'react-native'
import React,{useState,useEffect} from 'react'

const CustomImageIOS = (props) => {
  const [height,setHeight] = useState({})
  useEffect(()=>{
    setHeight({})
    if(props.uri==undefined){
      console.log("loi")
    }
    else{
      Image.getSize(
        props.uri,
        (srcWidth, srcHeight) => {
          const ratio = Math.min(100 / srcWidth, 100 / srcHeight);
          setHeight({ height: srcHeight * ratio });
        },
        error => console.log(error)
      );
    }
    
    
    // console.log(props.uri)
  },[])
  return (
    <View style={{height:100,width:98,borderWidth:0.5,justifyContent:"center",alignItems:"center",borderRadius:props.borderRadius,borderColor:"#E0E0E0",backgroundColor:"white"}}>
       <Image
        style={{
            width:100*0.9,
            height:height.height,
            maxHeight:100,
            borderRadius:props.borderRadius_img
            
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