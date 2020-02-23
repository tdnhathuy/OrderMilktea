
initialState = {
    menuDrink: [],
    menuTopping: [],
    listDrink: [],
    listTopping: [],
    infoDes: {
        address: '',
        distance: 0,
        duration: 0
    }
}

export default myReducer = (state = initialState, action) => {
    // console.log(state)
    switch (action.type) {
        case 'ADD_TOPPING':
            return {
                listTopping: action.payload
            }

        case 'ADD_TOPPING_TO_DRINK':
            console.log(state.listDrink[action.idxDrink].topping)
            console.log(action.topping)
            return {
                ...state,
                // listDrink: [...state.listDrink, state.listDrink[action.idxDrink].topping = action.topping]
                listDrink: state.listDrink.map((item, idx) => idx === action.idxDrink ? { ...item, topping: action.topping } : item)
            }

        case 'ORDER_DRINK':
            return {
                ...state,
                listDrink: [...state.listDrink, action.payload].flat()
            }

        case 'INFO_DES':
            return {
                ...state,
                infoDes: action.payload
            }

        case 'SET_MENU':
            return {
                ...state,
                menuDrink: action.payload.menuDrink,
                menuTopping: action.payload.menuTopping
            }

        case 'REMOVE_DRINK':
            return {
                ...state,
                listDrink: state.listDrink.filter((val, idx) => idx !== action.payload)
            }

        default:
            return state
    }

}