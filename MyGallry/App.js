import React, { useEffect, useState } from 'react';
import {
  Image,
  PermissionsAndroid,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  Platform
} from 'react-native';

import CameraRoll from '@react-native-community/cameraroll';
import Swiper from 'react-native-swiper';

const App = () => {

  const [nodes, setNodes] = useState([]);
  const [detailViewVisible, setDetailViewVisibility] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if(Platform.OS == 'android'){
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
      first: 50,
    })

    setNodes(photos.edges.map(edge => edge.node))
  }

  return (
    <SafeAreaView>
      <ScrollView>
        {
          detailViewVisible
          ? (
            <Swiper
              loop={true}
              index={selectedIndex}
            >
              {
                nodes.map(
                  (node, index) => (
                    <View
                      key={index}
                      style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#333',
                      }}
                    >
                      <Image
                        style={{
                          width: "100%",
                          flex: 1,
                        }}
                        resizeMode="contain"
                        source={{
                          uri: node.image.uri
                        }}
                      />
                      <View
                        style={{
                          position: 'absolute',
                          top:0,
                          left:20
                        }}
                      >
                        <TouchableOpacity
                        style={{
                          backgroundColor:"black",
                          width:40,
                          height:40,
                          borderRadius:500/2,
                          justifyContent:"center",
                          alignItems:"center"
                        }}
                          onPress={() => {
                            setDetailViewVisibility(false)
                          }}
                        >
                          <Text style={{color:"white",fontSize:30}}>X</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )
                )
              }
            </Swiper>
          )
          : (
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
                        minWidth: 100,
                        flex: 1,
                        padding:10,
                        borderWidth:1
                      }}
                      onPress={() => {
                        setDetailViewVisibility(true)
                        setSelectedIndex(index)
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
                          uri: node.image.uri
                        }}
                      />
                    </TouchableOpacity>
                  )
                )
              }
            </View>
          )
        }
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;