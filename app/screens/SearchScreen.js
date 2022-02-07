import React from 'react';
import { TouchableOpacity,  Image, StyleSheet, Text, TextInput} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import colors from '../config/colors'
import getCountryCode from '../helperFunctions/CountryCodes'
import containsSpecialChars from '../helperFunctions/ContainsSpecialChars'

// This variable handles the input in the TextInput
let searchText = '';
const saveUserInput = userInput => {
    searchText = userInput;
};

/* 
    This function handles when the user clicks the search button. Depending on whether the user chose to
    search for a country or a city in the HomeScreen, this functions makes a url that is used to request data
    from the GeoNames API. The function makes sure that the user enters something in the search bar and that
    the user is not using any special characters, otherwise the user gets an alert. The function also sends some 
    necessery variables when navigating to the next screen. 
    In case of country search: the text from the search bar, the country code and the url.
    In case of city search: the text from the search bar and the url.
*/
function onPressButtonSearch(navigation, searchType) {
    if (containsSpecialChars(searchText)) alert('Please avoid using special characters in your search!');
    else if(searchText.trim() == '')
    {   // When the user does not enter anything
        alert('You have to write something in the search bar above');
    } else {
        const searchTextEncoded = encodeURIComponent(searchText.trim().toLowerCase());
        let url;
        if(searchType == 'CITY') {
            // Feature class p in the url limits the search to cities and villages
            url = 'http://api.geonames.org/searchJSON?name_equals=' + 
                searchTextEncoded + '&featureClass=P&maxRows=1&orderby=population&username=weknowit';
            navigation.navigate("Result", {city: searchText, url: url})
        } else {
            // Country code is needed to limit the search to cities from a specific country.
            // The feature codes are to limit the search to capitals and cities that also needs
            // to be populated
            const countryCode = getCountryCode(searchText.trim().toLowerCase());
            url = 'http://api.geonames.org/searchJSON?q=' + 
                searchTextEncoded + '&maxRows=5&country=' + 
                countryCode + 
                '&orderby=population&featureCode=PPLA&featureCode=PPLC&username=weknowit';
            navigation.navigate("List", {country: searchText, countryCode: countryCode, url: url})
        } 
    }  
};

/*
    This function returns that screen that appears after the HomeScreen. Depending on the user's choice
    there, the screen is modified i.e. if it is a country or a city the user is searching for.
 */
function SearchScreen({route, navigation}) {
    return (
        // This view is used so that when the keyboard apears, it does not move the whole view up
        // This only works for ios. please read the README file for instructions on how to fix it for
        // Android
        <KeyboardAwareScrollView
            contentContainerStyle={styles.container}
            behavior={Platform.OS == "ios" ? "padding" : "height"} enabled={false}>
            <Text style={styles.header}>SEARCH BY {route.params.title}</Text>       
            <TextInput 
                style={styles.input}
                defaultValue=""
                placeholder={"Enter a " + route.params.title.toLowerCase()}
                onChangeText={userInput => saveUserInput(userInput)} >
            </TextInput>
            <TouchableOpacity style={styles.button} 
                onPress={() => onPressButtonSearch(navigation, route.params.title)}>
                <Image 
                    source={require('../assets/search.png')}
                    style={styles.icon} />
            </TouchableOpacity>
        </KeyboardAwareScrollView>  
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.primary,
        justifyContent: 'center',
    },
    header: {
        position: "absolute",
        top: 50,
        fontSize: 30,
        fontWeight: '500',
        textAlign: 'center'
    },
    icon:{
        width: 40, 
        height: 40,
    },
    button: {
        position: 'relative',
        top: 100
    },
    input: {
        height: 40,
        width: 300,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        textAlign:'center'
      },
})

export default SearchScreen;