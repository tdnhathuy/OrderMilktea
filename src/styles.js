import { StyleSheet, Dimensions } from 'react-native'

const { height, width } = Dimensions.get('screen')

export default styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    inputStyle: {
        width: '75%',
        margin: 2,
        paddingVertical: 2
    },
    flatlistItem: {
        flexDirection: 'row',
        width, padding: 20,
        justifyContent: 'center', alignItems: 'center'
    },

    btnContainer: {
        width: width / 2, padding: 20, margin: 30, borderRadius: 10,
        backgroundColor: 'orange',
        justifyContent: 'center', alignItems: 'center'
    },

    buttonStyle:{
        width: 200,
        paddingVertical: 10, marginTop: 5, margin: 5
    },

    mapStyle:{
        width,
        height
    },

    textInput:{
width:'80%',
        paddingVertical: 5
    }

})