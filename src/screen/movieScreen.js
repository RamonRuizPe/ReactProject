import React, {useState, useEffect} from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, Linking, StatusBar, Share} from 'react-native';
import ItemSeparator from '../components/ItemSeparator';
import {getMovieById, getPoster, getVideo, getLanguage} from "../services/MovieService"
import {LinearGradient} from "expo-linear-gradient"
import {Feather, Ionicons} from "@expo/vector-icons"
import {APPEND_TO_RESPONSE as AR} from '../constants/Urls'
import { FlatList } from 'react-native-gesture-handler';
import colors from '../constants/colors';
import fonts from '../constants/fonts';
import CastCard from '../components/CastCard';
import MovieCard from '../components/MovieCard';

const {height, width} = Dimensions.get('screen')
const setHeight = (h) => (height/100) * h
const setWidth = (w) => (width/100) * w

const MovieScreen = ({route, navigation}) => {
    const {movieId} = route.params;
    const [movie, setMovie] = useState({});
    const [castSelection, setcastSelection] = useState(true)
    
    useEffect(()=>{
      getMovieById(movieId, `${AR.VIDEOS},${AR.CREDITS},${AR.RECOMMENDATIONS}`).then(response => setMovie(response.data))
    }, [])

    return (
        <ScrollView>
          <StatusBar style="light" />
          <LinearGradient
          colors = {["rgba(0,0,0,0.5)", "rgba(217,217,217,0)"]}
          start ={[0, 0.3]}
          style ={styles.LinearGradient}
          />
          <View style={styles.moviePosterImageContainer}>
            <Image style={styles.moviePosterImage} resizeMode="cover" 
            source={{uri: getPoster(movie.backdrop_path)}}/> 
        </View> 
        <View style={styles.headerContainer}>
          <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.goBack()}>
            <Feather name="chevron-left" size={35} color={colors.WHITE}/>
          </TouchableOpacity>
          <Text style ={styles.headerText} onPress={async () => {
              try{
                  const result = await Share.share({
                      message: `Échale un ojo a ${movie?.title}`
                  })
              }catch(e){
                alert(e.message)
              }
          }}>Share</Text>
        </View>
          <TouchableOpacity style={styles.playButton} onPress={() => Linking.openURL(getVideo(movie.videos.results[0].key))}>
            <Ionicons name={"play-circle-outline"} size={70} color={colors.WHITE}/>
          </TouchableOpacity>
        <ItemSeparator height={setHeight(37)}/>
        <View style={styles.movieTitleContainer}>
            <Text style={styles.movieTitle}>{movie?.title}</Text>
            <View style={styles.row}>
                <Ionicons name='heart' size={18} color={colors.HEART}></Ionicons>
                <Text style={styles.ratingValue}>{movie?.vote_average}</Text>
            </View>
        </View>
        <Text style={styles.genres}>
            {movie?.genres?.map(genre => genre?.name)?.join(", ")}{`\n`}{movie?.runtime} min</Text>
        <Text style={styles.genres}>
            {getLanguage(movie?.original_language)?.english_name}
        </Text>
        <View style={styles.synopsisContainer}>
            <Text style={styles.synopsisTitle}>Sinópsis</Text>
            <Text style={styles.synopsisText}>{movie?.overview}</Text>
        </View>
            <View>
                <Text style={styles.castTitle}>Cast</Text>
                <View style={styles.castSubContainer}>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => setcastSelection(true)}>
                        <Text 
                        style={[styles.castsubTitle, {color: castSelection ? colors.BLACK : colors.LIGHT_GRAY}]}>Cast</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => setcastSelection(false)}>
                        <Text 
                        style={[styles.castsubTitle, {color: castSelection ? colors.LIGHT_GRAY : colors.BLACK}]}>Crew</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                data={castSelection ? movie?.credits?.cast : movie?.credits?.crew}
                keyExtractor={(item) => item?.credit_id}
                horizontal
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={() => <ItemSeparator width={20}/>}
                ListHeaderComponent={() => <ItemSeparator width={20}/>}
                ListFooterComponent={() => <ItemSeparator width={20}/>}
                renderItem={({item}) => 
                <CastCard
                    realName={item?.name}
                    characterName={castSelection ? item?.character : item?.job}
                    image={item?.profile_path}></CastCard>}
                
                ></FlatList>
            </View>
            <Text style={styles.recommendationsTitle}>Películas que te pueden gustar</Text>
            <FlatList
                data={movie?.recommendations?.results}
                keyExtractor={(item) => item?.id?.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={() => <ItemSeparator width={20}/>}
                ListHeaderComponent={() => <ItemSeparator width={20}/>}
                ListFooterComponent={() => <ItemSeparator width={20}/>}
                renderItem={({item}) => 
                <MovieCard 
                                    title={item.title} 
                                    language={item.original_language}
                                    voteAverage={item.vote_average}
                                    voteCount={item.vote_count} 
                                    poster={item.poster_path}
                                    heartLess={false}
                                    onPress={() => navigation.navigate("movie", {movieId: item.id})}
                                />}
                ></FlatList>
        </ScrollView>
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    moviePosterImageContainer:{
      height: setHeight(35),
      width : setWidth(145),
      alignItems: 'center',
      position: 'absolute',
      left: setWidth((100-145)/2),
      top: 0,
      borderBottomRightRadius: 300,
      borderBottomLeftRadius: 300,
      elevation: 8,
    },
    moviePosterImage: {
      borderBottomRightRadius: 300,
      borderBottomLeftRadius: 300,
      height: setHeight( 35),
      width: setWidth(145),
    },
    movieTitleContainer:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        paddingHorizontal: 20,
    },
    movieTitle:{
        color: colors.BLACK,
        fontFamily: fonts.Akshar_Medium,
        fontSize:25,
    },
    ratingValue:{
        fontFamily: fonts.Akshar_Medium,
        fontSize: 16,
        marginLeft: 5,
        color: colors.BLACK,
    },
    row:{
        flexDirection:"row",
        alignItems:"center",
    },
    genres:{
        color:colors.LIGHT_GRAY,
        paddingHorizontal: 20,
        paddingTop: 5,
        fontFamily: fonts.Akshar_Light,
        fontSize: 15,
    },
    synopsisContainer:{
        backgroundColor: colors.EXTRA_LIGHT_GRAY,
        paddingHorizontal: 20,
        paddingVertical:12,
        marginVertical: 10,
    },
    synopsisTitle:{
        color: colors.BLACK,
        fontFamily: fonts.Akshar_Medium,
        fontSize: 18,
    },
    synopsisText:{
        color: colors.LIGHT_GRAY,
        paddingVertical: 8,
        fontFamily: fonts.Akshar_Medium,
        textAlign: "justify",
    },
    castTitle:{
        marginLeft:20,
        color: colors.BLACK,
        fontFamily: fonts.Akshar_Medium,
        fontSize: 18,
    },
    castSubContainer:{
        marginLeft:20,
        flexDirection: "row",
        marginVertical: 5,
    },
    castsubTitle:{
        marginRight: 10,
        color: colors.BLACK,
        fontFamily: fonts.Akshar_Medium
    },
    recommendationsTitle:{
        paddingVertical:10,
        marginLeft: 20,
        color: colors.BLACK,
        fontFamily: fonts.Akshar_Medium,
        fontSize: 18,
    },
    LinearGradient:{ 
      height: setHeight(6),
      width:setWidth(100),
      position: 'absolute',
      top: 0,
      elevation: 9
    },
    headerContainer: {
      flexDirection: 'row', 
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      position: 'absolute',
      right: 0,
      left: 0,
      top: 50,
      elevation: 20,
    },
    headerText: {
      color: colors.WHITE,
      fontFamily: fonts.BOLD
    },
    playButton:{
      position: 'absolute',
      top: 110,
      left: setWidth(50) - 70/2,
      elevation: 10
    }
  });

export default MovieScreen