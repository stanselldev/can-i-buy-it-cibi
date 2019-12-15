const InflowsReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_INFLOWS':
            return action.inflows

        case 'ADD_INFLOW':
            return [
                ...state,
                action.inflows
            ]

        default:
            return state 
    }
}

export default InflowsReducer