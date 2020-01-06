const SettingsReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_SETTINGS':
            return action.settings

        default:
            return state 
    }
}

export default SettingsReducer