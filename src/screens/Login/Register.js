import React, { Component } from 'react'
import { Text, View, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from 'react-native'
import styles from '../../styles'
import { Button, Input } from 'react-native-elements'

import firebase from '../../firebase'

export default class Register extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            repass: ''
        }
    }

    render() {
        return (
            <TouchableWithoutFeedback style={styles.container} onPress={() => Keyboard.dismiss()} >

            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>

                    <Text style={{ fontSize: 20 }}> Register </Text>
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

                    <Input
                        ref='repass'
                        containerStyle={styles.inputStyle}
                        value={this.state.repass}
                        placeholder='re-enter Password...'
                        onChangeText={repass => this.setState({ repass })}
                        secureTextEntry
                    />

                    <Button
                        title='Register'
                        buttonStyle={styles.buttonStyle}
                        onPress={this._onPressRegister} />

                    <Button
                        title='Go back'
                        buttonStyle={[styles.buttonStyle, { backgroundColor: 'orange' }]}
                        onPress={() => this.props.navigation.pop()}
                    />

            </KeyboardAvoidingView>
            </TouchableWithoutFeedback>

        )
    }

    _onPressRegister = async () => {
        const { email, password, repass } = this.state
        if (password != repass) {
            alert('Password is not match !!!')
            return
        }
        await firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(result => alert('Register success !!!'))
            .catch(err => alert(err))
        this.props.navigation.pop()
    }
}
