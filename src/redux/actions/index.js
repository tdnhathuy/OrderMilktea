export const addTopping = (listTopping) => {
    return {
        type: 'ADD_TOPPING',
        payload: listTopping
    }
}

export const addToppingToDrink = (topping, idxDrink) => {
    return {
        type: 'ADD_TOPPING_TO_DRINK',
        topping,
        idxDrink
    }
}

export const orderDrink = (listDrink) => {
    return {
        type: 'ORDER_DRINK',
        payload: listDrink
    }
}

export const infoDestination = (obj) => {
    return {
        type: 'INFO_DES',
        payload: obj
    }
}

export const setMenu = (menuDrink, menuTopping) => ({
    type: 'SET_MENU',
    payload: {
        menuDrink,
        menuTopping
    }
})

export const removeDrinkFromList = (index) => ({
    type: 'REMOVE_DRINK',
    payload: index
})