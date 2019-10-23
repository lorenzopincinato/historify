/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'

import { loginPath } from '../../config/constants'
import { Login } from '../../pages'

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path={loginPath} component={Login} />
      <Redirect to={loginPath} />
    </Switch>
  </BrowserRouter>
)

export default Routes
