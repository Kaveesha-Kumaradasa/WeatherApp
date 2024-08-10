import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ImageBackground, Dimensions, StatusBar } from 'react-native';
import SearchBar from './Searchbar';
import { haze, rainy, snow, sunny, clouds } from '../assets/background/index';


// displaying weather data
export default function Weather({ weatherData, fetchWeatherData }) {

    const [backgroundImage, setBackgroundImage] = useState(null);

    const { weather,
            name,
            main: { temp, humidity },
            wind: { speed }
    } = weatherData;
    const [{ main }] = weather;

    useEffect(() => {
        setBackgroundImage(getBackgroundImg(main));
    }, [weatherData])

    // set background image according to  the weather condition
    function getBackgroundImg(weather) {
        if(weather === 'Snow') return snow
        if(weather === 'Clear') return sunny
        if(weather === 'Rain') return rainy
        if(weather === 'Haze') return haze
        if(weather === 'Clouds') return clouds
        return haze;   
    }

    let textColor = backgroundImage !== sunny ? 'white' : 'black' // set text color for according to the background image
    // create the app interface
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='gray' /> 
            <ImageBackground 
                source={backgroundImage}
                style={styles.backgroundImg}
                resizeMode='cover' 
            >   
                <SearchBar fetchWeatherData={fetchWeatherData} />
                
                <View style={{alignItems: 'center' }}>
                    <Text style={{ ...styles.headerText, color: textColor, fontWeight: 'bold', fontSize: 46 }}>{name}</Text>
                    <Text style={{ ...styles.headerText, color: textColor, fontWeight: 'bold'}}>{main}</Text>
                    <Text style={{ ...styles.headerText, color: textColor,}}>{temp} °C</Text>
                </View>

                <View style={styles.extraInfo}>

                    <View style={styles.info}>
                        <Text style={{ fontSize: 22, color: 'white' }}>Humidity</Text>
                        <Text style={{ fontSize: 22, color: 'white' }}>{humidity} %</Text>
                    </View>

                    <View style={styles.info}>
                        <Text style={{ fontSize: 22, color: 'white' }}>Wind Speed</Text>
                        <Text style={{ fontSize: 22, color: 'white' }}>{speed} m/s</Text>
                    </View>
                
                </View>
                

            </ImageBackground>
        </View>
    )
}


// do the modification to the text and the background
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
    },
    backgroundImg: {
        flex: 1,
        width: Dimensions.get('screen').width
    },
    headerText: {
        fontSize: 36,
        marginTop: 40,
    },
    extraInfo: {
        flexDirection: 'row',
        marginTop: 80,
        justifyContent: 'space-between',
        padding: 20
    },
    info: {
        width: Dimensions.get('screen').width/2.5,
        backgroundColor: 'rgba(0,0,0, 0.5)',
        padding: 10,
        borderRadius: 15,
        justifyContent: 'center'
    }
});
  