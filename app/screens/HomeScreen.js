import React from 'react';
import { StyleSheet, Text, SafeAreaView, TouchableOpacity} from 'react-native';


import colors from '../config/colors'

// This function returns the first screen that the user sees when the app is opened.
function HomeScreen({navigation}) {
    return (
        // SafeAreaView is used to ensure that the front camera in the newer iPhones does not cover anything
        <SafeAreaView style={styles.homeContainer}>
            <Text style={styles.header}>CityPop</Text>
            <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate("Search", {title: "CITY"})}>
                <Text style={styles.text}>SEARCH BY CITY</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate("Search", {title: "COUNTRY"})}>
                <Text style={styles.text}>SEARCH BY COUNTRY</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    homeContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.primary,
        justifyContent: 'center'
    },
    header: {
        position: "absolute",
        top: 150,
        fontSize: 30,
        fontWeight: '500'
    },
    button: {
        backgroundColor: colors.primary,
        width: 500,
        height: 50,
        paddingVertical: 8,
        paddingHorizontal: 24,
        shadowColor: colors.shadowColor,
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