
   
import React, { useEffect, useState } from 'react';
import {
  Image,
  PermissionsAndroid,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  Platform,
  ActivityIndicator
} from 'react-native';

import CameraRoll from '@react-native-community/cameraroll';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/Ionicons'
import FastImage from 'react-native-fast-image'
Icon.loadFont();

const CustomViewChose = () => {

  const [nodes, setNodes] = useState([]);
  const [chose,setChose] = useState(false)

  useEffect(() => {

    if(Platform.OS === 'android'){
      checkPermission()
      .then(() => {
        getPhotos()
      })
    }else{
      getPhotos()
    }
  }, [])

  const checkPermission = async () => {
    const hasPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE, {
      title: "Image gallery app permissions",
      message: "Image gallery needs your permission to access your photos",
      buttonPositive: "OK",
    })

    return status === 'granted';
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
        </View>
  );
};

export default CustomViewChose;