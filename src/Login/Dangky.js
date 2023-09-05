import {
  StyleSheet, Text, View, SafeAreaView, TouchableOpacity,
  TextInput, Form, Button, ScrollView,
} from 'react-native'
import React, { Component, useState, useEffect } from 'react'
import axios from 'axios';
import styles from './StyleSigin.js'

import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { RadioButton } from 'react-native-paper';

const Dangky = ({ navigation }) => {   

  // lấy gtri cua cac o text;
     const [email, setMail] = useState('');
     const [taikhoan, setName] = useState('');
     const [matkhau, setPass] = useState('');
     const [passC, setPassC] = useState('');
     const Sigin=async()=>{

         if(matkhau===passC){
  
       try {
        const data = await axios.post('https://muddy-teddy-fawn.cyclic.app/api/sigin', {taikhoan:taikhoan,matkhau:matkhau,email: email})
          
       
        if(data.status===200){
            navigation.navigate('Login');
            setMail(''),
            setName('');
            setPass(''),
            setPassC('')
         }else{
          alert('dang ky that bai')
         }
  
      } catch (error) {
    console.log(error+'   that bai')
      }
    }else{
      alert('mật khẩu xác nhận ko chính xác')
    }
     
     }
     
  // tao check hien thi với radio button
            const [text, setxt] = useState('ẩn');
      
            const [hienthi, setHienthi] = useState(true);
            const anhien = () => {
              setHienthi(!hienthi);
              // text ?'hiện':'ẩn';
              if(text==='ẩn'){
                setxt('hiện')
              }else{
                setxt('ẩn')
              }
                
            } 
            // (value) => setChecked(value)
    //back   
       const back=()=>{
        navigation.navigate('Login');
       }
  return (

    <View style={styles.container}>
   
    <TouchableOpacity style={{width:60,height:40,borderRadius:10,margin:10,justifyContent:'center'}}
      onPress={back}
    >
       <Text style={{fontSize:40,textAlign:'center'}}> {'<'} </Text>
       
  </TouchableOpacity>
 
      <View style={styles.header}>
       
        <Text style={styles.textSig}>Sigin</Text>

      </View>
          
      <View style={styles.body}>
       
          <TextInput
            placeholder="nhap Email"
            style={[styles.textinput, styles.txt1]}
            keyboardType="email-address"
            value={email}
            onChangeText={setMail}
          />
          <TextInput
            placeholder="nhap tai khoan"
            style={[styles.textinput, styles.txt1]}
             value={taikhoan}
            onChangeText={setName}

          />
          <TextInput
            placeholder="nhap matkhau"
            secureTextEntry={hienthi}
            style={[styles.textinput, styles.txt1]}
            value={matkhau}
            onChangeText={setPass}
          />
          <TextInput
            placeholder="confilm matkhau"
            secureTextEntry={hienthi}
            style={[styles.textinput, styles.txt1]}
            value={passC}
            onChangeText={setPassC}

          />
          <View style={{flexDirection:'row',}}> 
            <RadioButton 
            value=" option1" 
            // status={checked === 'option1' ? 'checked' : 'unchecked'}
            testID="option1RadioButton"
            // onValueChange={radiotxt()}
            onPress={anhien}
            uncheckedColor="gray"
            disabled={false}
            color="blue"/>
            <Text>{text}</Text>
            </View>
         
          
          <TouchableOpacity
            style={styles.button}
            onPress={Sigin}

          >
            <LinearGradient colors={['#faf', '#3b5998', '#192f6a']}
              style={styles.linagradine} >
              <Text style={styles.btnTxt}>Sign</Text>
            </LinearGradient>

          </TouchableOpacity>
          <View style={styles.ViewIcon}>
            <TouchableOpacity style={styles.icon} >
              <FontAwesome5 name="facebook-f" size={34} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon} >
              <AntDesign name="google" size={34} color="red" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon} >
              <AntDesign name="twitter" size={34} color="black" />
            </TouchableOpacity>
          </View>
  
      </View>
   
    </View>
  )
}
export default Dangky;