import React from 'react';
import { TouchableOpacity,  Image, StyleSheet, Text, TextInput} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import colors from '../config/colors'
import getCountryCode from '../helperFunctions/countrycodes'

let searchText = '';
const saveUserInput = userInput => {
    searchText = userInput;
};

function onPressButtonSearch(navigation, searchType) {
    if(searchText == '')
    {
        alert('You have to write something in the search bar above');
    } else {
        const searchTextEncoded = encodeURIComponent(searchText.toLowerCase());
        let url;
        if(searchType == 'CITY') {
            url = 'http://api.geonames.org/searchJSON?q=' + searchTextEncoded + '&maxRows=1&orderby=population&featureCode=PPLA&featureCode=PPLC&username=weknowit';
            navigation.navigate("Result", {city: searchText, url: url})
        } else {
            const countryCode = getCountryCode(searchText.toLowerCase());
            url = 'http://api.geonames.org/searchJSON?q=' + searchTextEncoded + '&maxRows=5&country=' + countryCode + '&orderby=population&featureCode=PPL&featureCode=PPLA&featureCode=PPLC&username=weknowit';
            navigation.navigate("List", {country: searchText, countryCode: countryCode, url: url})
        } 
    }  
};

function SearchScreen({route, navigation}) {
    return (
        <KeyboardAwareScrollView
            contentContainerStyle={styles.container}
            enableOnAndroid={true}
            keyboardShouldPersistTaps='handled'>

            <Text style={styles.header}>SEARCH BY {route.params.title}</Text>       
            <TextInput 
                style={styles.input}
                placeholder={"Enter a " + route.params.title.toLowerCase()}
                onChangeText={userInput => saveUserInput(userInput)} >
            </TextInput>
            <TouchableOpacity style={styles.button} onPress={() => onPressButtonSearch(navigation, route.params.title)}>
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
        zIndex: 1,
    },
    header: {
        position: "absolute",
        top: 150,
        fontSize: 60,
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