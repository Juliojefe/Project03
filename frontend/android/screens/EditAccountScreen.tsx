import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

export default function EditAccountScreen({ navigation, route }) {
  const userId = route?.params?.userId || 1; // use passed ID or fallback to test ID

  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleUpdate = async () => {
    try {
      if (!newName && !newEmail && !newPassword) {
        Alert.alert('Nothing to update', 'Fill at least one field.');
        return;
      }

      if (newName) {
        await fetch(`http://10.0.2.2:8080/api/user/update-name/${userId}/name`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: userId, name: newName }),
        });
      }

      if (newEmail) {
        await fetch(`http://10.0.2.2:8080/api/user/update-email/${userId}/email`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: userId, email: newEmail }),
        });
      }

      if (newPassword) {
        await fetch(`http://10.0.2.2:8080/api/user/update-password/${userId}/password`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: userId, password: newPassword }),
        });
      }

      Alert.alert('Success', 'Profile updated!');
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Update failed.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Account</Text>
      <TextInput
        style={styles.input}
        placeholder="New Name"
        onChangeText={setNewName}
        value={newName}
      />
      <TextInput
        style={styles.input}
        placeholder="New Email"
        autoCapitalize="none"
        onChangeText={setNewEmail}
        value={newEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="New Password"
        secureTextEntry
        onChangeText={setNewPassword}
        value={newPassword}
      />
      <Button title="Save Changes" onPress={handleUpdate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: '600', marginBottom: 20, textAlign: 'center' },
  input: { height: 48, borderColor: '#ccc', borderWidth: 1, borderRadius: 8, marginBottom: 16, paddingHorizontal: 12 },
});
