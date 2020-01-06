import React, { useReducer, useEffect } from 'react'
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import Calendar from "../Calendar/Calendar"
import Profile from "../Profile/Profile"
import Navigation from "./Navigation"
import { FinancesContext, SettingsContext } from "../../Context/context"
import FinancesReducer from "../../Context/Reducers/finances"
import SettingsReducer from "../../Context/Reducers/settings"

const Router = () => {
  const [finances, dispatch] = useReducer(FinancesReducer)
  const [settings, dispatch] = useReducer(SettingsReducer)

  return (
    <BrowserRouter>
      <div>
        <Switch>
          <SettingsContext.Provider value={{ settings, dispatch }}>
            <FinancesContext.Provider value={{ finances, dispatch }}>
              <Route path="/" component={Calendar} exact />
            </FinancesContext.Provider>
            <Route path="/profile" component={Profile} />
          </SettingsContext.Provider>
        </Switch>
        <Navigation />
      </div>      
    </BrowserRouter>
  )
}

export default Router