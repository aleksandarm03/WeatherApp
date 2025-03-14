import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, StyleSheet, ImageBackground, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { WEATHER_API_KEY } from '@env';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { useTheme } from './ThemeContext';
import { useRouter } from 'expo-router';

const backgroundImage = require('@/assets/images/background.jpg');

export default function Home() {
  const [city, setCity] = useState('Kragujevac');
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const scale = useSharedValue(1);
  const router = useRouter();

  const animateButton = () => {
    scale.value = withSpring(0.9, { damping: 2, stiffness: 100 });
    setTimeout(() => {
      scale.value = withSpring(1);
    }, 100);
  };

  const fetchWeather = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`
      );
      setWeather(response.data);
      navigateToDetails(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      Alert.alert('Error', 'City not found. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [city]);

  const fetchFiveDayForecast = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${WEATHER_API_KEY}&units=metric`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching 5-day forecast:', error);
      Alert.alert('Error', 'Failed to fetch 5-day forecast. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [city]);

  const navigateToDetails = async (weatherData: any) => {
    const fiveDayForecast = await fetchFiveDayForecast();
    router.push({
      pathname: '/details',
      params: {
        city: weatherData.name,
        temp: weatherData.main.temp.toString(),
        description: weatherData.weather[0].description,
        humidity: weatherData.main.humidity.toString(),
        pressure: weatherData.main.pressure.toString(),
        windSpeed: weatherData.wind.speed.toString(),
        icon: weatherData.weather[0].icon,
        sunrise: weatherData.sys.sunrise.toString(),
        sunset: weatherData.sys.sunset.toString(),
        visibility: weatherData.visibility.toString(),
        forecast: JSON.stringify(fiveDayForecast.list),
      },
    });
  };

  const getWeatherIcon = (iconCode: string) => {
    switch (iconCode) {
      case '01d': return '☀️';
      case '01n': return '🌙';
      case '02d': return '⛅';
      case '03d': case '03n': return '☁️';
      case '04d': case '04n': return '🌥️';
      case '09d': case '09n': return '🌧️';
      case '10d': case '10n': return '🌦️';
      case '11d': case '11n': return '⛈️';
      case '13d': case '13n': return '❄️';
      case '50d': case '50n': return '🌫️';
      default: return '🌈';
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background} blurRadius={5}>
      <View style={[styles.overlay, { backgroundColor: isDark ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)' }]}>
        <TouchableOpacity 
          style={[styles.themeToggle, { zIndex: 999 }]} 
          onPress={toggleTheme}
        >
          <Ionicons 
            name={isDark ? 'sunny' : 'moon'} 
            size={28} 
            color={isDark ? '#ffd700' : '#000'} 
          />
        </TouchableOpacity>

        <Text style={[styles.title, { color: isDark ? '#fff' : '#000' }]}>🌤️ Weather </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, { color: isDark ? '#fff' : '#000', borderColor: isDark ? '#fff' : '#000' }]}
            value={city}
            onChangeText={setCity}
            placeholder="Enter city name"
            placeholderTextColor={isDark ? '#aaa' : '#555'}
          />
          <Animated.View style={{ transform: [{ scale }] }}>
            <TouchableOpacity style={styles.searchButton} onPress={() => { animateButton(); fetchWeather(); }}>
              <Ionicons name="search" size={24} color="#fff" />
            </TouchableOpacity>
          </Animated.View>
        </View>
        {loading && <ActivityIndicator size="large" color={isDark ? '#fff' : '#000'} />}
        {weather && !loading && (
          <View style={styles.weatherInfoContainer}>
            <Text style={[styles.weatherInfo, { color: isDark ? '#fff' : '#000' }]}>
              {getWeatherIcon(weather.weather[0].icon)} {weather.name}: {weather.main.temp}°C
            </Text>
            <Text style={[styles.weatherDescription, { color: isDark ? '#fff' : '#000' }]}>
              {weather.weather[0].description}
            </Text>
          </View>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    padding: 30,
    borderRadius: 20,
    width: '90%',
    alignItems: 'center',
  },
  themeToggle: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 10,
    borderRadius: 50,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    padding: 15,
    borderWidth: 2,
    borderRadius: 10,
    fontSize: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  searchButton: {
    backgroundColor: '#ff7f50',
    padding: 15,
    borderRadius: 10,
    marginLeft: 10,
  },
  weatherInfoContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  weatherInfo: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  weatherDescription: {
    fontSize: 18,
    marginTop: 5,
  },
});