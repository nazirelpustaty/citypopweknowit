import React from 'react';
import {ActivityIndicator, StyleSheet, Text, SafeAreaView, View} from 'react-native';

import colors from "../config/colors"

export default class ResultScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            url: this.props.route.params.url,
            searchText: this.props.route.params.city,
            found: false,
            done: false,
            population: 0
        }

    }

    fetchData() {
        console.log(this.state.url);
        fetch(this.state.url)
            .then((response) => response.json())
            .then((json) => {
            

            if(json.geonames.length >= 1) {
                this.setState({
                    found: true,
                    isLoading: false,
                    population: json.geonames[0]["population"],
                    done: true
                })
            } else {
                this.setState({
                    isLoading: false,
                    done: true
                })
            }
        })
        .catch((error) => {
        console.error(error);
        });
    }

    render() { 
        if(this.state.isLoading && !this.state.done)
        {
            this.fetchData();
            return (
                <SafeAreaView style={styles.homeContainer}>
                    <ActivityIndicator size="large"/>
                </SafeAreaView>
            ); 
        } else if(this.state.done && !this.state.found)
        {
            return (
                <SafeAreaView style={styles.homeContainer}>
                    <Text style={styles.header}>{this.state.searchText} was not found please try again</Text>
                </SafeAreaView>
            );
        } else if (!this.state.isLoading && this.state.done && this.state.found)
        {
            return (
                <SafeAreaView style={styles.homeContainer}>
                    <Text style={styles.header}>{this.state.searchText} </Text>
                    <View style={styles.textContainer}>
                        <Text style={styles.containerTitle}>Population</Text>
                        <Text style={styles.populationText}>{this.state.population}</Text>
                    </View>
                </SafeAreaView>
            );
        }
    }
};



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
        fontWeight: '500',
        textAlign: 'center'
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
