import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';

export default function HomeScreen({ navigation }) {
  const featuredPosts = [
    {
      id: 1,
      author: 'Joe\'s Garage',
      rating: 4.8,
      content: '🚗 20% off brake service this week!',
    },
    {
      id: 2,
      author: 'Quick Fix Auto',
      rating: 4.6,
      content: '💥 Open for walk-ins this weekend.',
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🔧 Welcome to FixIt</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('SignUp')}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.secondaryButton]}
        onPress={() => navigation.navigate('Find Mechanics')}
      >
        <Text style={styles.buttonText}>Continue Without Account</Text>
      </TouchableOpacity>

      <View style={styles.preview}>
        <Text style={styles.previewTitle}>📌 Featured Posts</Text>
        {featuredPosts.map((post) => (
          <View key={post.id} style={styles.postPreview}>
            <Text style={styles.postAuthor}>
              {post.author} ⭐ {post.rating}
            </Text>
            <Text style={styles.postText}>{post.content}</Text>
          </View>
        ))}
        <TouchableOpacity
          onPress={() => Alert.alert('Sign In Required', 'Please log in to like or comment.')}
        >
          <Text style={styles.linkText}>See More</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.note}>* You must be signed in to interact with posts.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#f0f4f8',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#2563eb',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    width: '100%',
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: '#4b5563',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  preview: {
    marginTop: 30,
    width: '100%',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    elevation: 2,
  },
  previewTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  postPreview: {
    marginBottom: 10,
  },
  postAuthor: {
    fontWeight: 'bold',
    color: '#1e40af',
  },
  postText: {
    color: '#374151',
  },
  linkText: {
    color: '#2563eb',
    textAlign: 'right',
    fontWeight: '500',
  },
  note: {
    marginTop: 10,
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
});
