import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, ImageBackground } from 'react-native';
import Weather from './components/Weather';
import SearchBar from './components/Searchbar';


const API_KEY = "911384e88029a1dbe351d5bdc407e77d"; // API key


export default function App() {
    // get weather data from API
    const [weatherData, setWeatherData] = useState(null);
    const [loaded, setLoaded] = useState(true);

    async function fetchWeatherData(cityName) {
        setLoaded(false);
        const API = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}` 
        try {
            const response = await fetch(API);
            if(response.status == 200) {
                const data = await response.json();
                setWeatherData(data);
            } else {
                setWeatherData(null);
            }
            setLoaded(true);
            
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => { 
        fetchWeatherData('Colombo'); // set default weather to colombo
    }, [])
    

    if(!loaded) {
        return (
            <View style={styles.container}>
                <ActivityIndicator color='gray'  size={36} />
            </View>

        )
    }

    else if(weatherData === null) { // if user enter wrong city this message will shown
        return (
            <View style={styles.container}>
                <SearchBar fetchWeatherData={fetchWeatherData}/>
                <Text style={styles.primaryText}>City Not Found! Try Different City</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}> 
            <Weather weatherData={weatherData} fetchWeatherData={fetchWeatherData}  />
        </View>
    );
}

// style the error page
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryText: {
      margin: 20,
      fontSize: 28
  }
});