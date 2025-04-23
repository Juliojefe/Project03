import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ScrollView,
  Button,
} from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import * as Location from 'expo-location';
import Slider from '@react-native-community/slider';

interface Mechanic {
  id: number;
  name: string;
  lat: number;
  lon: number;
  rating: number;
  description: string;
}

export default function MechanicMapScreen({ navigation }: any) {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [radius, setRadius] = useState(15);
  const [zoom, setZoom] = useState(0.2);
  const [mechanics, setMechanics] = useState<Mechanic[]>([]);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location access is required.');
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      };
      setLocation(coords);

      // MOCK DATA
      setMechanics([
        {
          id: 1,
          name: "Joe's Garage",
          lat: coords.latitude + 0.06,
          lon: coords.longitude - 0.06,
          rating: 4.6,
          description: 'Trusted brake and engine repair.',
        },
        {
          id: 2,
          name: 'Quick Fix Auto',
          lat: coords.latitude - 0.06,
          lon: coords.longitude + 0.06,
          rating: 4.3,
          description: 'Suspension and tire balancing services.',
        },
        {
          id: 3,
          name: 'Precision Motors',
          lat: coords.latitude + 0.05,
          lon: coords.longitude + 0.05,
          rating: 4.9,
          description: 'Free diagnostics and 20% off oil changes.',
        },
      ]);
    })();
  }, [radius]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>🔧 Mechanic Map</Text>
      </View>

      {location && (
        <MapView
          style={styles.map}
          region={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: zoom,
            longitudeDelta: zoom,
          }}
        >
          <Marker coordinate={location} title="You Are Here" />
          <Circle
            center={location}
            radius={radius * 1609.34}
            strokeColor="red"
            fillColor="rgba(255, 0, 0, 0.2)"
          />
          {Array.isArray(mechanics) &&
            mechanics.map((m) => (
              <Marker
                key={m.id}
                coordinate={{ latitude: m.lat, longitude: m.lon }}
                title={`${m.name} ⭐ ${m.rating}`}
                pinColor="blue"
                onCalloutPress={() => navigation.navigate('Posts', { mechanic: m })}
              />
            ))}
        </MapView>
      )}

      <View style={styles.sliderContainer}>
        <Text style={styles.radiusText}>Radius: {radius} miles</Text>
        <Slider
          style={{ width: '90%' }}
          minimumValue={5}
          maximumValue={100}
          step={5}
          value={radius}
          onValueChange={(value) => setRadius(value)}
          minimumTrackTintColor="red"
          maximumTrackTintColor="#000000"
        />
      </View>

      <View style={styles.zoomControls}>
        <TouchableOpacity onPress={() => setZoom(Math.max(0.01, zoom - 0.02))} style={styles.zoomButton}>
          <Text style={styles.zoomText}>➕</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setZoom(Math.min(1, zoom + 0.02))} style={styles.zoomButton}>
          <Text style={styles.zoomText}>➖</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.listContainer}>
        <Text style={styles.sectionTitle}>Nearby Mechanics</Text>
        {mechanics.map((m) => (
          <View key={m.id} style={styles.card}>
            <Text style={styles.cardTitle}>{m.name}</Text>
            <Text>{m.description}</Text>
            <Text>⭐ {m.rating.toFixed(1)}</Text>
            <Button title="View Posts" onPress={() => navigation.navigate('Posts', { mechanic: m })} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },
  header: {
    paddingTop: 45,
    paddingBottom: 15,
    backgroundColor: '#222',
    alignItems: 'center',
  },
  headerText: { fontSize: 20, color: '#fff', fontWeight: 'bold' },
  map: { flex: 1 },
  sliderContainer: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    alignItems: 'center',
  },
  radiusText: { fontSize: 16, marginBottom: 5, fontWeight: '500' },
  zoomControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingBottom: 15,
  },
  zoomButton: {
    backgroundColor: '#ccc',
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 8,
  },
  zoomText: { fontSize: 20 },
  listContainer: {
    padding: 10,
    backgroundColor: '#fff',
    maxHeight: 220,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
  },
  card: {
    backgroundColor: '#dbeafe',
    marginBottom: 10,
    padding: 15,
    borderRadius: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: '#1e3a8a',
  },
});
