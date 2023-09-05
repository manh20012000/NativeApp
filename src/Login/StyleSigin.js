import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const styles=StyleSheet.create({
    container:{
      flex:1,
      paddingTop:21,
      
        
    },
    header:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    textSig:{
          fontSize:40,
          fontWeight:'800'
    },
    body:{
        flex:2,
        margin:10,
        paddingLeft:25
        
    },
    textinput:{
          fontSize:15,
          fontWeight:'400',
          width:310,
          height:50,
          borderColor:'red',
          borderWidth:2,
         marginTop:4,
         paddingHorizontal:14,

    },
    ViewIcon:{
              
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginTop:'10%'
  }, 
  linagradine:{
    flex:1,
   borderRadius:10,
   justifyContent:'center',
   alignItems:'center',
},  
 button:{
    marginTop:'4%',

     width:310,
    height:55,
    justifyContent:'center'
},
   btnTxt:{
    fontSize:24,
     fontWeight:'bold',
 },  icon:{
    width:54,
    height:54,
    borderRadius:40,
    backgroundColor:'pink',
    justifyContent:'center',
    alignItems:'center',
    marginHorizontal:5
},
checkbox: {
    alignSelf: 'center',
  },

})
 
export default styles