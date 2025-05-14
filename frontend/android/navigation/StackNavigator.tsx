import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/login';
import SignUpScreen from '../screens/signup';
import MechanicMapScreen from '../screens/MechanicMapScreen';
import PostsScreen from '../screens/PostsScreen';
import EditAccountScreen from '../screens/EditAccountScreen';
import AdminDashboard from '../screens/AdminDashboard';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Find Mechanics" component={MechanicMapScreen} />
      <Stack.Screen name="Posts" component={PostsScreen} />
      <Stack.Screen name="EditAccount" component={EditAccountScreen} />
      <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
    </Stack.Navigator>
  );
}
