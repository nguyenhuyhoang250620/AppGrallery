import { 
    StyleSheet, 
    Text, 
    View,
    Animated,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Keyboard
} from 'react-native'
import React,{useRef,useState} from 'react'


const CustomViewAdd = (props) => {
    const [colors,setColors] = useState(false)
    const [show,setShow] = useState(false)
    const [txt_album,setTxt_album] = useState()
    const toggle = useRef(new Animated.Value(0)).current
    Animated.timing(toggle,
        {
            useNativeDriver: false,
            toValue:300,
            duration:200
        }).start()
    const sendState =()=>{
        props.parentCallback(false)
    }
   
    const SaveAsync = async()=>{
        if(colors==true){
            props.SaveCallBack(true)
            props.parentCallback(false)
            Keyboard.dismiss()
            setShow(true)
        }
        props.text_album_callback(txt_album)
        
    }
  return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <Animated.View style={[styles.container,{height:toggle}]}>
            <View style={{flex:1}}>
                <View style={{
                    height:"30%",
                    justifyContent:"center",
                    alignItems:'center'
                    }}>
                    <Text style={{fontSize:20,fontWeight:"bold"}}>Album mới</Text>
                </View>
                <View style={{height:"40%",justifyContent:"center"}}>
                    <TextInput
                        placeholder='Nhập tên album'
                        style={{borderBottomWidth:1,marginHorizontal:30,padding:10}}
                        autoFocus={true}
                        onChangeText={(text)=>{
                            setTxt_album(text)
                            if(text === ""){
                                setColors(false)
                            }else{
                                setColors(true)
                            }
                        }}
                    />
                </View>
                <View style={{flexDirection:"row",width:"100%",height:"30%"}}>
                    <TouchableOpacity style={{
                        width:"50%",
                        justifyContent:"center",
                        alignItems:"center"
                        }} onPress={sendState}>
                        <Text style={{fontSize:17,color:"green",fontWeight:"500"}}>Hủy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    onPress={SaveAsync}
                    style={{
                        width:"50%",
                        justifyContent:"center",
                        alignItems:"center"
                        }}>
                        <Text style={{fontSize:17,color:colors ? "green" : "grey"}}>Lưu</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </Animated.View>
        </KeyboardAvoidingView>
  )
}

export default CustomViewAdd

const styles = StyleSheet.create({
    container:{
        width:"100%",
        backgroundColor:"white"
    },

})