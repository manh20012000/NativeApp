import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const styles = StyleSheet.create({
     container:{
       flex:1,
     
       backgroundColor:'pink'
     },
     body:{
       maginTop:15,
       flex:1,
       backgroundColor:'white'
     },
    
   
     body1:{
       flex:0.08,
      backgroundColor:'red',
      padding:13,
    
     },
     searchInput:{
      backgroundColor:'white',
      margin:15,
      width:350,
      height:45,
      borderWidth:2,
      borderRadius:50,
      flexDirection:'row',
       alignItems:'center'

     },
     TxtInput:{
      fontSize:20,
       width:270,
       marginLeft:10,

     },
     Touchsearch:{
      marginLeft:15,
     },
    //  option:{
    //     flexDirection:'row',
    //     justifyContent:'space-between',
    //     marginHorizontal:30
    //  }
     
    
    })
    export default styles;