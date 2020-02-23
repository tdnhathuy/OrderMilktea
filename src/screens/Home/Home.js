import React, { Component } from 'react'
import { Text, View, TouchableOpacity, FlatList, Alert } from 'react-native'
import styles from '../../styles'
import { Button } from 'react-native-elements'


import { connect } from 'react-redux'
import { setMenu, removeDrinkFromList } from '../../redux/actions'

import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings([
    'We found non-serializable values in the navigation state',
])


class Home extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Button
                    title='Order drink'
                    buttonStyle={styles.buttonStyle}
                    onPress={() => this.props.navigation.push('Drink')}
                />

                <FlatList
                    data={this.props.list}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={this.renderItem}
                />

                <Button
                    onPress={() => this.props.navigation.push('Checkout')}
                    buttonStyle={styles.buttonStyle}
                    title='Checkout' />
            </View>
        )
    }

    renderItem = ({ item, index }) => {
        return <TouchableOpacity
            onLongPress={this._onLongPress.bind(this, index)}
            onPress={() => this.props.navigation.push('Topping', { item, index })}
            style={[styles.flatlistItem, { justifyContent: 'flex-start', backgroundColor: index % 2 ? 'grey' : 'white' }]}>

            <Text style={{ fontSize: 18, flex: 3 }}>
                {item.name}
            </Text>

            <View style={{ flexDirection: 'column', flex: 1.5 }}>
                {item.topping.map(item => <Text key={item.name}>{item.name}</Text>)}
            </View>
        </TouchableOpacity>
    }

    _onLongPress = (index) => {
        Alert.alert(
            'Are you sure ?',
            'Do you wanna delete this drink',
            [{
                text: 'OK',
                onPress: () => this.props.removeDrinkFromList(index),
                style: 'destructive'
            },
            {
                text: 'Cancel',
                style: 'cancel',
            }
            ],
        )
    }
}

const mapStateToProps = (state) => ({
    list: state.listDrink
})

const mapDispatchToProps = dispatch => ({
    setMenu: (menuDrink, menuTopping) => dispatch(setMenu(menuDrink, menuTopping)),
    removeDrinkFromList: (index) => dispatch(removeDrinkFromList(index))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)