const FinancesReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_FINANCES':
            return action.finances

        case 'ADD_FINANCES':
          console.log("ADD RAN")
            return [
                ...state,
                action.finances
            ]

        default:
            return state 
    }
}

export default FinancesReducer