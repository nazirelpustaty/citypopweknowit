import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableHighlight, View } from 'react-native';

import colors from '../config/colors'

const cities = [
    {
        id: 1,
        name: 'Stockholm', 
    },
    {
        id: 2,
        name: "Malmö"
    }
]

const City = ({ name }) => (
    <TouchableHighlight
        onPress={()=>console.log("pressed")}
        underlayColor={colors.lightGrey}>
        <View style={styles.item}>
            <Text style={styles.listText}>{name}</Text>
        </View>
    </TouchableHighlight>
  );

function ListScreen(props) {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Sweden</Text>
            <FlatList
                style={styles.list}
                data={cities}
                renderItem={({ item }) => (
                    <City name={item.name} />)}
                keyExtractor={city => city.id.toString()}
                />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
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
    list: {
        top: 200
    },
    listText: {
        textAlign: 'center',
        fontSize: 15
    },
    item: {
        backgroundColor: colors.silver,
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
      },
})

export default ListScreen;