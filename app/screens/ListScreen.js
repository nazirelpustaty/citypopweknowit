import React from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, TouchableHighlight, View } from 'react-native';

import colors from '../config/colors'
import ActivityIndicator from '../components/ActivityIndicator';


//This function handels when a city in the list is clicked
function onPressListElement(navigation, countryCode, cityName) {
    const cityNameEncoded = encodeURIComponent(cityName.trim().toLowerCase());
    //The country code is to ensure that we get the city from the right country
    const url = 'http://api.geonames.org/searchJSON?name_equals=' + cityNameEncoded + 
        '&featureClass=P&maxRows=1&orderby=population&username=weknowit&country=' 
        + countryCode;
    navigation.navigate("Result", {city: cityName, url: url});
}

export default class ListScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            url: this.props.route.params.url,
            searchText: this.props.route.params.country,
            found: false,
            done: false,
            cities: []
        }

    }

    //An element in the list
    City = ({ name}) => (
        <TouchableHighlight
            onPress={()=> onPressListElement(this.props.navigation, this.props.route.params.countryCode, name)}
            underlayColor={colors.lightGrey}>
            <View style={styles.item}>
                <Text style={styles.listText}>{name}</Text>
            </View>
        </TouchableHighlight>
    );

    fetchData() {
        console.log(this.state.url)
        fetch(this.state.url)
            .then((response) => response.json())
            .then((json) => {


            if(json.geonames.length >= 1) {
                this.setState({
                    found: true,
                    isLoading: false,
                    done: true,
                    cities: json.geonames.map(obj => {
                        let nObj = {}
                        nObj['id'] = obj.geonameId
                        nObj['name'] = obj.name
                        return nObj
                    })
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
                <SafeAreaView style={styles.container}>
                    <ActivityIndicator visible={true}/>
                </SafeAreaView>
            ); 
        } else if(this.state.done && !this.state.found)
        {
            return (
                <SafeAreaView style={styles.container}>
                    <Text style={styles.header}>{this.state.searchText} was not found please try again</Text>
                </SafeAreaView>
            );
        } else if (!this.state.isLoading && this.state.done && this.state.found)
        {
            return (
                <SafeAreaView style={styles.container}>
                    <Text style={styles.header}>{this.state.searchText}</Text>
                    <FlatList
                        style={styles.list}
                        data={this.state.cities}
                        renderItem={({ item }) => (
                            <this.City name={item.name} />)}
                        keyExtractor={city => city.id.toString()}
                        />
                </SafeAreaView>
            );
        }
    }
};



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
        fontWeight: '500',
        textAlign: 'center'
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