
   
import React, { useEffect, useState,useRef } from 'react';
import {
  Image,
  ScrollView,
  TouchableOpacity,
  View,
  Animated,
  PermissionsAndroid,
  Platform,
  Text
} from 'react-native';
import RNFS  from 'react-native-fs'
import CameraRoll from '@react-native-community/cameraroll';
import Icon from 'react-native-vector-icons/Ionicons'
Icon.loadFont();

const CustomViewChose = (props) => {


  const [nodes, setNodes] = useState([]);
  const [album_img,setalbum_img] = useState([])
  


  useEffect(() => {
    getPhotos()
     
  }, [])

  useEffect(()=>{
    album_imgs()
  },[album_img])

  const choseimage =()=>{
    props.parencallbacks(false)  
  }
  const album_imgs = ()=>{
    props.album_img(album_img)
  }

  const getPhotos = async () => {
    const photos = await CameraRoll.getPhotos({
      first: 10,
    })
    setNodes(photos.edges.map(edge => edge.node))
  }
  const checkAndroidPermission = async () => {
    try {
      const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
      await PermissionsAndroid.request(permission);
      Promise.resolve();
    } catch (error) {
      Promise.reject(error);
    }
};
const changeURL =(img)=>{
  const destination = `${RNFS.CachesDirectoryPath}${Math.random().toString(36).substring(7)}.png`;
  try {
    var array = [];
    array.push(img);
    array.map(async(item)=>{
      let absolutePath =await RNFS.copyAssetsFileIOS(item, destination, 0, 0);
      console.log(absolutePath)
    })
  } catch(error) {
    console.log(error)
  } 
  return destination;
}

const savePicture = async () => {
    if (Platform.OS === 'android'){
      await checkAndroidPermission();
    }
    album_img.map( doc=>{
      CameraRoll.save(Platform.OS == "ios"? changeURL(doc):doc,{type:"auto",album:props.name_album}).
      then((res)=>{console.log("save img...",res);}).
      catch((err)=>{console.log("err for save img...",err);})
    })
    
    
};
const Deletearr =(img,array)=>{
  const arr = array.filter(item=>item!==img)
  setalbum_img(arr)
}
const Check=(img,array)=>{
  let count = 0;
  for(let i=0;i<array.length;i++){
    if(array[i]==img){
      count++;
      break
    }
  }
  return (count>0)?true:false
}

 
  
  return (
        <View style={{
            position:"absolute",
             width:"100%",
             height:"100%",
             bottom:0,
             backgroundColor:"#F0F0F0"
        }}>
              <View style={{
                height:100,
                width:"100%",
                backgroundColor:"#F8F8F8",
                flexDirection:"row",
                justifyContent:"space-between",
                alignItems:"center",
                padding:20
              }}>
                <View style={{flexDirection:"row",alignItems:"center"}} >
                  <TouchableOpacity
                    onPress={()=>{
                      choseimage()
                    }}
                  >
                  <Icon
                      name='close-outline'
                      size={30}
                      color="black"
                  />
                  </TouchableOpacity>
                  <Text>{album_img.length>0?`Đã chọn ${album_img.length} mục`:"Chọn mục"}</Text>
                </View>
                <TouchableOpacity
                  onPress={()=>{
                    choseimage()
                    savePicture()
                    console.log(album_img)
                  }}
                >
                <Icon
                    style={{opacity:album_img.length>0?1:0.1}}
                    name='checkmark-outline'
                    size={30}
                    color="black"
                />
                </TouchableOpacity>
              </View>
            <ScrollView>
            <View
                style={{
                flex: 1,
                flexDirection: 'row',
                flexWrap: 'wrap',
                }}
            >
                {
                nodes.map(
                    (node, index) => (
                    
                    <TouchableOpacity

                        key={index}
                        style={{
                        height: 100,
                        minWidth:100,
                        flex: 1,
                        padding:10,
                        borderWidth:0.5,
                        backgroundColor:"white"
                        }}
                        onPress={() => {
                          if(Check(node.image.uri,album_img)){
                            Deletearr(node.image.uri,album_img)
                          }
                          else{
                            setalbum_img([...album_img,node.image.uri])
                          }
                           
                        }}
                    >
                        <Image
                          style={{
                              height: 100,
                              minWidth: 100,
                              flex: 1
                          }}
                          resizeMode="cover"
                          source={{
                              uri:node.image.uri,
                          }}
                        />
                        {
                          Check(node.image.uri,album_img)&&
                          <View style={{
                            height:20,
                            width:20,
                            backgroundColor:"white",
                            position:"absolute",
                            justifyContent:"center",
                            alignItems:"center",
                            borderRadius:500/2,
                            borderWidth:1,
                            bottom:5,
                            padding:5,
                            right:5}}>
                            <View style={{height:10,width:10,backgroundColor:"blue",borderRadius:500/2}}></View>
                          </View>
                        }
                    </TouchableOpacity>
                    )
                )
                }
            </View>
            </ScrollView>
        </View>
  );
};

export default CustomViewChose;