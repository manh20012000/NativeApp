 import { StyleSheet, Text, View } from 'react-native'
 import React from 'react'
 const styles = StyleSheet.create({
      container:{
        flex:1,
      },
      header:{
           flex:0.2,
            justifyContent:'center',
            alignItems:'center',
      },
      font:{
           fontSize:40,
           fontWeight:'900'
      },
      image:{
          width:100,
          height:100,
      },
      body:{
        flex:0.6,
      },
      bodycon:{
          marginHorizontal:'10%',
          marginVertical:'20%'
      },
      IuserName:{
        width:"100%",
        height:50,
        flexDirection:'row',
        alignItems:'center',
        borderBottomWidth:2,
      },
      IPass:{
        marginTop:20
      },
      textinput:{
         marginLeft:'3%',
         fontSize:18,
        width:200,
       
      },
      eye:{
          marginLeft:50
      },
       button:{
           marginTop:'4%',
    
            width:'100%',
           height:'18%',
       },
       linagradine:{
             flex:1,
            borderRadius:10,
            justifyContent:'center',
            alignItems:'center',
       },
       btnTxt:{
          fontSize:24,
           fontWeight:'bold',
       },
       ViewIcon:{
              
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginTop:'10%'
  },
  icon:{
       width:54,
       height:54,
       borderRadius:40,
       backgroundColor:'pink',
       justifyContent:'center',
       alignItems:'center',
       marginHorizontal:5
  },
  labelwith:{
   fontSize:15
  },
      flooter:{
         flex:0.2,
      
      }
    
})
  export default styles;
