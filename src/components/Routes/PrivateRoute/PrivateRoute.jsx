/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types'
import React from 'react'
import { Redirect, Route } from 'react-router-dom'

import { loginPath } from '../../../config/constants'
import { isAuthenticated } from '../../../services/spotifyAuthentication'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? <Component {...props} /> : <Redirect to={{ pathname: loginPath }} />
    }
  />
)

PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
}

export default PrivateRoute
