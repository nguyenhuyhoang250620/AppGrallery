
import React, { useEffect, useState,useRef } from 'react';
import {
  PermissionsAndroid,
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  Platform,
  ActivityIndicator,
  Dimensions,
  Animated,
  FlatList,
  SectionList
} from 'react-native';

import CameraRoll from '@react-native-community/cameraroll';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/Ionicons'
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
  const [id,setId] = useState('')
  const toggle = useRef(new Animated.Value(0)).current
  const [date,setDate] = useState([])
  const [tong,setTong] = useState([])

  const showdelete=(check)=>{
    check?
    Animated.timing(toggle,{
      duration:200,
      useNativeDriver:false,
      toValue:50
    }).start()
    :
    toggle.setValue(0)
    
  }
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
  useEffect(()=>{
    getPhotos()
    console.log("haong")
  },[isload])
  

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
      first: 76,
    }) 
    setNodes(sortTime(photos.edges.map(edge => edge.node)))
    var arr = []
    photos.edges.map(item=>{
      arr.push(changeTime(item.node.timestamp))
    })
    setDate(unique_arr(arr))
    var chose = photos.edges.map(doc=>doc.node)
    var all = []
    date.forEach(doc=>{
      var choses = []
      chose.map(item=>{
        if(changeTime(item.timestamp)===doc){
          choses.push(item.image.uri)
        } 
      })
      var a = {
        title:doc,
        data:[choses]
      }
      all.push(a)
    })
    setTong(all)
    setIsload(false)
  }
  const changeTime = (timestamp)=>{
    const date = new Date(timestamp*1000).getUTCFullYear()
    return date;
  }
  const changeTimeYear = (timestamp)=>{
    const month = new Date(timestamp*1000).getMonth()+1
    return month
  }
 
  const sortTime=(arr)=>{
    arr.sort((a, b) => (a.timestamp < b.timestamp) ? 1 : -1)
    return arr
  }

  const unique_arr=(arr)=> {
    let newArr = arr.reduce(function (accumulator, element) {
        if (accumulator.indexOf(element) === -1) {
            accumulator.push(element)
        }
        return accumulator
    }, [])
    return newArr
  }

  const deletes =(id)=>{
    console.log(tong)
    CameraRoll.deletePhotos([id]).
    then(()=>{
      setNodes(nodes.filter(item => item.image.uri!== id))
      showdelete(false)
    })
    
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
  const renderItem =({item})=>{
    return(
      <FlatList
        data={item}
        keyExtractor={(item,index)=>index.toString()}
        renderItem={renderItem2}
        numColumns={4}
      />
    )
}
  const renderItem2 =({item,index})=>{
      return(
        <TouchableOpacity
              key={index}
              onPress={() => {
                setDetailViewVisibility(true)
                getTime(index)
                setSelectedIndex(index)                           
              }}
              onLongPress={()=>{
                showdelete(true)
                // console.log(item.image.uri)
                setId(item)
              }}
            >
              {
                Platform.OS =='ios'
                ?<CustomImageIOS
                  uri={item}
                />
                :
                <CustomImageAndroid
                  uri = {item}
                />
              }
        </TouchableOpacity>
      )
  }


  
  return (
    <SafeAreaView style={{flex:1,backgroundColor:"white"}}>
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
                getTime(item)
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
          <SectionList
            sections={tong}
            keyExtractor={(item, index) => item + index}
            renderItem={renderItem}
            stickySectionHeadersEnabled={false}
            renderSectionHeader={({ section: { title } }) => (
              <View>
                <Text style={{padding:10,color:"black",fontWeight:"600"}}>year {title}</Text>
              </View>
            )}
          />
        )
      }
   
  </View>
    }
    <Animated.View style={{height:toggle,width:"100%",backgroundColor:"white",justifyContent:"space-between",alignItems:"center",paddingHorizontal:10,flexDirection:"row",borderTopWidth:0.5,borderTopColor:"#E0E0E0"}}>
      <TouchableOpacity
        onPress={()=>{
          deletes(id)
        }}
      >
        <Icon
          name='trash-outline'
          size={22}
          color="black"
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={()=>{
          showdelete(false)
        }}
      >
        <Icon
          name='close-outline'
          size={22}
          color="black"
        />
      </TouchableOpacity>
    </Animated.View>
    </SafeAreaView>
  );
};

export default PhotoScreen;