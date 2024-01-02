import * as React from 'react'
import {View, Text, StyleSheet, TouchableOpacity, TextInput, Image, StatusBar, Pressable, ScrollView} from 'react-native'
import {CheckBox} from 'react-native-btr'

export default function ProfileScreen() {
    const [isOrderChecked, setOrderChecked] = React.useState(false)
    const [isPasswordChecked, setPasswordChecked] = React.useState(false)
    const [isOffersChecked, setOffersChecked] = React.useState(false)
    const [isLetterChecked, setLetterChecked] = React.useState(false)
    
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Image style={styles.logo} source={require('../assets/Logo.png')} resizeMethod='scale'/>
            </View>
            <View style={styles.body}>
                <Text style={styles.title}>Personal Information</Text>
                <View style={styles.profileImageMainContainer}>
                    <View style={styles.profileImageInnerContainer}>
                        <Text>Avatar</Text>
                        <Image style={styles.profileImg} source={require('../assets/Profile.png')} />
                    </View>
                    <View style={styles.btnsContainer}>
                        <TouchableOpacity style={[styles.btn, {backgroundColor: '#495E57', borderRadius: 5}]}>
                            <Text style={{color: 'white', fontWeight: 'bold'}}>Change</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.btn, {backgroundColor: 'white', borderColor: '#495E57', borderWidth: 1}]}>
                            <Text>Remove</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.inputFields}>
                    <Text>First Name</Text>
                    <TextInput
                        value='' 
                        style={styles.inputField}
                        onChangeText={() => {}} 
                        placeholder='First Name'
                    />
                    <Text>Last Name</Text>
                    <TextInput
                        value='' 
                        style={styles.inputField}
                        onChangeText={() => {}} 
                        placeholder='Last Name'
                    />
                    <Text>Email</Text>
                    <TextInput
                        value='' 
                        style={styles.inputField}
                        onChangeText={() => {}} 
                        placeholder='Email'
                    />
                    <Text>Phone Number</Text>
                    <TextInput
                        value='' 
                        style={styles.inputField}
                        onChangeText={() => {}} 
                        placeholder='Phone Number'
                    />
                </View>
                <View>
                    <Text style={styles.title}>Email Notifications</Text>
                    <Pressable style={styles.checkboxRow} onPress={(value) => setOrderChecked(!isOrderChecked)}>
                        <CheckBox checked={isOrderChecked} onPress={(value) => setOrderChecked(!isOrderChecked)} />
                        <Text style={styles.checkBoxTxt}>Order statuses</Text>
                    </Pressable>
                    <Pressable style={styles.checkboxRow} onPress={(value) => setPasswordChecked(!isPasswordChecked)}>
                        <CheckBox checked={isPasswordChecked} onPress={(value) => setPasswordChecked(!isPasswordChecked)}/>
                        <Text style={styles.checkBoxTxt}>Password Changes</Text>
                    </Pressable>
                    <Pressable style={styles.checkboxRow} onPress={(value) => setOffersChecked(!isOffersChecked)}>
                        <CheckBox checked={isOffersChecked} onPress={(value) => setOffersChecked(!isOffersChecked)} />
                        <Text style={styles.checkBoxTxt}>Specific Offers</Text>
                    </Pressable>
                    <Pressable style={styles.checkboxRow} onPress={(value) => setLetterChecked(!isLetterChecked)}>
                        <CheckBox checked={isLetterChecked} onPress={(value) => setLetterChecked(!isLetterChecked)}/>
                        <Text style={styles.checkBoxTxt}>News Letter</Text>
                    </Pressable>
                </View>
                <TouchableOpacity style={styles.logoutBtn}>
                    <Text style={styles.logoutBtnTxt}>Log out</Text>
                </TouchableOpacity>
                <View style={styles.bottomBtns}>
                    <TouchableOpacity>
                        <Text style={[styles.btn, {backgroundColor: 'white', borderColor: '#495E57', borderWidth: 1, borderRadius: 5}]}>Discard changes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={[styles.btn, {backgroundColor: '#495E57', borderRadius: 5, color: 'white', fontWeight: 'bold'}]}>Save changes</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: StatusBar.currentHeight
    },
    header: {
        width: '100%',
        alignItems: 'center',
        padding: 5,
        backgroundColor: 'white'
    },
    body: {
        // flex: 1,
        padding: 10,
        // height: 100,
        borderWidth: 1,
        borderColor: '#bbb',
        borderRadius: 5
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 10,
        marginBottom: 15
    },
    profileImageMainContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    profileImg: {
        width: 100,
        height: 100,
        borderRadius: 50
    },
    btnsContainer: {
        width: '50%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 20
    },
    btn: {
        // backgroundColor: 'red',
        // width: 70,
        alignItems: 'center',
        padding: 8
    },
    inputFields: {
        marginTop: 20

    },
    inputField: {
        backgroundColor: 'white',
        height: 40,
        padding: 5,
        borderWidth: 1,
        borderColor: "#aaa",
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 15
    },
    checkboxRow: {
        width: '100%',
        flexDirection: 'row',
        marginBottom: 10,
    },
    checkBoxTxt: {
        marginLeft: 10
    },
    logoutBtn: {
        width: '100%',
        backgroundColor: '#F4CE14',
        marginTop: 30,
        alignItems: 'center',
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'yellow'
    },
    logoutBtnTxt: {
        fontWeight: 'bold'
    },
    bottomBtns: {
        marginTop: 20,
        marginBottom: 30,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        // backgroundColor: 'red'
    }

})