import * as React from 'react'
import { View, Text, ActivityIndicator, StatusBar, StyleSheet } from 'react-native'


export default function SplashScreen() {
    return (
        <View style={styles.container}>
            <Text>Loading</Text>
            <ActivityIndicator size={'small'} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight,
        justifyContent: 'center',
        alignItems: 'center'
    }
})