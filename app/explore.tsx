import { StyleSheet, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from './ThemeContext';

export default function Explore() {
  const { isDark } = useTheme();

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: isDark ? '#1e1e1e' : '#fff' }]}>
      <ThemedView style={styles.header}>
        <Ionicons name="compass" size={48} color="#ff7f50" />
        <ThemedText type="title" style={[styles.title, { color: isDark ? '#fff' : '#000' }]}>
          Explore
        </ThemedText>
      </ThemedView>
      <ThemedText style={[styles.description, { color: isDark ? '#aaa' : '#555' }]}>
        Discover more about the Weather App and its features.
      </ThemedText>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 10,
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
  },
});