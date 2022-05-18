import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { useState } from 'react/cjs/react.production.min';


export default function App() {

  return (
    <View style={styles.container}>
        <Text style={styles.MainTitle}>HELLO WORLD</Text>
        <Text style={styles.textview}>Bienvenid@s a nuestra aplicación. 
        Aquí encontraras el mejor catálogo de series y peliculas que se
        encuentran dentro de tus servicios de streaming favoritos.</Text>
        <StatusBar style="auto" />
        <Button 
          title={'CONTINUAR'} 
          style={styles.boton}
          onPress={()=> alert('HOLA')}
        >
        </Button>
        <Image
          style={styles.imageview}
          source={require('./assets/movies.png')}
        />
    </View>
  
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textview:{
      color: 'white',
      padding: 30,
      textAlign: 'justify',
      fontWeight: 'bold'
  },
  imageview:{
    justifyContent: 'center',
    height: 220,
    width: 220
  },
  MainTitle: {
    alignItems: 'flex-start',
    fontSize: 20,
    color: 'white',
    backgroundColor: 'darkblue'
  },
  boton: {
    color: 'red'
  }
});
