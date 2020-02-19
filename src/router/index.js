import React from 'react'
import { NavigationContainer, } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

//LoginStack
import Login from '../screens/Login/Login'
import Register from '../screens/Login/Register'
//HomeStack
import Home from '../screens/Home/Home'
import Topping from '../screens/Home/Topping'
import Drink from '../screens/Home/Drink'

import Map from '../screens/Map/Map'
import Setting from '../screens/Setting'

//Redux
import { Provider } from 'react-redux'
import store from '../redux/store'
import Checkout from '../screens/Home/Checkout'


const Stack = createStackNavigator()
const BottomTabs = createBottomTabNavigator()

HomeStack = () => {
    return <Stack.Navigator >
        <Stack.Screen name='Home' component={Home} initialParams={Home} />
        <Stack.Screen name='Topping' component={Topping} />
        <Stack.Screen name='Drink' component={Drink} />
        <Stack.Screen name='Checkout' component={Checkout} />
    </Stack.Navigator>
}

BottomNavigatior = () => {
    return <BottomTabs.Navigator>
        <BottomTabs.Screen name='HomeStack' component={HomeStack} />
        <BottomTabs.Screen name='Map' component={Map} />
        <BottomTabs.Screen name='Setting' component={Setting} />
    </BottomTabs.Navigator>
}

export default function () {
    return (
        <Provider store={store}>
            <NavigationContainer>

                <Stack.Navigator screenOptions={{headerShown: false} }>
                    <Stack.Screen name='Login' component={Login} />
                    <Stack.Screen name='Register' component={Register} />
                    <Stack.Screen name='BottomHome' component={BottomNavigatior} />

                </Stack.Navigator>
            </NavigationContainer>
        </Provider>

    )
}