import React, {useEffect, useState} from "react";
import {FlatList, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {FontAwesome5} from '@expo/vector-icons';

export default function HomeScreen({navigation}){
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
            <TouchableOpacity style={styles.email} onPress={() => navigation.navigate('EmailScreen', { id: item.id })}>

                <View style={styles.emailInfo}>

                    <Image style={styles.img} source={{uri: item.picture}}/>
                    <View>

                        <Text style={styles.boldFont}>{item.from}</Text>
                        <Text style={styles.boldFont}>{item.tittle}</Text>
                        <Text>{item.summary}</Text>

                    </View>

                </View>
                <View style={styles.emailDetail}>

                    <Text>{item.time}</Text>
                    <FontAwesome5 name='star' solid={item.star ? true : false} size={24} color='yellow'/>

                </View>

            </TouchableOpacity>
        );
    }

    return(
        <View style={styles.container}>

            <StatusBar style="auto"/>

            <View style={styles.header}>

                <Text style={styles.headerFont}>Caixa de Entrada</Text>

                <FontAwesome5 name="ellipsis-h" size={24} color="black"/>

            </View>

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
        backgroundColor: "#fff",
    },
    email: {
        height: 100,
        flexDirection: "row",
        backgroundColor: "#fff",
        justifyContent: "space-between",
        alignItems: "center",
        margin: 10,
    },
    img: {
        height: 80,
        width: 80,
        borderRadius: 40,
        marginRight: 10,
    },
    emailInfo: {
        flexDirection: "row",
        alignItems: "center",

    },
    emailDetail: {
        justifyContent: "center",
        alignItems: "center",
    },
    boldFont: {
        fontWeight: "bold",
    },
    headerFont: {
        fontWeight: "bold",
        fontSize: 25,
    },
    header: {
        height: 50,
        flexDirection: "row",
        padding: 5,
        justifyContent: "space-between",
        alignItems: "center",
    },
})