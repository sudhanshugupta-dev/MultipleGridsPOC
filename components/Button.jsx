import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const Button = () =>{
    return (
        <TouchableOpacity style={styles.button} testID="custom-button">
            <Text>Button</Text>
        </TouchableOpacity>
    )
}

export default Button;

const styles = StyleSheet.create({
    button:{
        backgroundColor:'red',
        height:'20%',
        borderRadius:10,
        alignContent:"center",
        justifyContent:"center",
    }
})