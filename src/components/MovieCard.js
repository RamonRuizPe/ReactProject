import React, {useState} from "react";
import {View,Text,StyleSheet,Image,TouchableOpacity, TouchableNativeFeedback, ImageBackground} from "react-native"
import colors from "../constants/colors"
import {Ionicons} from "@expo/vector-icons"
import fonts from "../constants/fonts";
import IMAGES from "../constants/Images"
import { getPoster,getLanguage } from "../services/MovieService";

const MovieCard = ({title, poster, language,voteAverage, voteCount, size, heartLess, onPress}) =>{
    const[liked,setLiked] = useState(false)
    const [voteCountValue, setVoteCountValue] = useState(voteCount);

    return(
    <TouchableOpacity activeOpacity={0.8} onPress ={onPress}>
    <ImageBackground 
        style={{...styles.container, width: 230*size, height: 340*size}} 
        imageStyle={{borderRadius: 12,}}
        source={{uri: getPoster(poster)}}
    >
        <View style={{...styles.imdbContainer,paddingVertical: 3*size}}>
            <Image source={IMAGES.IMDB} style={{...styles.imdbImage,height:20*size, width: 50*size }}></Image>
            <Text style={{...styles.imdbRating,marginRight:5*size,fontSize:14*size}}>{voteAverage}</Text>
        </View>
        {!heartLess ?(
            <TouchableNativeFeedback  onPress={() => {
                setLiked(!liked);
                setVoteCountValue(
                  liked ? voteCountValue - 1 : voteCountValue + 1
                );
              }}
            >
            <Ionicons 
                name={liked ? "heart":"heart-outline"} 
                size={25*size} 
                color={liked ? colors.HEART : colors.WHITE} 
                style={{position:"absolute", bottom:10,left: 10}}
                />
            </TouchableNativeFeedback>
        ):null}
    </ImageBackground>
    <View>
        <Text style={{...styles.movieTitle, width:230*size}} numberOfLines={2}>{title}</Text>
        <View style={styles.movieSubTitleContainer}>
            <Text style={styles.movieSubTitle}>{getLanguage(language).english_name}</Text>
            <View style={styles.rowAndCenter}>
            <Ionicons 
            name="heart" 
            size={17*size} 
            color={colors.HEART} 
            style={{marginRight:5}}
            />
            <Text style={styles.movieSubTitle}>{voteCountValue}</Text>
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

MovieCard.defaultProps ={
    size: 1,
    heartLess: true
};

export default MovieCard