import { View, Text, Image, StyleSheet } from "react-native"

export default function MenuItem({item}) {
    return (
        <View style={styles.container}>
            <View style={{width: '70%'}}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDescription}>{item.description}</Text>
                <Text>${item.price}</Text>
            </View>
            <Image 
                source={{uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${item.image}?raw=true`}} 
                style={{width: 100, height: 120}} 
                />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%', 
        height: 150,
        alignItems: 'center', 
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: '#aaa',
        paddingBottom: 5
    },
    itemName: {
        fontWeight: 'bold',
        marginBottom: 5,
        marginTop: 5
    },
    itemDescription: {
        color: '#555555',
        marginBottom: 5
    }
})