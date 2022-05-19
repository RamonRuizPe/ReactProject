import React from 'react'
import { TouchableOpacity, StyleSheet, Text, View, Dimensions } from 'react-native';
import colors from '../constants/colors';
import fonts from '../constants/fonts';

const {width} = Dimensions.get("screen")
const setWidth = (w) => (width/100) * w

const GenreCard = ({genreName, active, onPress}) => {
  return (
    <TouchableOpacity 
    style={[styles.container, {backgroundColor: active ? colors.ACTIVE : colors.WHITE}]}
    activeOpacity={0.5}
    onPress={() => onPress(genreName)}>
    <Text style={[styles.genreText, {color: active ? colors.WHITE : colors.BLACK}]}>{genreName}</Text>
  </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
      justifyContent:"center",
      alignItems: "center",
      borderRadius: 5,
      paddingVertical: 8,
      elevation: 3,
      marginVertical: 2,
      width: setWidth(25),
    //   backgroundColor: active ? colors.ACTIVE : colors.WHITE
    },
    genreText: {
        fontSize: 18,
        color: colors.ACTIVE,
        fontFamily: fonts.Akshar_Medium,
    }
  });

export default GenreCard