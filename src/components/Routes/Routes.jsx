/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'

import { loginPath } from '../../config/constants'
import { Login, RecentlyPlayed } from '../../pages'
import PrivateRoute from './PrivateRoute'

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path={loginPath} component={Login} />

      <PrivateRoute path="/recentlyPlayed" component={RecentlyPlayed} />

      <Redirect to="/recentlyPlayed" />
    </Switch>
  </BrowserRouter>
)

export default Routes
