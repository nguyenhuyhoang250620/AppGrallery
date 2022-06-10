import { 
  StyleSheet, 
  Text, 
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Platform
} from 'react-native'
import React,{useState,useEffect} from 'react'
import CustomButtonAddAlbum from '../../components/CustomButtonAddAlbum'
import CustomViewAdd from '../../components/CustomViewAdd'
import CustomViewChoose from '../../components/CustomViewChoose'
import CustomViewAlbum from '../../components/CustomViewAlbum'
import CameraRoll, { getAlbums } from '@react-native-community/cameraroll'
import CustomImageIOS from '../../components/CustomImageIOS'
import CustomImageAndroid from '../../components/CustomImageAndroid'



const AlbumScreen = () => {
  const [data,setData] =useState([])
  const [show,setShow] = useState(false)
  const [show_img,setShow_Img] = useState(false)
  const [show_chose,setShow_chose] = useState(false)
  const [id_album,setId_album] = useState()
  const [name_album,setname_album] = useState()
  const [album_imgs,setalbum_imgs] = useState([])
  const [avatar,setAvatar] = useState([])
  const [count,setCount] = useState()
  var arr = []
  
  useEffect(()=>{
    getAlbums()
  },[])
  
  const Send = childdata => {
    setShow(childdata)
  };
  const Send_album = childdata =>{
    setShow_Img(childdata)
  }
  const SaveCallBack = childdata=>{
    setShow_chose(childdata)
  }
  const SaveCallBacks = childdata=>{
    setShow_chose(childdata)
  }
  const album_img =childdata=>{
    setalbum_imgs(childdata)
  }

  const Text_album = childdata=>{
    console.log(childdata)
    setname_album(childdata)
    const todo ={
      id:Math.random(),
      title:childdata,
      count:2,
      img:album_imgs
    }
    
    
    setData([...data,todo])
  }
 
  const getAlbums = async()=>{
    const album = await CameraRoll.getAlbums({assetType:"Photos"})
    // console.log(album)
    
    getPhotos(album)
   

  }
  const getPhotos =(album)=>{
    album.map(async doc=>{
      const photos = await CameraRoll.getPhotos({
        first:1,
        groupName:doc.title,
        groupTypes:"Library"
      }) 
      photos.edges.map( item=>{ 
        // console.log(item.node.image.uri)  
        // console.log(doc.title)
        // console.log(doc.count)
        
        var todo ={
          id:Math.random(),
          title:doc.title,
          count:doc.count,
          uri:item.node.image.uri
        }
        arr.push(todo)
        if(arr.length==album.length){
          setData(arr)
        }
      })
      // console.log(data)
    })
    
    
   
       
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={[styles.container,{flexWrap:"wrap",flexDirection:"row"}]}>
          {
            data.map((item,index)=>(
              <View key={index} style={{padding:10}}>
                <TouchableOpacity
                  onPress={()=>{
                    setShow_Img(true)
                    setId_album(index)
                    setname_album(item.title)
                    console.log(item)
                  }}
                >
                  {
                    Platform.OS=="ios"
                    ? <CustomImageIOS borderRadius={15} uri={item.uri} />
                    : <CustomImageAndroid borderRadius={15} uri={item.uri} />
                  }
                  
                  <Text numberOfLines={2} style={{width:100,textAlign:"center",paddingTop:4,fontSize:15,fontWeight:"bold"}}>{item.title}</Text>
                  <Text style={{fontSize:12,color:"grey",textAlign:"center"}}>{item.count}</Text>
                </TouchableOpacity>
              </View>
            ))
          }
          
        </View>
      </ScrollView>
      <CustomButtonAddAlbum onPress={()=>setShow(!show)}/>
      {
        show_chose&&
        <CustomViewChoose parencallbacks={SaveCallBacks} album_img={album_img} name_album={name_album}  />
      }
      {
        show_img&&     
          <CustomViewAlbum parencallback={Send_album} id_album={id_album} name_album={name_album} album_imgs={album_imgs}/>
      }
      {
        show&&
        <CustomViewAdd parentCallback={Send} SaveCallBack={SaveCallBack} text_album_callback={Text_album} name_album={name_album}/>
      }
    </SafeAreaView>
  )
}

export default AlbumScreen

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#F8F8F8",
  },
  container_album:{
    height:100,
    width:100,
    borderRadius:15
  },
  
})