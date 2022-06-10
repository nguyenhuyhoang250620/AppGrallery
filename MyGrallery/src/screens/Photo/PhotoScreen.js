
   
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
  ActivityIndicator,
  Dimensions

} from 'react-native';

import CameraRoll from '@react-native-community/cameraroll';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/Ionicons'
import FastImage from 'react-native-fast-image'
import CustomImageAndroid from '../../components/CustomImageAndroid'
import CustomImageIOS from '../../components/CustomImageIOS'
import CustomImageIOSView from '../../components/CustomImageIOSView';
import CustomImageAndroidView from '../../components/CustomImageAndroidView';

const { width, height } = Dimensions.get("window")
Icon.loadFont();

const PhotoScreen = () => {

  const [nodes, setNodes] = useState([]);
  const [detailViewVisible, setDetailViewVisibility] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [time,setTime] = useState([])
  const [isload,setIsload] = useState(true)
  const [test,setTest] = useState([])
 

  useEffect(() => {
    if(Platform.OS === 'android'){
      checkPermission()
      .then(() => {
        getPhotos()
      })
    }else{
      getPhotos()
    }    
  },[])

  // useEffect(()=>{
  //   Image.getSize(
  //     "ph://43AD6930-13E6-408D-BA7C-6F8D8ED37DD5/L0/001",
  //     (srcWidth, srcHeight) => {
  //       const ratio = Math.min(100 / srcWidth, 100 / srcHeight);
  //       setTest({ height: srcHeight * ratio });
  //     },
  //     error => console.log(error)
  //   );
  //   console.log(test)
  // },[])
  
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
      first: 500,
    })
    setNodes(photos.edges.map(edge => edge.node))
    setIsload(false)
  }
  

  const getTime = (item)=>{
    nodes.map((doc,index)=>{
      if(index===item){
        var timestamp;
        timestamp = doc.timestamp;
        console.log(doc)
        var timezone = new Date(timestamp*1000)
        var day = timezone.getDate()
        var month = timezone.getMonth()+1
        var hours = timezone.getHours()
        var minutes = timezone.getMinutes()
        var todo = {
          day:day,
          month:month,
          hours:hours,
          minutes:minutes
        }
        setTime([todo])
      }
    })
  }

  return (
    <SafeAreaView style={{flex:1}}>
      {
      isload 
      ?<ActivityIndicator size={40} color="black"/>
      :<View style={{flex:1}}>  
      {
        detailViewVisible
        ? (
          <View style={{flex:1}}>
            <Swiper
              loop={false}
              index={selectedIndex}
              showsPagination={false}
              onIndexChanged={(item)=>{
                nodes.map((doc,index)=>{
                  if(item===index){
                    var timestamp;
                      timestamp = doc.timestamp;
                      var timezone = new Date(timestamp*1000)
                      var day = timezone.getDate()
                      var month = timezone.getMonth()+1
                      var hours = timezone.getHours()
                      var minutes = timezone.getMinutes()                        
                      var todo = {
                        day:day,
                        month:month,
                        hours:hours,
                        minutes:minutes
                      }
                      setTime([todo])
                  }
                })
              }}
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
                      {
                        Platform.OS=='ios'
                        ?<CustomImageIOSView
                          uri = {node.image.uri}
                        />
                        :<CustomImageIOSView
                          uri = {node.image.uri}
                        />
                      }
                      
                      
                    </View>
                  )
                )
              }
            </Swiper>
            <View         
              style={{
                  position:"absolute",
                  width:"100%",
                  top:0,
                  backgroundColor: 'rgba(0,0,0,0.3)',
                  height:"10%",
                  justifyContent:"flex-start",
                  
                  flexDirection:"row",
                  alignItems:"center"
                }}>
                    <TouchableOpacity
                      style={{paddingHorizontal:10}}
                      onPress={() => {
                        setDetailViewVisibility(false)
                      }}
                    >
                      <Icon
                        name='arrow-back-outline'
                        size={30}
                        color="white"
                      />
                    </TouchableOpacity>
                    <View>
                      {
                        time.map((item,index)=>(
                          <View
                            key={index}
                          >
                            <Text style={{color:"white",fontSize:16,fontWeight:"bold"}}>{item.day} thg {item.month}</Text>
                            <Text style={{color:"white"}}>{item.hours}:{item.minutes}</Text>
                          </View>
                        ))
                      }
                    </View>
              </View>
          </View>
        )
        : (
          <ScrollView>
          <View>
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
                        marginVertical:10
                      }}
                      onPress={() => {
                        setDetailViewVisibility(true)
                        getTime(index)
                        setSelectedIndex(index)                           
                      }}
                      onLongPress={()=>{
                        console.log("xoa")
                        
                      }}
                    >
                      {
                        Platform.OS =='ios'
                        ?<CustomImageIOS
                          uri={node.image.uri}
                        />
                        :
                        <CustomImageAndroid
                          uri = {node.image.uri}
                        />
                      }
                    </TouchableOpacity>
                  )
                )
              }
            </View>
          </View>
          </ScrollView>
        )
      }
   
  </View>
    }
    </SafeAreaView>
  );
};

export default PhotoScreen;