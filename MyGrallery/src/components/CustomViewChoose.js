
   
import React, { useEffect, useState,useRef } from 'react';
import {
  Image,
  ScrollView,
  TouchableOpacity,
  View,
  Animated
} from 'react-native';

import CameraRoll from '@react-native-community/cameraroll';
import Icon from 'react-native-vector-icons/Ionicons'
Icon.loadFont();

const CustomViewChose = (props) => {

  const toggle = useRef(new Animated.Value(0)).current
  const [nodes, setNodes] = useState([]);
  const [chose,setChose] = useState(false)
  const [check,setCheck] = useState(false)
  const [album_img,setalbum_img] = useState([])

  Animated.timing(toggle,{
    useNativeDriver:false,
    duration:200,
    toValue:80
  }).start()
  useEffect(() => {
    getPhotos()
  }, [])


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
  return (
        <View style={{
            position:"absolute",
             width:"100%",
             height:"100%",
             bottom:0,
             backgroundColor:"#F0F0F0"
        }}>
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
                        backgroundColor:index===0&&chose?"red":"white"
                        }}
                        onPress={() => {
                            setChose(true) 
                            setCheck(true)    
                            setalbum_img([...album_img,node.image.uri])
                            album_imgs()
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
                    </TouchableOpacity>
                    )
                )
                }
            </View>
            </ScrollView>
            {
              check&&
              <Animated.View style={{
                height:toggle,
                width:"100%",
                backgroundColor:"#A9A9A9",
                position:"absolute",
                justifyContent:"center",
                bottom:0,
                alignItems:"flex-end",
                padding:20
              }}>
                <TouchableOpacity
                  onPress={()=>{
                    choseimage()
                  }}
                >
                <Icon
                    name='checkmark-outline'
                    size={30}
                    color="black"
                />
                </TouchableOpacity>
              </Animated.View>
            }
        </View>
  );
};

export default CustomViewChose;