import React from 'react';
import {StyleSheet, Text, SafeAreaView, View} from 'react-native';

import colors from "../config/colors"
import ActivityIndicator from '../components/ActivityIndicator';

export default class ResultScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            url: this.props.route.params.url,
            searchText: this.props.route.params.city,
            found: false,
            done: false,
            population: null
        }

    }

    fetchData() {
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
        //The GUI while the results are loading
        if(this.state.isLoading && !this.state.done)
        {
            this.fetchData();
            return (
                <SafeAreaView style={styles.homeContainer}>
                    <ActivityIndicator visible={true}/>
                </SafeAreaView>
            ); 
        // The GUI if no result was found or if the result is a place with population zero.
        } else if((this.state.done && !this.state.found) || this.state.population == 0 )
        {
            return (
                <SafeAreaView style={styles.homeContainer}>
                    <Text style={styles.header}>{this.state.searchText} was not found please try again</Text>
                </SafeAreaView>
            );
        // The GUI to present the results.
        } else if (!this.state.isLoading && this.state.done && this.state.found && this.state.population > 0)
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
        bottom: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    populationText: {
        fontSize: 30
    }
})
