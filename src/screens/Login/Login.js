import React, { Component } from 'react'
import { Text, View, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from 'react-native'
import styles from '../../styles'
import { Button, Input } from 'react-native-elements'
import firebase from '../../firebase'

export default class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
        }
    }

    render() {
        return (
            <TouchableWithoutFeedback style={styles.container} onPress={() => Keyboard.dismiss()} >

                <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>

                    <Text style={{ fontSize: 20 }}> Login </Text>
                    <Input
                        ref='email'
                        containerStyle={styles.inputStyle}
                        value={this.state.email}
                        placeholder='Email...'
                        onChangeText={email => this.setState({ email })}
                        autoCapitalize='none'
                        autoCorrect={false}
                        returnKeyType='next'
                        onSubmitEditing={() => this.refs.password.focus()}
                    />

                    <Input
                        ref='password'
                        containerStyle={styles.inputStyle}
                        value={this.state.password}
                        placeholder='Password...'
                        onChangeText={password => this.setState({ password })}
                        secureTextEntry
                    />
                    <Button
                        title='Login'
                        buttonStyle={styles.buttonStyle}
                        onPress={this._onPressLogin} />

                    <Button
                        title='Register'
                        buttonStyle={styles.buttonStyle}
                        onPress={() => this.props.navigation.push('Register')}
                    />
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        )
    }

    _onPressLogin = async () => {
        const { email, password } = this.state
        await firebase.auth().signInWithEmailAndPassword(email, password)
            .then(res => this.props.navigation.replace('BottomHome'))
            .catch(err => alert('Error', err))
    }
}
