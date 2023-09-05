import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, TextInput } from 'react-native'

import { React, useState } from 'react'
import DataOjs from '../../../Data/DataObj'
import { Feather } from '@expo/vector-icons';
const Chat = ({ navigation }) => {
  const data2 = DataOjs
  const [Seach, setSeach] = useState('')
  const [filter, setFillter] = useState(data2)
  const handlerSearch = (text) => {
    setSeach(text)
    const filterData = data2.filter(value =>
      value.titleNameName.toLowerCase().includes(text.toLowerCase())
    )
    setFillter(filterData);
  }
  const [data, setData] = useState(DataOjs);
  const str = () => {
    return (
      <View style={{
        width: 40, height: 40, borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        marginRight: 4,
        backgroundColor: 'white',
        marginTop: 10,
      }}>
        <TouchableOpacity>
          <Text style={{}}>+</Text>
        </TouchableOpacity>

      </View>
    )
  }
  const seach = () => {
    return (
      <View>
        <View style={{
          justifyContent: 'center',
          flexDirection: 'row',
          alignItems: 'center',
        }}>

          <View style={{
            width: 350,
            backgroundColor: 'white',
            marginRight: 15,
            borderRadius: 40,
            padding: 8,
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
          >
            <TextInput
              style={{ width: 300 }}
              placeholder='nhâp tìm kiếm'
              value={Seach}
              onChangeText={handlerSearch}
            ></TextInput>
            <TouchableOpacity>
              <Feather name="search" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{

          width: '100%',
          height: 70,
          marginTop: 5,
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 10
        }}>
          <FlatList
            ListHeaderComponent={str}
            horizontal
            data={data2}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                >
                  <View style={{ justifyContent: 'flex-end' }}>
                    <Image source={{ uri: item.avatar }}
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: 34, marginHorizontal: 6,
                        marginLeft: 15
                      }} >
                    </Image >
                    <Text style={{
                            color: '#00FF00', fontSize: 60,
                            position: 'absolute',
                            left: 35,
                            bottom:10,
                        }}>{item.trangthai}</Text>
                    <Text style={{
                      color: 'white',
                      width: 40, fontSize: 10,
                      height: 25, marginLeft: 10,
                      textAlign: 'center'
                    }}>{item.titleNameName}</Text>
                  </View>

                </TouchableOpacity>

              )
            }
            }

          />

        </View>
      </View>
    )
  }
  const DetaiHandress = () => {
    props.navigation.navigate('SeeDeTail', props.item);
  }
  return (
    <View style={{ backgroundColor: 'black', flex: 1 }}>
      <FlatList style={{ marginTop: 5 }}
        ListHeaderComponent={seach}
        data={filter}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity style={{
              marginTop: 5,
              marginHorizontal: 16,
              width: '90%',
              height: 80,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
              onPress={() => {
                navigation.navigate('PesionChat', item)
              }}
            >
              <View style={{ flex: 0.3 }}>
                <View  style={{position: 'relative'}}>
                  <Image source={{ uri: item.avatar }}
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: 64, marginHorizontal: 6,
                    }} >
                  </Image >
                  <Text style={{
                            color: '#00FF00', fontSize: 70,
                            position: 'absolute',
                            right: 30,
                            bottom:-14
                        }}>{item.trangthai}</Text>
                </View>
              </View>
              <View style={{ flex: 0.7 }}>
                <Text style={{
                  fontSize: 19, color: 'white',
                  fontWeight: '800',
                }}>
                  {item.titleNameName}</Text>
                <Text style={{ color: 'white', }}>{item.mess}</Text>
              </View>
            </TouchableOpacity>

          )
        }}


      >
      </FlatList>

    </View>
  )

}
export default Chat
const styles = StyleSheet.create({
  header: {
    width: '100%',
    justifyContent: 'center',
    height: '8%',
    backgroundColor: 'black',
    flex: 0.08,
    flexDirection: 'row'


  }
})