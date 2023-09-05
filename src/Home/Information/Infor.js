import { StyleSheet, Text, View, TextInput, TouchableOpacity,  Image, ScrollView } from 'react-native'
import { React, useState, useEffect, useRef } from 'react'
import styles from './StyleInfor'
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import AddInfor from './AddInfor.js';
import { firestore } from '../../../Confige.js'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { collection, getDocs } from 'firebase/firestore';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import ViewBaiViet from './ViewBaiViet';
import ViewVideo from './ViewVideo';

const Tab = createMaterialTopTabNavigator();

const Infor = ({ navigation }) => {

  // lấy dữ liệu databse  từ chương firebase 
  const [dataUser, setData] = useState({});
  useEffect(() => {
    const fectData = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'user'));
        querySnapshot.forEach((doc) => {
          setData(doc.data());
        });
      } catch (error) {
        console.log(error)
      }
    }
    fectData();
  }, [])
  // tao buttuon tab
  return (
    
    <CollapsibleTabView style={{ flex: 1 }}>
      <View style={styles.header}>
        <Image
          source={{ uri: dataUser.userphoto }}
          style={{
            width: '100%',
            height: 200,
          }}
        >
        </Image>
        <TouchableOpacity style={{
          position: 'absolute',
          top: 50,
          right: 10,
        }}>
          <AntDesign name="setting" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.canhan}>
          <Image
            source={{ uri: dataUser.userphoto }}
            style={{
              width: 80,
              height: 80,
              borderRadius: 80,
            }}
          >
          </Image>
          <View style={{ marginLeft: 15 }}>
            <Text style={{ fontSize: 25, color: 'white', fontWeight: '900' }}>{dataUser.taikhoan}</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ThemInfor');
            }}
            style={{
              position: 'absolute',
              width: 150,
              height: 30,
              borderRadius: 15,
              backgroundColor: '#0066FF',
              right: -180,
              top: 50,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text>Chỉnh sửa cá nhân </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
      </View>
      <Tab.Navigator>
        <Tab.Screen name="ViewBaiViet" component={ViewBaiViet} />
        <Tab.Screen name="ViewVideo" component={ViewVideo} />
      </Tab.Navigator>
    </CollapsibleTabView>
  )
}
export default Infor;
// const Infor = () => {

//   const ThemInfor = ({ navigation }) => {
//     return (
//       <View style={{ flex: 1 }}>
//         <View style={styles.header}>
//           <View style={styles.headerBody}>
//             <TouchableOpacity style={styles.shop}>
//               <Text>Xem shop</Text>
//             </TouchableOpacity>
//             <View style={styles.setting}>
//               <TouchableOpacity>
//                 <AntDesign name="setting" size={24} color="white" />
//               </TouchableOpacity>
//               <TouchableOpacity>
//                 <AntDesign name="shoppingcart" size={24} color="white" />

//               </TouchableOpacity>
//               <TouchableOpacity>

//                 <FontAwesome5 name="facebook-messenger" size={24} color="black" />
//               </TouchableOpacity>
//             </View>
//           </View>

//           <View style={styles.canhan}>
//             <View style={{ backgroundColor: 'white', width: 70, height: 70, borderRadius: 30, marginLeft: 20 }}></View>
//             <View style={{ marginLeft: 15 }}>
//               <Text style={{ fontSize: 20, color: 'black' }}>name</Text>
//               <TouchableOpacity style={{ padding: 4, width: 92, backgroundColor: '#CFCFCF', alignItems: 'center', borderRadius: 5 }}>
//                 <Text>thành viên </Text>
//               </TouchableOpacity>
//               <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 200 }}>
//                 <Text style={{ color: 'white' }}>0 theo dõi</Text>
//                 <Text style={{ color: 'white' }}>|</Text>
//                 <Text style={{ color: 'white' }}>1 nguoi theo dõi</Text></View>

//             </View>
//           </View>
//         </View>


//         <View style={styles.body}>
//           <View style={{ justifyContent: 'space-around', flexDirection: 'row' }}>
//             <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 4, flex: 1 }}>
//               <View style={{ flexDirection: 'row', flex: 1 }}>
//                 <FontAwesome name="newspaper-o" size={24} color="black" />
//                 <Text>    đơn hàng</Text>
//               </View>

//             </TouchableOpacity>
//             <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 4, flex: 1 }}>
//               <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-end' }}>
//                 <Text>  lịch sư mua hàng</Text>
//                 <AntDesign name="right" size={24} color="black" />
//               </View>
//             </TouchableOpacity>
//           </View>

//           <View style={styles.donhang}>
//           </View>
//           <TouchableOpacity
//             onPress={() => {
//               navigation.navigate('ThemInfor');
//             }}
//             style={styles.themThongTin}>
//             <Ionicons name="add" size={24} color="black" />
//             <Text>Thêm thông tin cá nhân </Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     )
//   }

//   return (
//     <Stack.Navigator
//       initialRouteName="ThemInfor"
//       screenOptions={{ headerShown: false }}
//     >
//       <Stack.Screen
//         name='ThemInfor'
//         component={ThemInfor}

//       />
//       <Stack.Screen

//         name='AddInfor'
//         component={AddInfor}
//       />


//     </Stack.Navigator>

//   )

// }
// export default Infor;
