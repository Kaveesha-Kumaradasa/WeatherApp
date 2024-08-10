import React, { useState  } from 'react'
import { View, TextInput, StyleSheet, Dimensions } from 'react-native';
import { EvilIcons } from '@expo/vector-icons'; 

// create the search bar
export default function Searchbar({ fetchWeatherData }) {

    const [cityName, setCityName] = useState('');

    return (
        <View style={styles.searchBar}>
            <TextInput 
                placeholder='Enter City name'
                value={cityName}
                onChangeText={(text) => setCityName(text)}
            />
            <EvilIcons name="search" size={28} color="black"  onPress={() => fetchWeatherData(cityName)}/>
        </View>
    )
}

// do the modification to search bar
const styles = StyleSheet.create({
    searchBar: {
        marginTop: 45,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: Dimensions.get('screen').width - 40,
        paddingVertical: 10,
        borderRadius: 25,
        marginHorizontal: 20,
        paddingHorizontal: 20,
        backgroundColor: 'rgba(255,255,255, 0.7)'
    }
})