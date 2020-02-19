import React, { Component } from 'react'
import {
    Text, View, SafeAreaView, StatusBar, TouchableOpacity, ActivityIndicator,
    Keyboard, TextInput, ScrollView, Dimensions, KeyboardAvoidingView
} from 'react-native'
import styles from '../../styles'

import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import Geolocation from 'react-native-geolocation-service';
import MapViewDirections from 'react-native-maps-directions';
import { Input, Button } from 'react-native-elements';
import { GoogleAutoComplete } from 'react-native-google-autocomplete';
import { connect } from 'react-redux';
import { infoDestination } from '../../redux/actions'
//AIzaSyDIpl5u79tC0YWoM-EWmPHyDRcnJieq7Fs

const { width, height } = Dimensions.get('window')

const GOOGLE_MAPS_APIKEY = 'AIzaSyDIpl5u79tC0YWoM-EWmPHyDRcnJieq7Fs';
class Map extends Component {

    constructor(props) {
        super(props)
        this.state = {
            endAddress: '',
            distance: 0,
            duration: '',
            inputValue: '',
            fastMode: false,
            showModal: false,
            currentPositon: {
                latitude: 10.837528,
                longitude: 106.667528,
                latitudeDelta: 0.09,
                longitudeDelta: 0.09,
            },
            destination: {
                latitude: 10.837528,
                longitude: 106.667528,
            }
        }
    }

    async componentDidMount() {
        //console.log(this.props)
        this.getCurrentPosition()
    }

    getCurrentPosition = async () => {
        await Geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords
                // console.log(latitude, longitude)
                let currentPositon = {
                    latitude, longitude,
                    latitudeDelta: 0.009,
                    longitudeDelta: 0.009,
                }
                this.setState({ currentPositon, destination: currentPositon })
            },
            err => { console.log(err) })
    }

    _onLongPress = e => {
        let { latitude, longitude } = e.nativeEvent.coordinate
        let destination = { latitude, longitude }
        this.setState({ destination }, () => this.getDistance())
    }

    render() {
        return (
            <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
                <MapView
                    style={{ flex: 5 }}
                    showsUserLocation
                    provider={PROVIDER_GOOGLE}
                    initialRegion={this.state.currentPositon}
                    onPress={() => Keyboard.dismiss()}
                    onLongPress={this._onLongPress}>

                    <Marker coordinate={this.state.destination} title='Điểm cuối' />

                    <MapViewDirections
                        origin={this.state.currentPositon}
                        destination={!this.state.destination ? this.state.currentPositon : this.state.destination}
                        apikey={GOOGLE_MAPS_APIKEY}
                        strokeWidth={4}
                        strokeColor='#5E9ED6'
                        mode={this.state.fastMode ? 'WALKING' : 'DRIVING'}
                        optimizeWaypoints={true}

                    />

                </MapView>

                <GoogleAutoComplete
                    apiKey={GOOGLE_MAPS_APIKEY}
                    debounce={200} minLength={3}
                    language='vn'>

                    {({ handleTextChange, locationResults, fetchDetails, isSearching, inputValue, clearSearch }) => (
                        <React.Fragment>
                            <View style={{ position: 'absolute', top: 0, width, backgroundColor: 'white', padding: 20, paddingTop: 50 }}>
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>

                                    <Text style={{ fontSize: 18 }}>
                                        Dormish Coffe
                                </Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Input
                                            value={this.state.endAddress}
                                            containerStyle={styles.textInput}
                                            placeholder='Nhập địa chỉ điểm đến'
                                            onChangeText={handleTextChange}
                                            value={inputValue}
                                            autoCorrect={false}
                                        />
                                        <Button title='Clear' onPress={clearSearch} />
                                    </View>

                                </View>
                                {isSearching && <ActivityIndicator size="large" color="black" />}
                                <ScrollView>
                                    {locationResults.map(el => (
                                        <TouchableOpacity
                                            key={el.id}
                                            style={styles.root}
                                            onPress={async () => {
                                                const res = await fetchDetails(el.place_id)
                                                let { lat, lng } = res.geometry.location
                                                destination = { latitude: lat, longitude: lng }
                                                this.setState({ destination }, () => {
                                                    clearSearch()
                                                    this.getDistance()
                                                })
                                            }}>
                                            <Text style={{ fontSize: 16 }}>{el.description}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            </View>
                        </React.Fragment>
                    )}
                </GoogleAutoComplete>

                <View style={styles.bottomPanel}>

                    <Button
                        onPress={() => { this.setState({ fastMode: !this.state.fastMode }) }}
                        buttonStyle={{ backgroundColor: this.state.fastMode ? 'orange' : 'blue', width: width / 2, alignSelf: 'center' }}
                        title={this.state.fastMode ? 'Short-cut: ON' : 'Short-cut: OFF'}
                    />
                    <View>
                        <Text style={{ fontSize: 18 }} numberOfLines={3}>Điểm đến {this.state.endAddress}</Text>
                        <Text style={{ fontSize: 18 }}>Khoảng cách {this.state.distance}</Text>
                        <Text style={{ fontSize: 18 }}>Thời gian {this.state.duration}</Text>
                    </View>

                </View>
            </KeyboardAvoidingView>
        )
    }

    getDistance = async () => {
        await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${this.state.currentPositon.latitude},${this.state.currentPositon.longitude}&destination=${this.state.destination.latitude},${this.state.destination.longitude}&key=AIzaSyDIpl5u79tC0YWoM-EWmPHyDRcnJieq7Fs`)
            .then(res => res.json())
            .then(resJson => this.setState({
                distance: resJson.routes[0].legs[0].distance.text,
                duration: resJson.routes[0].legs[0].duration.text,
                endAddress: resJson.routes[0].legs[0].end_address
            }))
            .catch(err => console.log(err))
            .finally(() => {
                const { distance, duration, endAddress } = this.state
                this.props.infoDestination({
                    distance,
                    duration,
                    address: endAddress
                })
            })
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = dispatch => ({
    infoDestination: (obj) => dispatch(infoDestination(obj))
})

export default connect(mapStateToProps,mapDispatchToProps)(Map)