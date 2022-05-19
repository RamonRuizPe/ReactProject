import React, {useState} from "react";
import 'react-native-gesture-handler';
import {View,Text,StyleSheet,Image,TouchableOpacity, TouchableNativeFeedback} from "react-native"
import colors from "../constants/colors"
import {Ionicons} from "@expo/vector-icons"
import fonts from "../constants/fonts";
import IMAGES from "../constants/Images"

const MovieCard = () =>{
        const[liked,setLiked] = useState(false)
    return(
    <TouchableOpacity>
    <View style={styles.container}>
        <View style={styles.imdbContainer}>
            <Image source={IMAGES.IMDB} style={styles.imdbImage}></Image>
            <Text style={styles.imdbRating}>9.4</Text>
        </View>
        <TouchableNativeFeedback onPress={()=> setLiked(!liked)}>
        <Ionicons 
            name={liked ? "heart":"heart-outline"} 
            size={25} 
            color={liked ? colors.HEART : colors.HEART} 
            style={{position:"absolute", bottom:10,left: 10}}
            // style={styles.heartbottom}
            />
        </TouchableNativeFeedback>
    </View>
    <View>
        <Text style={styles.movieTitle} numberOfLines={2}>URI - Surgical Strike</Text>
        <View style={styles.movieSubTitleContainer}>
            <Text style={styles.movieSubTitle}>English | (U/A)</Text>
            <View style={styles.rowAndCenter}>
            <Ionicons 
            name="heart" 
            size={17} 
            color={colors.HEART} 
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
        backgroundColor: colors.ACTIVE,
        height: 340,
        width: 230,
        borderRadius: 12,
        elevation: 5,
        marginVertical:2,
    },
    movieTitle:{
        fontFamily: fonts.Koulen,
        color: colors.GRAY,
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
        backgroundColor: colors.YELLOW,
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
        color: colors.HEART,
        fontFamily: fonts.Koulen,

    },
    heartbottom:{
        position:"absolute",
        bottom:10,
        left:10
    }
});

export default MovieCard