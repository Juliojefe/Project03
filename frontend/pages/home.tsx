import { StyleSheet, Text, View } from 'react-native';
import Navbar from "../components/Navbar";

export default function Home() {
    return (
        <View style={styles.container}>
            <Navbar></Navbar>
            <Text>
                <h1>Home Page</h1>
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
