import React from 'react';
import { StyleSheet, Text, SafeAreaView, View} from 'react-native';

import colors from "../config/colors"

function ResultScreen(props) {
    return (
        <SafeAreaView style={styles.homeContainer}>
            <Text style={styles.header}>Stockholm</Text>
            <View style={styles.textContainer}>
                <Text style={styles.containerTitle}>Population</Text>
                <Text style={styles.populationText}>1 000 000</Text>
            </View>
            
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
    textContainer: {
        backgroundColor: colors.lightGrey,
        height: 200,
        width: '90%',
        bottom: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    populationText: {
        fontSize: 30
    }
})

export default ResultScreen;