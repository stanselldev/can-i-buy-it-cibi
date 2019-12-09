import React from 'react'
import { BrowserRouter, Route, Switch} from 'react-router-dom'

import Calendar from "../Calendar/Calendar"
import Profile from "../Profile/Profile"
import Navigation from "./Navigation"

export default class Router extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/" component={Calendar} exact />
            <Route path="/profile" component={Profile} />
          </Switch>
          <Navigation />
        </div>      
      </BrowserRouter>
    )
  }
}