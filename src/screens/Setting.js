import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import styles from '../styles'
import firebase from '../firebase'
export default class Setting extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Button
                    buttonStyle={styles.buttonStyle}
                    title='Log out'
                    onPress={() => {
                        firebase.auth().signOut()
                            .then((res) => this.props.navigation.replace('Login'))
                            .catch(err => alert(err))
                    }}
                />
            </View>
        )
    }
}
