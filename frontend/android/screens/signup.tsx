import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function SignUpScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleSignUp = async () => {
    if (!username || !email || !password || !confirm) {
      Alert.alert('Error', 'Fill all fields.');
      return;
    }

    if (password !== confirm) {
      Alert.alert('Error', "Passwords don't match!");
      return;
    }

    try {
      const response = await fetch('http://10.0.2.2:8080/api/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: username,
          email: email,
          password: password,
          userType: 'regular_user',
        }),
      });

      if (!response.ok) throw new Error('Failed request');

      const result = await response.json();
      if (result === true) {
        Alert.alert('Success', 'Account created.');
        navigation.replace('Login');
      } else {
        Alert.alert('Signup Failed', 'Email might exist or password is invalid.');
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Server not reachable.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        autoCapitalize="none"
        onChangeText={setUsername}
        value={username}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
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

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        onChangeText={setConfirm}
        value={confirm}
      />

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Create Account</Text>
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
