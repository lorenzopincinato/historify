/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types'
import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const isAuthenticated = true

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
