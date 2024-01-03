import { useState, useEffect, useMemo, useCallback } from 'react'
import { 
    View, Text, StyleSheet, StatusBar, Pressable, Image, 
    ActivityIndicator, FlatList, TextInput, KeyboardAvoidingView,
    Alert, TouchableOpacity
} from 'react-native'
import debounce from 'lodash.debounce';
import { createTable, saveMenuItems, getMenuItems, filterByQueryAndCategories } from './database'
import MenuItem from '../components/MenuItem'
import Filters from '../components/Filters'
import { useUpdateEffect } from '../utils'


const categories = ['Starters', 'Mains', 'Desserts', 'Drinks'];

export default function HomeScreen({navigation}) {
    const [menuItems, setMenuItems] = useState()
    const [query, setQuery] = useState('')
    const [searchTerm, setSearchTerm] = useState('');
    const [filterSelections, setFilterSelections] = useState(
    categories.map(() => false)
  );
    const renderItem = ({item}) => <MenuItem item={item} />

    useEffect(() => {
        (async () => {
            try {
                await createTable()
                const menuItems = await getMenuItems()
                if (!menuItems.length) {
                    const response = await fetch('https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json')
                    const json = await response.json()
                    const menuItems = json.menu
                    saveMenuItems(menuItems)
                }
                setMenuItems(menuItems)
            } catch(error) {
                Alert.alert(e.message);
            }
        })()
    }, [])



  useUpdateEffect(() => {
    (async () => {
      const activeCategories = categories.filter((s, i) => {
        // If all filters are deselected, all categories are active
        if (filterSelections.every((item) => item === false)) {
          return true;
        }
        return filterSelections[i];
      });
      try {
        const menuItems = await filterByQueryAndCategories(
          query,
          activeCategories
        );
        setMenuItems(menuItems);
      } catch (e) {
        Alert.alert(e.message);
      }
    })();
  }, [filterSelections, query]);

  const lookup = useCallback((q) => {
    setQuery(q);
  }, []);

//   const debouncedLookup = useMemo(() => debounce(lookup, 500), [lookup]);

  const handleSearchChange = (text) => {
    setSearchTerm(text);
  };

  const handleFiltersChange = async (index) => {
    const arrayCopy = [...filterSelections];
    arrayCopy[index] = !filterSelections[index];
    setFilterSelections(arrayCopy);
  };

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
                    value={searchTerm}
                    onChangeText={handleSearchChange}
                    placeholder="Enter a Search Term"
                    style={styles.searchField}
                />
            </View>

            <View style={styles.body}>
                <Text style={styles.order}>ORDER FOR DELIVERY!</Text>
                {/* <View style={styles.categories}>
                    <TouchableOpacity>
                        <Text style={styles.category}>Starters</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.category}>Mains</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.category}>Desserts</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.category}>Drinks</Text>
                    </TouchableOpacity>
                </View> */}
                {menuItems === undefined ? 
                <>
                    <ActivityIndicator size={'large'} />
                </> 
                : menuItems === null ?
                    <Text>Failed to load menu items</Text>
                :
                <>
                    <FlatList data={menuItems} renderItem={renderItem} style={{height: 180}}/>
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
})