import { View, Text, Button } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  'Find Mechanics': undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Find Mechanics'>;

export default function HomeScreen({ navigation }: { navigation: HomeScreenNavigationProp }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to FixIt</Text>
      <Button title="Find Mechanics Near Me" onPress={() => navigation.navigate('Find Mechanics')} />
    </View>
  );
}
