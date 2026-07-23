import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

  const BottomSheetThink=()=>{
  return (
    <BottomSheet
                  visible={visible}
                  //setting the visibility state of the bottom shee
                  //Toggling the visibility state on the click of the back botton
                  onBackdropPress={bootomShetShare}
                  //Toggling the visibility state on the clicking out side of the sheet
                >
                  {/*Bottom Sheet inner View*/}
                  <View style={{ flex: 0.6, backgroundColor: "white" }}>
                    <Text
                      style={{
                        textAlign: "center",
                        padding: 20,
                        fontSize: 20,
                      }}
                    >
                      Cảm xúc
                    </Text>
                    {/* <ScrollView style={{ backgroundColor: "red" }}> */}
                      <TouchableOpacity
                        onPress={() => {
                          setFell(" -Đang cảm thấy vui vẻ");
                          setVisible(!visible);
                        }}
                        style={{
                          width: "100%",
                          height: "10%",
                          backgroundColor: "pink",
                          justifyContent: "center",
                          alignItems: "center",
                          borderWidth: 1,
                        }}
                      >
                        <Text>Đang cảm thấy vui vẻ</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() => {
                          setFell(" -Đang cảm thấy buồn😒😒");
                          setVisible(!visible);
                        }}
                        style={{
                          width: "100%",
                          height: "10%",
                          backgroundColor: "pink",
                          justifyContent: "center",
                          alignItems: "center",
                          borderWidth: 1,
                        }}
                      >
                        <Text>Đang cảm thấy buồn</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          setFell(" -Đang cảm thấy may mắn😂😂");
                          setVisible(!visible);
                        }}
                        style={{
                          width: "100%",
                          height: "10%",
                          backgroundColor: "pink",
                          justifyContent: "center",
                          alignItems: "center",
                          borderWidth: 1,
                        }}
                      >
                        <Text>Đang cảm thấy may mắn</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          setFell(" -Đang cảm thấy hạnh phúc😍😍");
                          setVisible(!visible);
                        }}
                        style={{
                          width: "100%",
                          height: "10%",
                          backgroundColor: "pink",
                          justifyContent: "center",
                          alignItems: "center",
                          borderWidth: 1,
                        }}
                      >
                        <Text>Đang cảm thấy hạnh phúc</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          setFell(" -Đang cảm thấy bực mình😒😒");
                          setVisible(!visible);
                        }}
                        style={{
                          width: "100%",
                          height: "10%",
                          backgroundColor: "pink",
                          justifyContent: "center",
                          alignItems: "center",
                          borderWidth: 1,
                        }}
                      >
                        <Text>Đang cảm thấy bực mình</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          setFell(" -Đang cảm thấy đáng yêu 😊😊");
                          setVisible(!visible);
                        }}
                        style={{
                          width: "100%",
                          height: "10%",
                          backgroundColor: "pink",
                          justifyContent: "center",
                          alignItems: "center",
                          borderWidth: 1,
                        }}
                      >
                        <Text>Đang cảm thấy bực mình😊😊</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          setFell(" -Đang cảm thấy nhớ nhà");
                          setVisible(!visible);
                        }}
                        style={{
                          width: "100%",
                          height: "10%",
                          backgroundColor: "pink",
                          justifyContent: "center",
                          alignItems: "center",
                          borderWidth: 1,
                        }}
                      >
                        <Text>Đang cảm thấy nhớ nhà</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          setFell(" -Đang cảm thấy đáng ❤️😍");
                          setVisible(!visible);
                        }}
                        style={{
                          width: "100%",
                          height: "10%",
                          backgroundColor: "pink",
                          justifyContent: "center",
                          alignItems: "center",
                          borderWidth: 1,
                        }}
                      >
                        <Text>Đang cảm thấy đáng yêu❤️💕</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          setFell(" -Đang cảm thấy đáng cute ❤️😍");
                          setVisible(!visible);
                        }}
                        style={{
                          width: "100%",
                          height: "10%",
                          backgroundColor: "pink",
                          justifyContent: "center",
                          alignItems: "center",
                          borderWidth: 1,
                        }}
                      >
                        <Text>Đang cảm thấy đáng cute❤️💕</Text>
                      </TouchableOpacity>
                    {/* </ScrollView> */}
                  </View>
                </BottomSheet>
                <BottomSheet
                  visible={visible2}
                  //setting the visibility state of the bottom shee
                  //Toggling the visibility state on the click of the back botton
                  onBackdropPress={bootomShetShare2}
                  //Toggling the visibility state on the clicking out side of the sheet
                >
                  <DistrictScreen onValueChange={handleValueChange} />
                </BottomSheet>
  )
}
export default BottomSheetThink;
const styles = StyleSheet.create({})