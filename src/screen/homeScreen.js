import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native';
import colors from '../constants/colors';
import GenreCard from '../components/GenreCard';
import ItemSeparator from '../components/ItemSeparator';
import fonts from '../constants/fonts';
import MovieCard from '../components/MovieCard';
import {getNowPlayingMovies, getUpcomingMovies, getAllGenres} from "../services/MovieService"

const Genres = ["Todo", "Acción", "Comedia", "Romance", "Horror", "Sci-Fi"];

const homeScreen = ({navigation}) => {
    const [currentGenre, setcurrentGenre] = useState("Todo");
    const [nowPlayingMovies, setNowPlayingMovies] = useState({});
    const [upcomingMovies, setUpcomingMovies] = useState({});
    const [genres, setGenres] = useState([{id: 10110, name: "All"}]);

    useEffect(()=>{
      getNowPlayingMovies().then(movieResponse => setNowPlayingMovies(movieResponse.data));
      getUpcomingMovies().then(movieResponse => setUpcomingMovies(movieResponse.data));
      getAllGenres().then((genreResponse) => setGenres([...genres, ...genreResponse.data.genres]));

    },[]);

  return (
    <ScrollView style={styles.container}>
        <StatusBar style="auto" 
        translucent={false} 
        backgroundColor={colors.BASIC_BACKGROUND}/>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Disponibles</Text>
        <Text style={styles.headerSubTitle}>Ver todo</Text>
    </View>
    <View style={styles.genreListContainer}>
        <FlatList 
        data={genres}
        horizontal
        keyExtractor={(item) => item.id.toString()} 
        ItemSeparatorComponent={() => <ItemSeparator width={20}/>}
        ListHeaderComponent={() => <ItemSeparator width={20}/>}
        ListFooterComponent={() => <ItemSeparator width={20}/>}
        renderItem={({item}) => (
        <GenreCard 
            genreName={item.name} 
            active={item.name === currentGenre ? true : false}
            onPress={setcurrentGenre}
            />)}></FlatList>
    </View>
    <View>
      <FlatList
        data={nowPlayingMovies.results}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item)=>item.id.toString()}
        ItemSeparatorComponent={() => <ItemSeparator width={20}/>}
        ListHeaderComponent={() => <ItemSeparator width={20}/>}
        ListFooterComponent={() => <ItemSeparator width={20}/>}
        renderItem={({item}) => <MovieCard 
                                    title={item.title} 
                                    language={item.original_language}
                                    voteAverage={item.vote_average}
                                    voteCount={item.vote_count} 
                                    poster={item.poster_path}
                                    heartLess={false}
                                    onPress={() => navigation.navigate("movie", {movieId: item.id})}
                                />}
        />
    </View>
    <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Proximamente</Text>
        <Text style={styles.headerSubTitle}>Ver todo</Text>
    </View>
    <View>
      <FlatList
        data={upcomingMovies.results}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item)=>item.id.toString()}
        ItemSeparatorComponent={() => <ItemSeparator width={20}/>}
        ListHeaderComponent={() => <ItemSeparator width={20}/>}
        ListFooterComponent={() => <ItemSeparator width={20}/>}
        renderItem={({item}) => <MovieCard 
                                    title={item.title} 
                                    language={item.original_language}
                                    voteAverage={item.vote_average}
                                    voteCount={item.vote_count} 
                                    poster={item.poster_path}
                                    size={0.7}  
                                    onPress={() => navigation.navigate("movie", {movieId: item.id})} 
                                />}
        />
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BASIC_BACKGROUND,
  },
  headerContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems:"center",
      paddingHorizontal:20,
      paddingVertical:10,
  },
  headerTitle:{
      fontSize:28,
      fontFamily: fonts.Koulen,
  },
  headerSubTitle:{
      fontSize:15,
      color:colors.ACTIVE,
      fontFamily: fonts.Koulen,
  },
  genreListContainer:{
    paddingVertical:10,
  }

});

export default homeScreen;
