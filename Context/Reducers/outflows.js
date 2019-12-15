const OutflowsReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_OUTFLOWS':
            return action.outflows

        case 'ADD_OUTFLOW':
            return [
                ...state,
                action.outflows
            ]

        default:
            return state 
    }
}

export default OutflowsReducer