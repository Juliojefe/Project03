import {Button, ScrollView, StyleSheet, Text, View} from 'react-native';
import Navbar from "../components/Navbar";

export default function Home() {
    // creates a mechanic request
    const createRequest= (firstName = "FirstName", lastName = "LastName") => {
        return (
            <View style={styles.pendingMechanic}>
                <Text>
                    {firstName} {lastName}
                </Text>
                <Button title={"Accept"} onPress={() => alert('Accepted')}></Button>
                <Button title={"Decline"} onPress={() => alert('Declined')}></Button>
            </View>
        );
    }

    // list containing mechanic requests
    let requests = [];
    // using parameters to send name
    requests.push(createRequest("Test", "Subject"));
    for (let i = 0; i < 30; i++){
        requests.push(createRequest());
    }

    return (
        <View style={styles.container}>
            <Navbar></Navbar>
            <Text style={styles.title}>
                Admin Dashboard
            </Text>

            {/*needs to be connected to backend*/}
            <ScrollView>
                {/*this inserts the created mechanic requests*/}
                {requests}
            </ScrollView>

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