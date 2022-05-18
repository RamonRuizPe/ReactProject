import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native';
import colors from '../constants/colors';
import GenreCard from '../components/GenreCard';
import ItemSeparator from '../components/ItemSeparator';
import fonts from '../constants/fonts';
import MovieCard from '../components/MovieCard';

const Genres = ["Todo", "Acción", "Comedia", "Romance", "Horror", "Sci-Fi"];

const homeScreen = () => {
    const [currentGenre, setcurrentGenre] = useState("Todo")
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
        data={Genres}
        horizontal
        keyExtractor={(item) => item} 
        ItemSeparatorComponent={() => <ItemSeparator width={20}/>}
        ListHeaderComponent={() => <ItemSeparator width={20}/>}
        ListFooterComponent={() => <ItemSeparator width={20}/>}
        renderItem={({item}) => (
        <GenreCard 
            genreName={item} 
            active={item === currentGenre ? true : false}
            onPress={setcurrentGenre}
            />)}></FlatList>
    </View>
    <View>
      <FlatList
        data={Genres}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item)=>item}
        ItemSeparatorComponent={() => <ItemSeparator width={20}/>}
        ListHeaderComponent={() => <ItemSeparator width={20}/>}
        ListFooterComponent={() => <ItemSeparator width={20}/>}
        renderItem={({item}) => <MovieCard/>}
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
