import React from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, TextInput, TouchableOpacity, KeyboardAvoidingView} from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'



function SearchScreen(props) {
    return (
        
        <KeyboardAwareScrollView
            contentContainerStyle={styles.container}>

            
            <Text style={styles.header}>SEARCH BY CITY</Text>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                <TextInput 
                    style={styles.input}
                    placeholder="Enter a city">
                </TextInput>
            </KeyboardAvoidingView>
            <TouchableOpacity onPress={()=> console.log("Pressed")}>
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
        backgroundColor: 'white',
        justifyContent: 'center'
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
        top: 200
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