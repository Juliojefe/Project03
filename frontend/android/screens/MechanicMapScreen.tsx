import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  Button,
  TouchableOpacity,
} from 'react-native';
import MapView, { Marker, Callout, Circle } from 'react-native-maps';
import mechanicData from '../navigation/mechanics.json'; // Mock data for mechanics
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
  const [mechanics, setMechanics] = useState<Mechanic[]>([]);
  const [region, setRegion] = useState<any>(null);

  useEffect(() => {
    // Set fake user location (Salinas center)
    const defaultCoords = {
      latitude: 36.6777,
      longitude: -121.6555,
    };

    setLocation(defaultCoords);
    setRegion({
      ...defaultCoords,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    });

    setMechanics(mechanicData); // Load mock mechanic data
  }, []);

  const zoomIn = () => {
    if (!region) return;
    setRegion((prev: any) => ({
      ...prev,
      latitudeDelta: prev.latitudeDelta * 0.5,
      longitudeDelta: prev.longitudeDelta * 0.5,
    }));
  };

  const zoomOut = () => {
    if (!region) return;
    setRegion((prev: any) => ({
      ...prev,
      latitudeDelta: prev.latitudeDelta * 2,
      longitudeDelta: prev.longitudeDelta * 2,
    }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>🔧 Mechanic Map</Text>
      </View>

      {region && (
        <MapView style={styles.map} region={region} onRegionChangeComplete={setRegion}>
          {location && (
            <Marker coordinate={location} title="You Are Here" pinColor="red" />
          )}
          <Circle
            center={location || region}
            radius={radius * 1609.34}
            strokeColor="red"
            fillColor="rgba(255, 0, 0, 0.2)"
          />
          {mechanics.map((m) => (
            <Marker
              key={m.id}
              coordinate={{ latitude: m.lat, longitude: m.lon }}
              pinColor="blue"
            >
              <Callout onPress={() => navigation.navigate('Posts', { mechanic: m })}>
                <View style={styles.calloutView}>
                  <Text style={styles.calloutTitle}>{m.name}</Text>
                  <Text>{m.description}</Text>
                  <Text>⭐ {m.rating.toFixed(1)}</Text>
                  <Text style={{ color: 'blue', marginTop: 5 }}>Tap to View Posts</Text>
                </View>
              </Callout>
            </Marker>
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
        <View style={styles.zoomButtons}>
          <TouchableOpacity style={styles.zoomBtn} onPress={zoomIn}>
            <Text style={styles.zoomText}>＋</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.zoomBtn} onPress={zoomOut}>
            <Text style={styles.zoomText}>－</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.listContainer}>
        <Text style={styles.sectionTitle}>Nearby Mechanics</Text>
        {mechanics.map((m) => (
          <View key={m.id} style={styles.card}>
            <Text style={styles.cardTitle}>{m.name}</Text>
            <Text>{m.description}</Text>
            <Text>⭐ {m.rating.toFixed(1)}</Text>
            <Button title="Message Shop" onPress={() => navigation.navigate('Posts', { mechanic: m })} />
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
  zoomButtons: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 10,
  },
  zoomBtn: {
    padding: 10,
    backgroundColor: '#e5e7eb',
    borderRadius: 8,
  },
  zoomText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  listContainer: {
    padding: 10,
    backgroundColor: '#fff',
    maxHeight: 230,
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
  calloutView: {
    minWidth: 200,
  },
  calloutTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
});
