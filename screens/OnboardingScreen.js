import * as React from 'react'
import { View, TextInput, TouchableOpacity, Text, StatusBar, Image, StyleSheet, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function OnboardingScreen({navigation}) {
    const [firstName, onFirstNameChange] = React.useState()
    const [email, onEmailChange] = React.useState()

    const saveUserData = async () => {
        if (firstName  && email) {
            try {
                await AsyncStorage.setItem('userName', firstName)
                await AsyncStorage.setItem('email', email)
                navigation.navigate('HomeScreen')
            } catch (error) {
                console.error(error)
            }
        } else {
            Alert.alert("Please filled the required fields")
        }

    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image style={styles.logo} source={require('../assets/Logo.png')} resizeMethod='scale'/>
            </View>
            <View style={styles.body}>
                <Text style={styles.welcomeText}>
                    Let's get to know you
                </Text>
                <TextInput
                    value={firstName} 
                    onChangeText={onFirstNameChange} 
                    style={styles.textInput}
                    placeholder="First Name"
                />
                <TextInput
                    value={email} 
                    onChangeText={onEmailChange} 
                    style={styles.textInput}
                    placeholder="Email"
                    keyboardType='email-address'
                />
            </View>
            <View style={{flex: 1, alignItems: 'flex-end', padding: 10}}>
                <TouchableOpacity style={styles.nextBtn} onPress={saveUserData}>
                    <Text style={{fontWeight: 'bold'}}>Next</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight,
        backgroundColor: '#eeeeee',
        marginTop: 25
    },
    header: {
        width: '100%',
        alignItems: 'center',
        padding: 5,
        backgroundColor: 'white'
    },
    logo: {
        height: 40,
        
    },  
    body: {
        flex: 1,
        alignItems: 'center',
        padding: 10
    },
    welcomeText: {
        marginTop: 50,
        marginBottom: 30,
        color: "#333333",
        fontWeight: 'bold',
        fontSize: 20

    },
    textInput: {
        width: "100%",
        height: 50,
        borderColor: '#333',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#fff',
        marginBottom: 20,
        padding: 5
    },
    nextBtn: {
        backgroundColor: '#F4CE14',
        padding: 10,
        width: 100,
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 50
        // paddingLeft: 20,
        // paddingRight: 20
    }
})
