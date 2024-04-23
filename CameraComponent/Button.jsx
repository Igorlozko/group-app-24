import * as React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Entypo} from '@expo/vector-icons';

export default function Button{{title, onPress, icon, colour}} {
    return(
        <TouchableOpacity style={styles.button} onPress={onPress}>
        <Entypo name={icon} size={28} color={colour ? colour : '#f1f1f1'} />
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    )
}