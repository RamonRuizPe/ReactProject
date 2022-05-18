import React, {useState} from "react";
import {View,Text,StyleSheet,Image,TouchableOpacity, TouchableNativeFeedbackBase} from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler";
import COLORS from "../constants/colors"
import {Ionicons} from "@expo/vector-icons"
import fonts from "../constants/fonts";
import IMAGES from "../constants/Images"

const MovieCard = () =>{
        const[liked,setLiked] =useState(false)
    return(
    <TouchableOpacity>
    <View style={styles.container}>
        <View style={styles.imdbContainer}>
            <Image source={IMAGES.IMDB} style={styles.imdbImage}></Image>
            <Text style={styles.imdbRating}>9.4</Text>
        </View>
        <TouchableNativeFeedback onPress={()=> setLiked(!liked)}>
        <Ionicons 
            ame={liked ? "heart":"heart-outline"} 
            size={25} 
            color={liked ? COLORS.HEART : COLORS.WHITE} 
            style={{position: "absolute", bottom:10,left: 10}}
            />
        </TouchableNativeFeedback>
    </View>
    <View>
        <Text style={styles.movieTitle} numberOfLines={2}>URI - Surgical Strike</Text>
        <View style={styles.movieSubTitleContainer}>
            <Text style={styles.movieSubTitle}>English | (U/A)</Text>
            <View style={styles.rowAndCenter}>
            <Ionicons 
            ame="heart" 
            size={17} 
            color={COLORS.HEART} 
            style={{marginRight:5}}
            />
            <Text style={styles.movieSubTitle}>90%</Text>
          </View>
        </View>
    </View>
    </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container:{
        backgroundColor: COLORS.ACTIVE,
        height: 340,
        width: 230,
        borderRadius: 12,
        elevation: 5,
        marginVertical:2,
    },
    movieTitle:{
        fontFamily: fonts.Koulen,
        color: COLORS.GRAY,
        paddingVertical:2,
        marginTop:5,
        width: 230,
    },
    movieSubTitleContainer:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent: "space-between"
    },
    movieSubTitle:{
        fontSize: 12,
        fontFamily: fonts.Koulen,
    },
    rowAndCenter:{
        flexDirection:"row",
        alignItems: "center"
    },
    imdbContainer:{
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-end",
        backgroundColor: COLORS.YELLOW,
        borderBottomLeftRadius: 5,
        borderTopRightRadius:12,
        paddingVertical:3,
    },
    imdbImage: {
        height: 20,
        width: 50,
        borderBottomLeftRadius:5
    },
    imdbRating: {
        marginRight:5,
        color: COLORS.HEART,
        fontFamily: fonts.Koulen,

    }
});

export default MovieCard