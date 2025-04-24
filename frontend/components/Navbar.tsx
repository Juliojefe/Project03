// Add the navbar to any page by pasting: <Navbar></Navbar>

import {Link} from "react-router-dom";
import {StyleSheet, View} from "react-native";

export default function Navbar() {
    return (
        <View style={styles.container}>
            <Link to={'/'} style={styles.link}>Home</Link>
            <Link to={'/signup'} style={styles.link}>Signup</Link>
            <Link to={'/login'} style={styles.link}>Login</Link>
            <Link to={'/screen'} style={styles.link}>Screen</Link>
            <Link to={'/admin'} style={styles.link}>Admin</Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        flexDirection: "row",
        backgroundColor: "gray",
        padding: 10,
        borderRadius: 6,
    },
    link: {
        marginLeft: 12,
        marginRight: 12,
        padding: 4,
        borderRadius: 6,
        textDecorationLine: "none",
        backgroundColor: "white",
    }

})