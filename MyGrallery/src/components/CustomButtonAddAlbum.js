import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
Icon.loadFont();


const CustomButtonAddAlbum = (props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <Text style={styles.add}>+</Text>
    </TouchableOpacity>
  )
}

export default CustomButtonAddAlbum

const styles = StyleSheet.create({
    container:{
        position:"absolute",
        bottom:30,
        right:30,
        backgroundColor:"#D8BFD8",
        height:70,
        width:70,
        borderRadius:15,
        justifyContent:"center",
        alignItems:"center"
    },
    add:{
        fontSize:30
    }
})