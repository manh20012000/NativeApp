import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const styles = StyleSheet.create({
    contain:{
        backgroundColor:'#DDDDDD',
        flex:1,
        width:'100%',
        height:"100%",
        marginTop:7,
       
    },
    title:{
        fontSize:25,
        fontWeight:'900',
        
    },
    bodyView:{
          width:400,
           height:450,

    }, 
    bodyView2:{
       marginHorizontal:20,
       justifyContent:'space-between',
       flexDirection:'row',
    },
    titleTxt:{
        fontSize:17,
        fontWeight:'500'
    },
    detail:{
          right:15,
        backgroundColor:'white',
        width:105,
        height:30,
        alignItems:'center',
        borderRadius:20,
    }
})
export default styles;