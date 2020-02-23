import React, { Component } from 'react'
import { Text, View, FlatList, ActivityIndicator, TouchableOpacity, Alert, SafeAreaView } from 'react-native'
import styles from '../../styles'

import firebase from '../../firebase'
import 'firebase/firestore'
import { Icon, Button } from 'react-native-elements'

export default class Edit extends Component {

    state = {
        ref: this.props.route.params.name,
        list: []
    }

    componentDidMount() {
        this.getDataFromFirebase()
        this.props.navigation.setOptions({
            title: this.state.ref.toUpperCase(),
            headerRight: () => {
                return <TouchableOpacity style={{ marginHorizontal: 20 }}>
                    <Icon name='plus' type='entypo' size={28} color='rgb(82,136,216)' />
                </TouchableOpacity>
            }
        })
    }

    getDataFromFirebase = async () => {
        let list = []
        await firebase.firestore().collection(this.props.route.params.name).get()
            .then(snap => snap.forEach(doc => {
                list.push(doc.data())
            }))
            .catch(err => console.log(err))

        this.setState({ list })
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={this.state.list}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={this.renderItem}
                    ListEmptyComponent={<ActivityIndicator size='large' style={{ padding: 20 }} color='black' />}
                />
            </SafeAreaView>
        )
    }

    renderItem = ({ item, index }) => {
        return <View
            onPress={() => { }}
            style={[styles.flatlistItem, { justifyContent: 'flex-start', backgroundColor: index % 2 ? 'grey' : 'white' }]}>

            <Text style={{ fontSize: 18, flex: 3 }}>
                {item.name}
            </Text>

            <View style={{ marginHorizontal: 15 }}>
                <TouchableOpacity>
                    <Icon name='edit' color='rgb(82,136,216)' size={26} />
                </TouchableOpacity>
            </View>

            <View style={{ marginHorizontal: 15 }}>
                <TouchableOpacity onPress={() => this._onPressRemove(item.name)}>
                    <Icon name='ios-trash' type='ionicon' color='#ff3333' size={26} />
                </TouchableOpacity>
            </View>


        </View>
    }

    _onPressRemove = (name) => {
        Alert.alert(
            'Remove ' + name,
            'Are you sure ? ',
            [
                { text: 'OK', onPress: () => this._onConfirmRemove(name) },
                { text: 'Cancel', onPress: () => { } },
            ]
        )
    }

    _onConfirmRemove = async (name) => {
        let refDoc
        await firebase.firestore().collection(this.state.ref).get()
            .then(snap => snap.forEach(doc => {
                if (doc.data().name == name) refDoc = doc.id
            }))
            .catch(err => console.log(err))
        await firebase.firestore().collection(this.state.ref).doc(refDoc).delete()
            .then(() => this.componentDidMount())
            .catch (err => console.log(err))
    }
}
