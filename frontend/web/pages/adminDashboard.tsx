import {Button, StyleSheet, Text, View} from 'react-native';
import Navbar from "../components/Navbar";

export default function Home() {
    return (
        <View style={styles.container}>
            <Navbar></Navbar>
            <Text style={styles.title}>
                Admin Dashboard
            </Text>

            {/*template for users requesting to become mechanics*/}
            {/*will be implemented later to create this template for each user and add to a list*/}
            {/*needs to be connected to backend*/}
            <View style={styles.pendingMechanic}>
                <Text>
                    FirstName LastName
                </Text>
                <Button title={"Accept"} onPress={() => alert('Accepted')}></Button>
                <Button title={"Decline"} onPress={() => alert('Declined')}></Button>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#fff',
    },
    title: {
        textAlign: "center",
        fontSize: 30,
        alignItems: "center",
        justifyContent: "center",
    },
    pendingMechanic: {
        display: "flex",
        alignContent: "space-evenly",
        flexDirection: "row",
        backgroundColor: "aliceblue",
        justifyContent: "center",
        borderRadius: 6,
    },
});
