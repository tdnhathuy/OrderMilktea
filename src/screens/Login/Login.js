import React, { Component } from 'react'
import { Text, View, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from 'react-native'
import styles from '../../styles'
import { Button, Input } from 'react-native-elements'
import Spiner from 'react-native-loading-spinner-overlay'

import firebase from '../../firebase'
import { connect } from 'react-redux'
import { setMenu } from '../../redux/actions'

class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            spiner: false
        }
    }

    render() {
        return (
            <TouchableWithoutFeedback style={styles.container} onPress={() => Keyboard.dismiss()} >

                <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>

                    <Text style={{ fontSize: 20 }}> Login </Text>
                    <Spiner visible={this.state.spiner} />
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

                    <Button
                        title='Test'
                        buttonStyle={styles.buttonStyle}
                        onPress={() => this.setState({ email: 'tdn.huyz@gmail.com', password: '123123' },this._onPressLogin)}
                    />
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        )
    }

    _onPressLogin = async () => {
        this.setState({ spiner: true })
        const { email, password } = this.state
        await firebase.auth().signInWithEmailAndPassword(email, password)
            .then(this.getDataFromFirebase)
            .catch(this.alertError)
    }

    getDataFromFirebase = async (res) => {
        let menuDrink = []
        let menuTopping = []

        await firebase.firestore().collection('beverage').get()
            .then(snap => snap.forEach(doc => {
                menuDrink.push(doc.data())
            }))
            .catch(err => console.log(err))

        await firebase.firestore().collection('topping').get()
            .then(snap => snap.forEach(doc => {
                menuTopping.push(doc.data())
            }))
            .catch(err => console.log(err))

        this.setState({ spiner: false })
        this.props.setMenu(menuDrink, menuTopping)
        this.props.navigation.replace('BottomHome')
    }

    alertError = err => {
        this.setState({ spiner: false })
        console.log(err)
    }
}

const mapStateToProps = (state) => ({
    list: state.listDrink
})

const mapDispatchToProps = dispatch => ({
    setMenu: (menuDrink, menuTopping) => dispatch(setMenu(menuDrink, menuTopping))
})
export default connect(mapStateToProps, mapDispatchToProps)(Login)