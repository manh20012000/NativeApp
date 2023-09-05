import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BottomSheet } from 'react-native-btr';
const BootemSheet = () => {

    const [visible, setVisible] = useState(false);
    const toggleBottomNavigationView = () => {
        //Toggling the visibility state of the bottom sheet
        setVisible(visible);
    };
    return (
        <BottomSheet
            visible={true}
            //setting the visibility state of the bottom shee
            onBackButtonPress={toggleBottomNavigationView}
            //Toggling the visibility state on the click of the back botton
            onBackdropPress={toggleBottomNavigationView}
        //Toggling the visibility state on the clicking out side of the sheet
        >
            <View style={styles.contai}>
                <Text style={{ fontSize: 123 }}>fydwhufbshdbfbsdnb</Text>
                <Text style={{ fontSize: 123 }}>fydwhufbshdbfbsdnb</Text>
                <Text style={{ fontSize: 123 }}>fydwhufbshdbfbsdnb</Text>
                <Text style={{ fontSize: 123 }}>fydwhufbshdbfbsdnb</Text>
                <Text style={{ fontSize: 123 }}>fydwhufbshdbfbsdnb</Text>
            </View>

        </BottomSheet>
    )
}
export default BootemSheet
const styles = StyleSheet.create(
    {
        contai: {
            backgroundColor: '#fff',
            width: '100%',
            height: 250,
            justifyContent: 'center',
            alignItems: 'center',
        }


    })