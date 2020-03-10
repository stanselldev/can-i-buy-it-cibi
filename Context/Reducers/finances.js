const FinancesReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_FINANCES':
            return action.finances

        case 'ADD_FINANCES':
          return [
              ...state,
              action.finances
          ]

        default:
            return state 
    }
}

export default FinancesReducer