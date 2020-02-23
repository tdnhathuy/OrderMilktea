import React from 'react'
import { NavigationContainer, StackActions, } from '@react-navigation/native'
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

//StackSetting
import Setting from '../screens/Setting/Setting'
import Edit from '../screens/Setting/Edit'

//Redux
import { Provider } from 'react-redux'
import store from '../redux/store'
import Checkout from '../screens/Home/Checkout'
import { Icon } from 'react-native-elements'


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

SettingStack =()=>{
    return <Stack.Navigator>
        <Stack.Screen name='Setting' component={Setting} />
        <Stack.Screen name='Edit' component={Edit}/>
    </Stack.Navigator>
}

BottomNavigatior = () => {
    return <BottomTabs.Navigator>
        <BottomTabs.Screen
            name='HomeStack'
            component={HomeStack}
            options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ focused }) => <Icon name='home' color={focused ? '#6495ed' : 'black'} />
            }} />
        <BottomTabs.Screen
            name='Map'
            component={Map}
            options={{
                tabBarIcon: ({ focused }) => <Icon name='map' color={focused ? '#6495ed' : 'black'} />
            }} />
        <BottomTabs.Screen
            name='SettingStack'
            component={SettingStack} options={{
                tabBarIcon: ({ focused }) => <Icon name='ios-settings' type='ionicon' color={focused ? '#6495ed' : 'black'} />
            }} />
    </BottomTabs.Navigator>
}

export default function () {
    return (
        <Provider store={store}>
            <NavigationContainer >
                <Stack.Navigator name='RootStack' screenOptions={{ headerShown: false }}>
                    <Stack.Screen name='Login' component={Login} options={{gestureEnabled: false}} />
                    <Stack.Screen name='Register' component={Register} />
                    <Stack.Screen name='BottomHome' component={BottomNavigatior} />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>

    )
}