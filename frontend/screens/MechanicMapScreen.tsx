import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Button, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types'; // Adjust the path to where your types are defined

type MechanicMapScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MechanicMapScreen'>;

interface Mechanic {
  id: number;
  name: string;
  lat: number;
  lon: number;
}

interface Comment {
  id: number;
  author: string;
  content: string;
  timestamp: string;
}

interface Post {
  id: number;
  author: string;
  userType: 'customer' | 'mechanic';
  content: string;
  timestamp: string;
  comments: Comment[];
}

export default function MechanicMapScreen({ navigation }: { navigation: MechanicMapScreenNavigationProp }): React.ReactElement {
  const [location, setLocation] = useState<Location.LocationObject['coords'] | null>(null);
  const [radius, setRadius] = useState(25);
  const [mechanics, setMechanics] = useState<Mechanic[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);

  // Sample data (you would fetch this from your backend)
  const fakeMechanics: Mechanic[] = [
    { id: 1, name: "Joe's Garage", lat: 36.17, lon: -115.14 },
    { id: 2, name: "Quick Fix Auto", lat: 36.18, lon: -115.13 },
  ];
  
  // Sample posts data
  const fakePosts = [
    { id: 1, author: 'John D.', userType: 'customer', content: 'Anyone know a good place to fix my Honda Civic?', timestamp: '15 min ago', comments: [] },
    { id: 2, author: "Joe's Garage", userType: 'mechanic', content: "We specialize in Japanese cars. Offering 15% off on brake service this week!", timestamp: '2 hours ago', comments: [
      { id: 101, author: 'Sarah T.', content: 'Do you work on Toyotas too?', timestamp: '1 hour ago' }
    ] },
    { id: 3, author: 'Quick Fix Auto', userType: 'mechanic', content: 'Open today until 7pm for emergency repairs. Call us!', timestamp: '5 hours ago', comments: [] }
  ];

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'We need location access to find nearby mechanics.');
        return;
      }
      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
      
      // This would be replaced with actual API calls
      setMechanics(fakeMechanics);
      setPosts(fakePosts);
      
      // TODO: Fetch mechanics and posts from backend using loc.coords and radius
    })();
  }, [radius]);

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View style={styles.topBar}>
        <Text style={styles.title}>FixIt</Text>
        <TouchableOpacity onPress={() => navigation.navigate('EditAccount')}>
          <Text style={styles.actionBtn}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.actionBtn}>Sign Out</Text>
        </TouchableOpacity>
      </View>

      {/* Radius Filter */}
      <View style={styles.radiusContainer}>
        {[25, 50, 100].map((r) => (
          <Button key={r} title={`${r} miles`} onPress={() => setRadius(r)} />
        ))}
      </View>

      {/* Main Content Area */}
      <View style={styles.contentContainer}>
        {/* Map Section (Left Side) */}
        <View style={styles.mapContainer}>
          {location && (
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
              }}
            >
              {mechanics.map((m) => (
                <Marker key={m.id} coordinate={{ latitude: m.lat, longitude: m.lon }} title={m.name} />
              ))}
            </MapView>
          )}
          
          {/* Mechanics List */}
          <ScrollView style={styles.mechanicsListContainer}>
            <Text style={styles.sectionTitle}>Nearby Mechanics</Text>
            {mechanics.map((m) => (
              <View key={m.id} style={styles.mechanicCard}>
                <Text style={styles.cardTitle}>{m.name}</Text>
                <Button title="Message" onPress={() => navigation.navigate('Messages', { mechanicId: m.id })} />
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Posts Feed (Right/Center) */}
        <ScrollView style={styles.postsFeedContainer}>
          <View style={styles.newPostContainer}>
            <Button 
              title="What's your car problem?" 
              onPress={() => navigation.navigate('NewPost')} 
            />
          </View>
          
          {posts.map((post) => (
            <View key={post.id} style={styles.postCard}>
              <View style={styles.postHeader}>
                <Text style={styles.postAuthor}>{post.author}</Text>
                <Text style={styles.postTimestamp}>{post.timestamp}</Text>
              </View>
              <Text style={styles.postContent}>{post.content}</Text>
              
              {/* Comments */}
              {post.comments.length > 0 && (
                <View style={styles.commentsContainer}>
                  {post.comments.map((comment) => (
                    <View key={comment.id} style={styles.commentCard}>
                      <Text style={styles.commentAuthor}>{comment.author}</Text>
                      <Text style={styles.commentContent}>{comment.content}</Text>
                      <Text style={styles.commentTimestamp}>{comment.timestamp}</Text>
                    </View>
                  ))}
                </View>
              )}
              
              {/* Comment & Like Buttons */}
              <View style={styles.postActions}>
                <TouchableOpacity onPress={() => Alert.alert('Comment', 'Add comment feature')}>
                  <Text style={styles.actionText}>Comment</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Alert.alert('Like', 'Post liked')}>
                  <Text style={styles.actionText}>Like</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    paddingTop: 40,
    paddingBottom: 10,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    backgroundColor: '#eee',
  },
  title: { fontSize: 24, fontWeight: 'bold' },
  actionBtn: { color: 'blue', paddingHorizontal: 10 },
  radiusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  // Map section styles
  mapContainer: {
    width: '35%',
    padding: 10,
  },
  map: {
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  mechanicsListContainer: {
    flex: 1,
    maxHeight: 300,
  },
  mechanicCard: {
    backgroundColor: '#f5f5f5',
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  // Posts feed styles
  postsFeedContainer: {
    flex: 1,
    width: '65%',
    padding: 10,
  },
  newPostContainer: {
    marginBottom: 15,
  },
  postCard: {
    backgroundColor: '#f5f5f5',
    marginBottom: 15,
    padding: 15,
    borderRadius: 10,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  postAuthor: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  postTimestamp: {
    fontSize: 12,
    color: '#888',
  },
  postContent: {
    fontSize: 14,
    marginVertical: 8,
  },
  commentsContainer: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  commentCard: {
    backgroundColor: '#eaeaea',
    padding: 8,
    borderRadius: 8,
    marginTop: 5,
  },
  commentAuthor: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  commentContent: {
    fontSize: 12,
  },
  commentTimestamp: {
    fontSize: 10,
    color: '#888',
    alignSelf: 'flex-end',
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  actionText: {
    color: 'blue',
    fontSize: 14,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
});