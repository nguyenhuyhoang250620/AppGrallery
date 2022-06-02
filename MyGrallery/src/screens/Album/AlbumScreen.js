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
  const Send = childdata => {
    setShow(childdata)
    const todo ={
      id:2,
      title:"them",
      amount:9,
      img:[]
    }
    setData([...data,todo])
  };
  const Send_album = childdata =>{
    setShow_Img(childdata)
  }
  const SaveCallBack = childdata=>{
    setShow_chose(childdata)
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={[styles.container,{flexDirection:"row",flexWrap:"wrap"}]}>
          {
            data.map((item,index)=>(
              <View key={index} style={[styles.container,{alignItems:"flex-start",padding:10}]}>
                <TouchableOpacity
                  onPress={()=>setShow_Img(true)}
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
        <CustomViewChoose/>
      }
      {
        show_img&&     
          <CustomViewAlbum parencallback={Send_album}/>
      }
      {
        show&&
        <CustomViewAdd parentCallback={Send} SaveCallBack={SaveCallBack}/>
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