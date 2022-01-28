import React from 'react';
import { ActivityIndicator,TouchableOpacity,  Image, StyleSheet, Text, TextInput} from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import colors from '../config/colors'

function SearchScreen(props) {
    return (
        
        <KeyboardAwareScrollView
            contentContainerStyle={styles.container}
            enableOnAndroid={true}
            keyboardShouldPersistTaps='handled'>

            <Text style={styles.header}>SEARCH BY CITY</Text>       
            <TextInput 
                style={styles.input}
                placeholder="Enter a city">
            </TextInput>
            <TouchableOpacity style={styles.button} onPress={()=> console.log("Pressed")}>
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