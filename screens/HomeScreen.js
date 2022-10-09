import React, {useEffect, useState} from "react";
import {FlatList, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View} from "react-native";

export default function HomeScreen(navigation){
    const [emails, setEmails] = useState([]);

    useEffect(function (){
        async function getData(){
            const response = await fetch('https://mobile.ect.ufrn.br:3002/emails');
            const emails = await response.json();
            setEmails(emails)
        }
        getData();
    }, [])

    function renderItem({item}){
        return(
            <TouchableOpacity style={styles.email}>

                <Image style={styles.img} source={{uri: item.picture}}/>
                <View style={styles.emailInfo}>

                    <Text style={styles.boldFont}>{item.from}</Text>
                    <Text style={styles.boldFont}>{item.tittle}</Text>
                    <Text>{item.summary}</Text>

                </View>
                <View style={styles.emailDetail}>

                    <Text>{item.time}</Text>

                </View>

            </TouchableOpacity>
        );
    }

    return(
        <View style={styles.container}>

            <StatusBar style="auto"/>

            <FlatList
                data={emails}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
            />

        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f00",
    },
    email: {
        height: 100,
        flexDirection: "row",
        backgroundColor: "#fff",
        justifyContent: "center",
    },
    img: {
        height: 80,
        width: 80,
        borderRadius: 40,
    },
    emailInfo: {

    },
    emailDetail: {

    },
    boldFont: {
        fontWeight: "bold",
    },
})