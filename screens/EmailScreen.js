import React, {useEffect, useState} from "react";
import {Image, StyleSheet, Text, View} from "react-native";
import {FontAwesome5} from '@expo/vector-icons';
import { WebView } from "react-native-webview";

export default function EmailScreen({ route }){
    const { id } = route.params;
    const [email, setEmail] = useState([]);

    useEffect(function (){
        async function getData(){
            const response = await fetch('https://mobile.ect.ufrn.br:3002/emails/' + id);
            const email = await response.json();
            setEmail(email)
        }
        getData();
    }, [])

    return(
        <View style={styles.container}>

            <View style={styles.title}>

                <Text style={styles.titleFont}>{email.tittle}</Text>
                <FontAwesome5 name='star' solid={email.star ? true : false} size={24} color='yellow'/>

            </View>

            <View style={styles.info}>

                <View style={styles.line}>

                    <Image style={styles.img} source={{ uri: email.picture}}/>
                    <View>

                        <Text style={styles.boldFont}>{email.from}</Text>
                        <Text style={styles.toFont}>{email.to}</Text>

                    </View>

                </View>
                <View>

                    <Text>{email.time}</Text>

                </View>

            </View>

            <View style={styles.body}>

                <Text>{email.body}</Text>

            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    title: {
        height: 60,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 5,
    },
    titleFont: {
        fontWeight: "bold",
        fontSize: 20,
    },
    info: {
        height: 60,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 5,
    },
    img: {
        height: 40,
        width: 40,
        borderRadius: 20,
        margin: 5,
    },
    boldFont: {
        fontWeight: "bold",
        fontSize: 15,
    },
    toFont: {
        fontSize: 12,
    },
    line: {
        flexDirection: "row",
    },
    body: {
        backgroundColor: "gray",
        flex: 1,
    },
});