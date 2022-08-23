import React, {useState, useEffect} from "react";
import {StyleSheet, Image, View, Text, TextInput, TouchableOpacity} from 'react-native';
import MapView, { Marker, Callout }  from "react-native-maps";
import {requestForegroundPermissionsAsync, getCurrentPositionAsync} from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';


import api from "../services/api";

const MapDark = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#1d2c4d"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#8ec3b9"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1a3646"
        }
      ]
    },
    {
      "featureType": "administrative.country",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#4b6878"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#64779e"
        }
      ]
    },
    {
      "featureType": "administrative.province",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#4b6878"
        }
      ]
    },
    {
      "featureType": "landscape.man_made",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#334e87"
        }
      ]
    },
    {
      "featureType": "landscape.natural",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#023e58"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#283d6a"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#6f9ba5"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1d2c4d"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#023e58"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#3C7680"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#304a7d"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#98a5be"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1d2c4d"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#2c6675"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#255763"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#b0d5ce"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#023e58"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#98a5be"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1d2c4d"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#283d6a"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#3a4762"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#0e1626"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#4e6d70"
        }
      ]
    }
  ]

const MapStandardStyle = [
    {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#8ec3b9"
          }
        ]
      },
];

function Main({ navigation}){

    const [devs, setDevs] =  useState([]);
    const [currentRegion, setCurrentRegion] = useState(null);
    const [techs, setTechs] = useState('');


    useEffect(() => {
        async function loadInitialPosition(){
            
           const { granted }= await requestForegroundPermissionsAsync();

           if(granted){
               const { coords } = await getCurrentPositionAsync({
                   enableHighAccuracy: true,
               });
               
               const {latitude, longitude} = coords;

               setCurrentRegion({
                   latitude,
                   longitude,
                   latitudeDelta: 0.03,
                   longitudeDelta:0.03,
               })
           }
        }

        loadInitialPosition();
    }, [])

    if(!currentRegion){
        return null;
    }

    
    async function loadDevs(){
        const { latitude,  longitude} = currentRegion;

        const response = await api.get('/search',{
            params: {
                latitude,
                longitude,
                techs
            }
        });

        setDevs(response.data.devs);
    }

    function hadlerRegionChanged(region){
        setCurrentRegion(region);
    }

   

    return (
        <>
        <MapView
        onRegionChangeComplete={hadlerRegionChanged}
        customMapStyle={MapDark}
        initialRegion={currentRegion}
        style={styles.map}
        >
            {devs.map( dev =>(
                <Marker 
                key={dev._id}
                coordinate={{ 
                    longitude: dev.location.coordinates[0], 
                    latitude: dev.location.coordinates[1], 
                    }}>
                <Image 
                style={ styles.avatar }
                source={{ uri: dev.avatar_url}}
                />

                <Callout tooltip onPress={() =>{navigation.navigate('Profile',{github_username: dev.github_username});
                }}>
                    <View>
                        <View style={styles.callout}>
                            <Text style={styles.devName}>{dev.name}</Text>
                            <Text style={styles.devBio}>{dev.bio}</Text>
                            <Text style={styles.devTechs}>{dev.techs.join(', ')} </Text>
                        </View>
                    </View>
                </Callout>
            </Marker>
            ))}
        </MapView>

        <View style= {styles.searchForm}>
            <TextInput 
            style = { styles.searchInput}
            placeholder = "Buscar devs por tecnologias..."
            placeholderTextColor= "#999"
            autoCapitalize= "words" //Cada palavra em caixa alta a primeira letra
            autoCorrect={false}
            value={techs}
            onChangeText = {setTechs}
            />

            <TouchableOpacity onPress={loadDevs} style ={styles.loadButton}>
                <MaterialIcons name="my-location" size={20} color="#FFF"/>
            </TouchableOpacity>
        </View>
        </>
);
}

const styles = StyleSheet.create({
    map:{
        flex: 1
    },
    avatar:{
        width: 54,
        height: 54,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: '#FFF'
    },
    callout:{
        width:260 ,
    },
    devName: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    devBio:{
        color: '#666',
        marginTop:5,
    },
    devTechs:{
        marginTop: 5,
    },
    searchForm: {
        position: 'absolute',
        top: 20,
        bottom: 20,
        left: 20,
        right: 20,
        zIndex: 5,
        flexDirection: 'row',
    },
    searchInput:{
        flex:1,
        height: 50,
        backgroundColor: '#FFF',
        color: '#333',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4,
        },
        elevation: 2,
    },
    loadButton:{
        width: 50,
        height: 50,
        backgroundColor: '#9254C8',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,


    }
})

export default Main;