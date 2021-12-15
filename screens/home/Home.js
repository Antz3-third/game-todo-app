import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { getDatabase, onValue, set, ref } from "firebase/database";
import styles from "./styles"

const Home = (props) => {

    const db = getDatabase();
    const profileRef = ref(db, "profiles/" + props.userId);
    
    const signOut = ()  => {
        props.userAuth.signOut()
        
    }

    useEffect(() => {
       if (props.userId === "")
       props.navigation.navigate("Login")
    }, [props.userId])
    
    return (
        <View style={styles.container}>
        <TouchableOpacity>
            <Text>Profile</Text>
        </TouchableOpacity>
        
        <TouchableOpacity>
            <Text>Add Todos</Text>
        </TouchableOpacity>
        
        <TouchableOpacity>
            <Text>View Todos</Text>
        </TouchableOpacity>

        <TouchableOpacity>
            <Text>Completed Todos</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={signOut}>
            <Text>Sign Out</Text>
        </TouchableOpacity>
        </View>
        
        
        
    )
}

export default Home;

