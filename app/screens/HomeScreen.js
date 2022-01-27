import React from 'react';
import { StyleSheet, Text, SafeAreaView, TouchableOpacity} from 'react-native';

function HomeScreen(props) {
    return (
        <SafeAreaView style={styles.homeContainer}>
            <Text style={styles.header}>CityPop</Text>
            <TouchableOpacity style={styles.button} onPress={()=> console.log("Pressed")}>
                <Text style={styles.text}>SEARCH BY CITY</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={()=> console.log("Pressed")}>
                <Text style={styles.text}>SEARCH BY COUNTRY</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    homeContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'center'
    },
    header: {
        position: "absolute",
        top: 150,
        fontSize: 30,
        fontWeight: '500'
    },
    button: {
        backgroundColor: 'white',
        width: 500,
        height: 50,
        paddingVertical: 8,
        paddingHorizontal: 24,
        shadowColor: "#2a2a2a",
        shadowOpacity:0.15,
        shadowRadius: 4,
        shadowOffset:{
            width: 0,
            height: 2
        },
        elevation: 2
    },
    text: {
        textAlign: 'center'
    }
})

export default HomeScreen;