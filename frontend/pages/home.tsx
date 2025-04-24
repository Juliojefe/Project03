import { StyleSheet, Text, View } from 'react-native';
import Navbar from "../components/Navbar";

export default function Home() {
    return (
        <View style={styles.container}>
            <Navbar></Navbar>
            <Text style={styles.text}>
                Home Page
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#fff',
    },
    text: {
        textAlign: "center",
        fontSize: 30,
        alignItems: "center",
        justifyContent: "center",
    },
});
