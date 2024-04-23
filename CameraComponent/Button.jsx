import * as React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Entypo} from '@expo/vector-icons';

export default function Button({title, onPress, icon, colour}) {
    return(
        <TouchableOpacity onPress={onPress} style={styles.button}>
        <Entypo name={icon} size={28} color={colour ? colour : '#f1f1f1'} />
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        backgroundColor: '#f1f1f1',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 20,
        color: '#f1f1f1',
        marginLeft: 10
    }
})
