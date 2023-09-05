import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native'
import React from 'react'

const AddInfor = () => {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ backgroundColor: '#FF6600', flex: 0.14 }}>
      </View> 
     <View style={{width:"100%",height:'20%',justifyContent:'center',alignItems:'center'}}>
              <TouchableOpacity style={{width:100,height:100,borderRadius:100,backgroundColor:'#6C7B8B',justifyContent:'flex-end',alignItems:'center'}}>
                <Text style={{color:'white',fontSize:17}}>sửa</Text>
              </TouchableOpacity>
             </View>
           <View>
        <View style={{ width: "100%", height: '5% ', padding: 4, borderBottomWidth: 2, marginTop: 9, }}>
          <Text style={{ fontSize: 18, marginLeft: 13 }}>
            tên
          </Text>
          <TextInput
            placeholder='nhập vào tên '
            style={{ fontWeight: '500', width: '90%', marginLeft: 13 }}
          >
          </TextInput>
        </View>
        <View style={{ width: "100%", height: '5% ', padding: 4, borderBottomWidth: 2, marginTop: 9 }}>
          <Text style={{ fontSize: 18, marginLeft: 13 }}>
            tên
          </Text>
          <TextInput
            placeholder='nhập vào tên '
            style={{ fontWeight: '500', width: '90%', marginLeft: 13 }}
          >

          </TextInput>
        </View>
        <View style={{ width: "100%", height: '5% ', padding: 4, borderBottomWidth: 2, marginTop: 9 }}>
          <Text style={{ fontSize: 18, marginLeft: 13 }}>
            tên
          </Text>
          <TextInput
            placeholder='nhập vào tên '
            style={{ fontWeight: '500', width: '90%', marginLeft: 13 }}
          >
          </TextInput>
        </View>
        <View style={{ width: "100%", height: '5% ', padding: 4, borderBottomWidth: 2, marginTop: 9 }}>
          <Text style={{ fontSize: 18, marginLeft: 13 }}>
            tên
          </Text>
          <TextInput
            placeholder='nhập vào tên '
            style={{ fontWeight: '500', width: '90%', marginLeft: 13 }}
          >
          </TextInput>
        </View>

      </View>
         <TouchableOpacity style={{justifyContent:'center',height:33,alignItems:'center'}}>
             <Text>Tài khoanr liên kết </Text>
         </TouchableOpacity>
         <View style={{ marginTop: 34, width: '100%', height: 63, paddingHorizontal: 10, flexDirection: 'row', backgroundColor: 'white' }}>
        <TouchableOpacity style={{ flex: 1, backgroundColor: '#F2561D', height: '100%', justifyContent: 'center', alignItems: 'center', marginRight: 5 }}>
          <Text style={{ fontSize: 18 }}> Hủy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ flex: 1, backgroundColor: '#F2561D', height: '100%', justifyContent: 'center', marginLeft: 5, alignItems: 'center', }}>
          <Text style={{ fontSize: 18 }}> Đồng ý</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
export default AddInfor
const styles = StyleSheet.create({
  image: {

    width: '100%',
    alignContent: 'center',
    height: '40%',
    backgroundColor: 'pink',
  }
})