import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Fill all fields.');
      return;
    }

    // 🔐 Hardcoded admin login
    if (email === 'admin@admin.com' && password === 'Abc123!') {
      Alert.alert('Admin Login', 'Logged in as admin.');
      navigation.replace('AdminDashboard');
      return;
    }

    try {
      const response = await fetch('http://10.0.2.2:8080/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error('Failed request');

      const user = await response.json();
      if (user && user.email) {
        Alert.alert('Login Success', 'Welcome back!');
        navigation.replace('Find Mechanics');
      } else {
        Alert.alert('Login Failed', 'Invalid credentials.');
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Server not reachable or login failed.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 32, marginBottom: 32, fontWeight: '600', textAlign: 'center', color: '#333' },
  input: { height: 48, borderColor: '#ccc', borderWidth: 1, borderRadius: 8, paddingHorizontal: 12, marginBottom: 16 },
  button: { backgroundColor: '#4A90E2', paddingVertical: 14, borderRadius: 8, marginTop: 12 },
  buttonText: { color: '#fff', fontWeight: '600', textAlign: 'center', fontSize: 16 },
});
