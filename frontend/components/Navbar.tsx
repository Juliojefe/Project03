// Add the navbar to any page by pasting: <Navbar></Navbar>

import {Link} from "react-router-dom";
import {StyleSheet, View} from "react-native";

export default function Navbar() {
    return (
        <View style={styles.container}>
            <Link to={'/'} style={styles.link}>Home</Link>
            <Link to={'/signup'} style={styles.link}>Signup</Link>
            <Link to={'/login'} style={styles.link}>Login</Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        flexDirection: "row"
    },
    link: {
        paddingLeft: 12,
        paddingRight: 12,
    }

})