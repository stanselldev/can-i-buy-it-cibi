import React, { useReducer, useEffect } from 'react'
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import Calendar from "../Calendar/Calendar"
import Profile from "../Profile/Profile"
import Navigation from "./Navigation"
import { FinancesContext } from "../../Context/context"
import FinancesReducer from "../../Context/Reducers/finances"

const Router = () => {
  const [finances, dispatch] = useReducer(FinancesReducer)

  return (
    <BrowserRouter>
      <div>
        <Switch>
          <FinancesContext.Provider value={{ finances, dispatch }}>
            <Route path="/" component={Calendar} exact />
            <Route path="/profile" component={Profile} />
          </FinancesContext.Provider>
        </Switch>
        <Navigation />
      </div>      
    </BrowserRouter>
  )
}

export default Router