import { StyleSheet, Text, View, FlatList, Item, TextInput, ScrollView, TouchableOpacity, } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';




const Timkiem=({  navigation})=>{
  return (
    <View style={styles.contain}>

       <View style={{flexDirection:'row',alignItems:'center',marginHorizontal:5}}> 
       <TouchableOpacity
         onPress={()=>{
            navigation.navigate('BootonGate')
   }}
       >
        
        <Ionicons name="arrow-back-sharp" size={24} color="black" />
        </TouchableOpacity>
       
        <View   style={{
        width: 340, backgroundColor: 'white', margin: 10, borderRadius: 40,
        padding: 8, flexDirection: 'row',
        justifyContent: 'space-between'         
      }}
      >
            <TextInput 
                 placeholder='Nhập tìm kiếm'
            />
             <Feather name="search" size={24} color="black" />
        </View></View>
       
    </View>
  )
}
export default Timkiem;
const styles = StyleSheet.create({
    contain:{
        flex:1,
        marginTop:30,
    }
})