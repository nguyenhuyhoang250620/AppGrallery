import { 
  StyleSheet, 
  Text, 
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity
} from 'react-native'
import React,{useState,useEffect} from 'react'
import CustomButtonAddAlbum from '../../components/CustomButtonAddAlbum'
import CustomViewAdd from '../../components/CustomViewAdd'
import CustomViewChoose from '../../components/CustomViewChoose'
import CustomViewAlbum from '../../components/CustomViewAlbum'



const AlbumScreen = () => {
  const [data,setData] =useState([
    {
      id:1,
      title:"Tat ca",
      amount:6,
      img:[]
    }
  ])
  const [show,setShow] = useState(false)
  const [show_img,setShow_Img] = useState(false)
  const [show_chose,setShow_chose] = useState(false)
  const [id_album,setId_album] = useState()
  const [name_album,setname_album] = useState('')
  const [album_imgs,setalbum_imgs] = useState([])
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
    setname_album(childdata)
    const todo ={
      id:2,
      title:childdata,
      amount:9,
      img:album_imgs
    }
    setData([...data,todo])
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
                  }}
                >
                  <View style={styles.container_album}></View>
                  <Text numberOfLines={2} style={{width:100,textAlign:"center",paddingTop:4,fontSize:15,fontWeight:"bold"}}>{item.title}</Text>
                  <Text style={{fontSize:12,color:"grey",textAlign:"center"}}>{item.amount}</Text>
                </TouchableOpacity>
              </View>
            ))
          }
          
        </View>
      </ScrollView>
      <CustomButtonAddAlbum onPress={()=>setShow(!show)}/>
      {
        show_chose&&
        <CustomViewChoose parencallbacks={SaveCallBacks} album_img={album_img}/>
      }
      {
        show_img&&     
          <CustomViewAlbum parencallback={Send_album} id_album={id_album} name_album={name_album} album_imgs={album_imgs}/>
      }
      {
        show&&
        <CustomViewAdd parentCallback={Send} SaveCallBack={SaveCallBack} text_album_callback={Text_album}/>
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
    backgroundColor:"black",
    opacity:0.6,
    borderRadius:15
  },
  
})