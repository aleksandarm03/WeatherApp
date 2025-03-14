import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from './ThemeContext';

const backgroundImage = require('@/assets/images/background.jpg');

export default function Details() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { isDark, toggleTheme } = useTheme();

  // Proverite da li je `forecast` string pre nego što ga parsirate
  const forecast = typeof params.forecast === 'string' ? JSON.parse(params.forecast) : [];

  // Filtriranje podataka za prikaz jedne prognoze po danu
  const filteredForecast = forecast.reduce((acc: any[], item: any) => {
    const date = new Date(item.dt * 1000).toLocaleDateString(); // Pretvaranje timestampa u datum
    if (!acc.find((entry) => new Date(entry.dt * 1000).toLocaleDateString() === date)) {
      acc.push(item); // Dodajemo samo prvu prognozu za taj dan
    }
    return acc;
  }, []);

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

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background} blurRadius={5}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={[styles.overlay, { backgroundColor: isDark ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)' }]}>
          {/* Dugme za nazad */}
          <TouchableOpacity 
            style={[styles.backButton, { zIndex: 999 }]} 
            onPress={() => router.back()}
          >
            <Ionicons 
              name="arrow-back" 
              size={28} 
              color={isDark ? '#ffd700' : '#000'} 
            />
          </TouchableOpacity>

          <Text style={[styles.title, { color: isDark ? '#fff' : '#000' }]}>Weather Details</Text>
          <View style={styles.detailsContainer}>
            <Text style={[styles.detailText, { color: isDark ? '#fff' : '#000' }]}>🌍 City: {params.city}</Text>
            <Text style={[styles.detailText, { color: isDark ? '#fff' : '#000' }]}>🌡️ Temperature: {params.temp}°C</Text>
            <Text style={[styles.detailText, { color: isDark ? '#fff' : '#000' }]}>☁️ Condition: {params.description}</Text>
            <Text style={[styles.detailText, { color: isDark ? '#fff' : '#000' }]}>💧 Humidity: {params.humidity}%</Text>
            <Text style={[styles.detailText, { color: isDark ? '#fff' : '#000' }]}>📊 Pressure: {params.pressure} hPa</Text>
            <Text style={[styles.detailText, { color: isDark ? '#fff' : '#000' }]}>💨 Wind Speed: {params.windSpeed} m/s</Text>
            <Text style={[styles.detailText, { color: isDark ? '#fff' : '#000' }]}>🌅 Sunrise: {new Date(Number(params.sunrise) * 1000).toLocaleTimeString()}</Text>
            <Text style={[styles.detailText, { color: isDark ? '#fff' : '#000' }]}>🌇 Sunset: {new Date(Number(params.sunset) * 1000).toLocaleTimeString()}</Text>
            <Text style={[styles.detailText, { color: isDark ? '#fff' : '#000' }]}>👀 Visibility: {Number(params.visibility) / 1000} km</Text>
            <Text style={[styles.detailText, { color: isDark ? '#fff' : '#000' }]}>{getWeatherIcon(params.icon as string)}</Text>
          </View>

          <Text style={[styles.forecastTitle, { color: isDark ? '#fff' : '#000' }]}>5-Day Forecast</Text>
          {filteredForecast.map((item: any, index: number) => (
            <View key={index} style={styles.forecastItem}>
              <Text style={[styles.forecastText, { color: isDark ? '#fff' : '#000' }]}>
                {formatDate(item.dt)}: {item.main.temp}°C {getWeatherIcon(item.weather[0].icon)}
              </Text>
              <Text style={[styles.forecastDescription, { color: isDark ? '#aaa' : '#555' }]}>
                {item.weather[0].description}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    padding: 30,
    borderRadius: 20,
    width: '90%',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 10,
    borderRadius: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  detailsContainer: {
    width: '100%',
    marginBottom: 20,
  },
  detailText: {
    fontSize: 18,
    marginBottom: 10,
  },
  forecastTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  forecastItem: {
    width: '100%',
    marginBottom: 10,
  },
  forecastText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  forecastDescription: {
    fontSize: 14,
  },
});