import { 
    Animated,
    Image,
    PermissionsAndroid,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    View,
    Text,
    Platform,
    ActivityIndicator 
    } from 'react-native'
import React,{useRef,useEffect,useState} from 'react'
import CameraRoll from '@react-native-community/cameraroll';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/Ionicons'
import CustomImageIOS from '../components/CustomImageIOS'
import CustomImageIOSView from '../components/CustomImageIOSView'
import CustomImageAndroid from './CustomImageAndroid';

Icon.loadFont();

const CustomViewAlbum = (props) => {
    const toggle = useRef(new Animated.Value(0)).current   
    Animated.timing(toggle,{
        useNativeDriver:false,
        toValue:1,
        duration:200
    }).start()

  const [nodes, setNodes] = useState([]);
  const [detailViewVisible, setDetailViewVisibility] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [time,setTime] = useState([])
  const [isload,setIsload] = useState(true)

  useEffect(() => {
    if(Platform.OS === 'android'){
      checkPermission()
      .then(() => {
        getPhotos()
      })
    }else{
      getPhotos()
    }
    console.log(props.length_album)
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
          first: 500,
          groupName:props.name_album,
          groupTypes:"Library"
        })
        setNodes(photos.edges.map(edge => edge.node))
        console.log(nodes)
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
  const sendExit = ()=>{
    props.parencallback(false)
  }
  return (
    <Animated.View style={{
        height:toggle.interpolate({
            inputRange:[0,1],
            outputRange:["0%","100%"]
        }),
        width:toggle.interpolate({
            inputRange:[0,1],
            outputRange:["0%","100%"]
        }),
        backgroundColor:"white"
    }}>
       <SafeAreaView style={{flex:1}}>
            <View style={{
                height:"10%",
                flexDirection:"row",
                alignItems:"center",
                padding:10
            }}>
                <TouchableOpacity
                    onPress={sendExit}
                >
                    <Icon
                        name='arrow-back-outline'
                        size={22}
                        color="black"
                    />
                </TouchableOpacity>
                <View style={{paddingHorizontal:20}}>
                    <Text style={{fontSize:16,fontWeight:"bold"}}>{props.name_album}</Text>
                    <Text style={{fontSize:12,color:"grey"}}>{props.length_album}</Text>
                </View>
            </View>
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
                                <CustomImageIOSView
                                    uri={node.image.uri}
                                />
                                 
                            
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
                    {
                        nodes.map((item,index)=>(
                            <View
                                key={index}
                                style={{
                                flex: 1,
                                flexDirection:"row"
                                }}
                            >
                                <TouchableOpacity

                                    style={{
                                    height: 100,
                                    width: 100,
                                    maxWidth:100,
                                    flex: 1,
                                    padding:10,
                                    marginVertical:10,
                                    
                                    }}
                                    onPress={() => {
                                    setDetailViewVisibility(true)
                                    getTime(index)
                                    setSelectedIndex(index)
                                    
                                    }}
                                >
                                    {
                                        Platform.OS=='ios'
                                        ?<CustomImageIOS
                                            uri={item.image.uri}  
                                        />
                                        :
                                        <CustomImageAndroid
                                            uri={item.image.uri}  
                                        />
                                    }
                                    
                                </TouchableOpacity>
                            </View>
                        ))
                    }
                </ScrollView>
                )
            }
   
        </SafeAreaView>
        
    </Animated.View>
  )
}

export default CustomViewAlbum

