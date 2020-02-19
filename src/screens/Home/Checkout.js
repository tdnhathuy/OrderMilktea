import React, { Component } from 'react'
import { Text, View, FlatList } from 'react-native'
import styles from '../../styles'
import { connect } from 'react-redux'

class Checkout extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={{ fontSize: 30 }}>
                    Billing
                </Text>

                <Text style={{ fontSize: 16, alignSelf: 'flex-start', margin: 2 }}>
                    Address: {this.props.infoDes.address?this.props.infoDes.address:'No destination selected'}
                </Text>


                <Text style={{ fontSize: 16, alignSelf: 'flex-start', margin: 2 }}>
                    Distance: {this.props.infoDes.distance}
                </Text>
                <Text style={{ fontSize: 16, alignSelf: 'flex-start', margin: 2 }}>
                    Duration: {this.props.infoDes.duration}
                </Text>

                <FlatList
                    data={this.props.list}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={this.renderItem}
                />

                <Text style={{ fontSize: 20 }}>
                    Total: {this.getTotal()}
                </Text>
            </View>
        )
    }

    getTotal = () => {
        let total = 0
        this.props.list.forEach(element => {
            total += element.price
            element.topping.forEach(topping => {
                total += topping.price
            })
        });
        return total
    }

    renderItem = ({ item, index }) => {
        return <View
            onPress={() => this.props.navigation.push('Topping', { item, index })}
            style={[styles.flatlistItem, { justifyContent: 'flex-start', backgroundColor: index % 2 ? 'grey' : 'white' }]}>
            <Text style={{ fontSize: 16, flex: 4 }}>
                {item.name}
            </Text>

            <View style={{ flex: 2}}>
                {item.topping.map(item => <Text key={item.name}>{item.name}</Text>)}
            </View>

            <View style={{flex: 1}}>
                <Text>
                    {item.price + item.topping.reduce((price, topping, index, toppings) => { return price += topping.price }, 0)}
                </Text>
            </View>
        </View>
    }

}

const mapStateToProps = (state) => ({
    list: state.listDrink,
    infoDes: state.infoDes
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)