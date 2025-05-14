import React, { useEffect, useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, View, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';

type MechanicRequest = {
  id: number;
  firstName: string;
  lastName: string;
  email?: string; // optional if needed for display
};

export default function AdminDashboard(): JSX.Element {
  const [requests, setRequests] = useState<MechanicRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://10.0.2.2:8080/api/admin/mechanic-requests');
      setRequests(response.data);
    } catch (error) {
      console.error('Error fetching mechanic requests:', error);
      Alert.alert('Error', 'Could not load requests from server.');
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (id: number) => {
    try {
      await axios.post(`http://10.0.2.2:8080/api/admin/approve/${id}`);
      Alert.alert('Accepted', `Mechanic #${id} approved.`);
      fetchRequests(); // Refresh the list
    } catch (error) {
      console.error('Accept failed:', error);
      Alert.alert('Error', 'Could not approve mechanic.');
    }
  };

  const handleDecline = async (id: number) => {
    try {
      await axios.post(`http://10.0.2.2:8080/api/admin/decline/${id}`);
      Alert.alert('Declined', `Mechanic #${id} declined.`);
      fetchRequests(); // Refresh the list
    } catch (error) {
      console.error('Decline failed:', error);
      Alert.alert('Error', 'Could not decline mechanic.');
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {requests.length === 0 ? (
            <Text style={styles.noRequests}>No pending requests.</Text>
          ) : (
            requests.map(({ id, firstName, lastName }) => (
              <View key={id} style={styles.pendingMechanic}>
                <Text style={styles.requestText}>
                  {firstName} {lastName}
                </Text>
                <Button title="Accept" onPress={() => handleAccept(id)} />
                <Button title="Decline" onPress={() => handleDecline(id)} />
              </View>
            ))
          )}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 12,
  },
  scrollContainer: {
    paddingBottom: 100,
  },
  pendingMechanic: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f0f8ff',
    padding: 10,
    marginVertical: 6,
    borderRadius: 8,
  },
  requestText: {
    flex: 1,
    fontSize: 16,
    marginRight: 10,
  },
  noRequests: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
    color: 'gray',
  },
});
