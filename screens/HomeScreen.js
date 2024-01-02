import * as React from 'react'
import { 
    View, Text, StyleSheet, StatusBar, Pressable, Image, 
    ActivityIndicator, FlatList, TextInput, KeyboardAvoidingView
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'


export default function HomeScreen({navigation}) {
    const [menuItems, setMenuItems] = React.useState()
    const renderItem = ({item}) => {
        // const [isLoading, setIsloading] = React.useState(true)


        return <View style={{
            flexDirection: 'row',
            width: '100%', 
            height: 150,
            alignItems: 'center', 
            justifyContent: 'space-between',
            borderBottomWidth: 1,
            borderColor: '#aaa',
            paddingBottom: 5
            }}>
            <View style={{width: '70%'}}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDescription}>{item.description}</Text>
                <Text style={styles.price}>${item.price}</Text>
            </View>
            <Image 
                source={{uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${item.image}?raw=true`}} 
                style={{width: 100, height: 120}} 
                />
        </View>
    }

    React.useEffect(() => {
        fetch('https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json')
            .then((response) => response.json())
            .then(json => {
                setMenuItems(json.menu)
                console.log(json.menu)
            })
            .catch(error => {
                setMenuItems(null)
            })
    }, [])
    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
            <View style={styles.header}>
                <Image style={styles.logo} source={require('../assets/Logo.png')} />
                <Pressable style={styles.profileBtn} onPress={() => {navigation.navigate("ProfileScreen")}}>
                    <Image source={require('../assets/Profile.png')} style={styles.profileImg}/>
                </Pressable>
            </View>

            {/* Beginning of Hero Section */}
            <View style={styles.heroSection}>
                <Text style={styles.name}>Little Lemon</Text>
                <View style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between'

                    }}>
                    <View style={{
                        width: '50%',
                        // marginRight: 10
                    }}>
                        <Text style={styles.location}>Chicago</Text>
                        <Text style={styles.description}>
                            We are a family owned Mediterranean resturant, 
                            focuced on traditional recipes served with a modern twist
                        </Text>
                    </View>
                    <Image source={require('../assets/HeroImage.png')} style={styles.heroImg} />
                </View>
                <TextInput 
                    value=''
                    onChangeText={() => {}}
                    placeholder="Enter a Search Term"
                    style={styles.searchField}
                />
            </View>

            <View style={styles.body}>
                <Text style={styles.order}>ORDER FOR DELIVERY!</Text>
                <View style={styles.categories}>
                    <Text style={styles.category}>Starters</Text>
                    <Text style={styles.category}>Mains</Text>
                    <Text style={styles.category}>Desserts</Text>
                    <Text style={styles.category}>Drinks</Text>
                </View>
                {menuItems === undefined ? 
                <>
                    <ActivityIndicator size={'large'} />
                </> 
                : menuItems === null ?
                <Text>Failed to load menu items</Text>
                :
                <>
                <FlatList data={menuItems} renderItem={renderItem} style={{height: 180}}/>
                {/* <Text>FOund</Text> */}
                </>
                }
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight,
        backgroundColor: 'white'
    },
    header: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: 10,
        // backgroundColor: 'white'
    },
    logo: {
        marginRight: 40
    },  
    profileBtn: {
        width: 50,
        height: 50,
        backgroundColor: 'red',
    },
    profileImg: {
        width: 50,
        height: 50
    },
    heroSection: {
        width: '100%',
        backgroundColor: '#495E57',
        padding: 10
    },
    name: {
        color: '#F4CE14',
        fontSize: 32
    },
    location: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    },
    description: {
        color: 'white',
        fontSize: 14
    },
    heroImg: {
        width: 150,
        height: 150,
        borderRadius: 20
    },
    searchField: {
        backgroundColor: 'white',
        height: 40,
        marginTop: 10,
        borderRadius: 5,
        paddingLeft: 5
    },  
    body: {
        width: '100%',
        padding: 10,
    },
    order: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10
    },
    categories: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        borderBottomWidth: 1,
        paddingBottom: 15,
        borderColor: '#aaa'
    },
    category: {
        padding: 10,
        backgroundColor: '#EDEFEE',
        color: '#333333',
        borderRadius: 10,
        fontWeight: 'bold'
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