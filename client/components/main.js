import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { Route, Switch, Router } from 'react-router-dom'
import { Mosaic, Home, Login, Signup, Upload, NewEvent, Dashboard, SingleEvent } from './index'
import { logout } from '../store'
import Navbar from './Navbar'

import Footer from './Footer'

/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
const Main = (props) => {
  const { children, handleClick, isLoggedIn } = props

  return (

    <div>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/dashboard/:userHash" component={Dashboard} />
        <Route path="/events/:eventSecret/upload/:userHash?" component={Upload} />
        <Route path="/events/:eventSecret/mosaic/:userHash?" component={Mosaic} />
        <Route path="/events/:eventSecret/" component={SingleEvent} />
      </Switch>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Main))

/**
 * PROP TYPES
 */
Main.propTypes = {
  children: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
