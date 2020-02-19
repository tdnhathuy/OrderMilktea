import React, { Component } from 'react'
import { Text, View, TouchableOpacity, FlatList } from 'react-native'
import styles from '../../styles'
import { connect } from 'react-redux'
import { Button } from 'react-native-elements'

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
                onPress={()=>this.props.navigation.push('Checkout')}
                    buttonStyle={styles.buttonStyle}
                    title='Checkout' />
            </View>
        )
    }

    renderItem = ({ item, index }) => {
        return <TouchableOpacity
            onPress={() => this.props.navigation.push('Topping', { item, index })}
            style={[styles.flatlistItem, { justifyContent: 'flex-start', backgroundColor: index % 2 ? 'grey' : 'white' }]}>

            <Text style={{ fontSize: 18, flex:3 }}>
                {item.name}
            </Text>

            <View style={{ flexDirection: 'column', flex: 1 }}>
                {item.topping.map(item => <Text key={item.name}>{item.name}</Text>)}
            </View>
        </TouchableOpacity>
    }

}

const mapStateToProps = (state) => ({
    list: state.listDrink
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Home)