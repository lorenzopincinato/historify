/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types'
import React from 'react'
import { Redirect, Route } from 'react-router-dom'

import { isAuthenticated } from '../../utils/authentication'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated ? <Component {...props} /> : <Redirect to={{ pathname: '/login' }} />
    }
  />
)

PrivateRoute.propTypes = {
  component: PropTypes.node.isRequired,
}

export default PrivateRoute
