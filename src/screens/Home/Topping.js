import React, { Component } from 'react'
import { Text, View, TouchableOpacity, FlatList, ActivityIndicator, } from 'react-native'

import firebase from '../../firebase'
import 'firebase/firestore'
import styles from '../../styles'

//redux
import { connect } from 'react-redux'
import { addTopping, addToppingToDrink } from '../../redux/actions'
import { Button } from 'react-native-elements'

class Topping extends Component {



    constructor(props) {
        super(props)
        this.state = {
            list: [],
            checked: []
        }
    }

    async componentDidMount() {

        console.log(this.props.route.params.item)
        console.log(this.props.route.params.index)

        let list = []
        await firebase.firestore().collection('topping').get()
            .then(snap => snap.forEach(doc => {
                list.push(doc.data())
            }))
            .catch(err => console.log(err))
            .finally(async () => {
                list.forEach(element => {
                    element.check = false
                    this.props.route.params.item.topping.forEach(topping => {
                        if (element.name == topping.name) element.check = true
                    })
                })
                this.setState({ list })
            })
    }

    render() {
        return (
            <View style={styles.container}>

                <Text style={{ fontSize: 18, paddingVertical: 5 }}>
                    Chọn Topping cho {this.props.route.params.item.name}
                </Text>

                <FlatList
                    data={this.state.list}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={this.renderItem}
                    ListEmptyComponent={<ActivityIndicator style={{ margin: 20 }} size='large' color='black' />}
                />

                <Button
                    buttonStyle={styles.buttonStyle}
                    onPress={this.onPressButton}
                    title='Confirm' />
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

    onPressButton = () => {
        //this.props.addTopping(this.state.checked)
        const { index } = this.props.route.params
        this.props.addToppingToDrink(this.state.checked, index)
        this.props.navigation.pop()
    }
}


const mapStateToProps = (state) => ({

})

const mapDispatchToProps = dispatch => ({
    addTopping: list => dispatch(addTopping(list)),
    addToppingToDrink: (topping, idxDrink) => dispatch(addToppingToDrink(topping, idxDrink))
})

export default connect(mapStateToProps, mapDispatchToProps)(Topping)