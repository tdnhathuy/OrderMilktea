import React, { Component } from 'react'
import { Text, View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native'
import styles from '../../styles'

import firebase from '../../firebase'
import 'firebase/firestore'
import { connect } from 'react-redux'
import { orderDrink } from '../../redux/actions'
import { Button } from 'react-native-elements'

class Drink extends Component {

    constructor(props) {
        super(props)
        this.state = {
            list: [],
            checked: []
        }
    }

    componentDidMount() {
        this.getDataFromFirebase()
    }

    getDataFromFirebase = async () => {
        let list = []
        await firebase.firestore().collection('beverage').get()
            .then(snap => snap.forEach(doc => {
                list.push(doc.data())
            }))
            .catch(err => console.log(err))
            .finally(() => this.setState({ list }))
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ flex: 2 }}>
                    <FlatList
                        data={this.state.list}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={this.renderItem}
                        ListEmptyComponent={<ActivityIndicator />}
                    />
                </View>

                <Button
                    title='Confirm'
                    buttonStyle={styles.buttonStyle}
                    onPress={this.onPressConfirm}
                />
            </View>
        )
    }


    renderItem = ({ item, index }) => {
        return <TouchableOpacity
            style={[styles.flatlistItem, { backgroundColor: item.check ? 'green' : (index % 2 ? 'white' : 'grey') }]}
            onPress={this.onPressItem.bind(this, item)}>
            <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 18, alignContent: 'flex-end' }}>
                    {item.name}
                </Text>
            </View>

            <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 18, alignSelf: 'flex-end' }}>
                    {item.price}
                </Text>
            </View>

        </TouchableOpacity>
    }

    onPressItem = (item) => {
        item.check = !item.check
        this.setState({ checked: this.state.list.filter(val => val.check == true) })
        this.forceUpdate()
    }

    onPressConfirm = () => {
        this.props.orderDrink(this.state.checked)
        this.props.navigation.pop()
    }
}


const mapStateToProps = (state) => ({

})

const mapDispatchToProps = dispatch => ({
    orderDrink: listDrink => dispatch(orderDrink(listDrink))
})

export default connect(null, mapDispatchToProps)(Drink)