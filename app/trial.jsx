import React from "react";
import { StyleSheet, View } from "react-native";
import Button from "../components/Button";

const Trial = () =>{
    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <Button />
            </View>
        </View>
    )
}

export default Trial;

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    buttonContainer:{
        height:'30%',
        justifyContent:"center",
    }
})