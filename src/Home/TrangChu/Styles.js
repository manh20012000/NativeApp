import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const styles = StyleSheet.create({
          timkiem:{
            borderBottomWidth:2,
            justifyContent:'space-between',
            flexDirection:'row',
            padding:10,
          }
          ,body:{
            marginTop:6,
            flex:1,
            backgroundColor:'pink'
          },
          anhBiaf:{
            width:'100%',
            backgroundColor:'white',
            height:200,
            justifyContent:'center',
            alignItems:'center'
          },
          giaBan:{
            backgroundColor:'orange',
            width:'100%',
            height:40,
            flexDirection:'row',
            alignItems:'center',justifyContent:'space-around'
          },
          QuangCao:{
            width:'100%',
            height:120,
            backgroundColor:'white',
         },cmt:{
            width:'100%',
            flexDirection:'row',
             justifyContent:'space-between',
             borderWidth:2,
             height:53,
             borderColor:'orange',
             backgroundColor:'white',
             padding:4,
         },canhan:{
             flexDirection:'row',
             justifyContent:'space-around',
             alignItems:'center',
             backgroundColor:'#FFFFCC'
         },
         comment:{
          backgroundColor:'white'
         },
         luachon:{
          backgroundColor:'#FF6600',
          padding:10,
         flexDirection:'row',
           
         alignItems:'center',
         }
})
export default styles;