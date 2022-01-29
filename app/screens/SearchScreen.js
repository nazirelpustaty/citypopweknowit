import React from 'react';
import { ActivityIndicator,TouchableOpacity,  Image, StyleSheet, Text, TextInput} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import colors from '../config/colors'

let searchText = '';
const saveUserInput = userInput => {
    searchText = userInput;
};

function onPressButtonSearch(searchType) {
    if(searchText == '')
    {
        alert('You have to write something in the search bar above');
    }
    const searchTextEncoded = encodeURIComponent(searchText);
};

function SearchScreen({route}) {
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
            <TouchableOpacity style={styles.button} onPress={() => onPressButtonSearch(route.params.title)}>
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