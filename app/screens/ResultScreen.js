import React from 'react';
import {StyleSheet, Text, SafeAreaView, View} from 'react-native';

import colors from "../config/colors"
import ActivityIndicator from '../components/ActivityIndicator';

/*
    This class is used to represent the screen that is shown when the user has searched for a city
    or clicked on a city from the list that is shown after the user has search for a country.
 */
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
            
            // If the city was found
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
        // The view that is shown when the data is loading
        if(this.state.isLoading && !this.state.done)
        {
            this.fetchData();
            return (
                <SafeAreaView style={styles.homeContainer}>
                    <ActivityIndicator visible={true}/>
                </SafeAreaView>
            );
          // The view that is shown when the search is done but no data is found or
          // when the population is zero which can sometimes be a returned data that
          // is irrelevant for us. E.g. an unpopulated place.
        } else if((this.state.done && !this.state.found) || this.state.population == 0 )
        {
            return (
                <SafeAreaView style={styles.homeContainer}>
                    <Text style={styles.header}>{this.state.searchText} was not found please try again</Text>
                </SafeAreaView>
            );
          // The view that is shown when the search is done and we got data of a city with population over zero
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
