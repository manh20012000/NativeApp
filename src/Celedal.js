import { StyleSheet, Text, View } from 'react-native'

import React, {useState} from 'react';
import {Calendar, LocaleConfig} from 'react-native-calendars';

const Celedal=()=>{
  return (
    <Calendar
        style={styles.contain}
    onDayPress={day => {
      setSelected(day.dateString);
    }}
    markedDates={{
      [selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
    }}
  />
  )
}
export default  Celedal
const styles = StyleSheet.create({
    contain:{
        borderWidth: 1,
        borderColor: 'gray',
        height: 350
    }
})
