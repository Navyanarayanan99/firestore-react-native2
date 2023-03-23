import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import firestore from '@react-native-firebase/firestore';
const HomeScreen = () => {
    let [listData, setListData] = useState([]);
    console.log(listData)
    async function getUser() {
        await firestore()
            .collection('users')
            .onSnapshot((querySnapshot) => {
                let temp = [];
                console.log('Total users: ', querySnapshot.size);
                querySnapshot.forEach((documentSnapshot) => {
                    console.log('user Id: ', documentSnapshot.id);
                    let userDetails = {};
                    userDetails = documentSnapshot.data();
                    userDetails['id'] = documentSnapshot.id;
                    temp.push(userDetails);
                    setListData(temp);
                });
            });
    }
    useEffect(() => {
        getUser()
    }, []);
    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={listData}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity style={styles.userCard} key={index} >
                            <Text style={styles.userCardText}>{index + 1}</Text>
                            <Text style={styles.userCardText}>{item.username}</Text>
                            <Text style={styles.userCardText}>{item.email}
                            </Text>
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    userCard: {
        width: 120 * 3,
        height: 55,
        backgroundColor: "#000",
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        margin: 10
    },
    userCardText: {
        color: "#ffffff",
        fontSize: 16,
    },
})