import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { matchRoutes } from 'react-router-config'

import routes from './routes'

const flatten = arr =>
  arr.reduce(
    (acc, next) => (Array.isArray(next) ? [...acc, ...next] : [...acc, next]),
    []
  )

export const fetchData = (store, location) => {
  const branch = matchRoutes(routes, location)

  const promises = branch.map(({ route, match }) => {
    if (route.component.fetchData) {
      return route.component.fetchData(store, match)
    }
  })

  return flatten(promises).filter(Boolean)
}

class DataLoader extends Component {
  constructor (props) {
    super(props)

    this.state = { loading: false }
  }

  componentWillMount () {
    this.sincState(fetchData(this.props.store, this.props.location.pathname))
  }

  sincState (promises) {
    if (promises.length) {
      this.setState({ loading: true })

      Promise.all(promises).then(() => this.setState({ loading: false }))
    }
  }

  componentWillReceiveProps (nextProps) {
    const navigated = nextProps.location !== this.props.location

    if (navigated) {
      this.sincState(fetchData(this.props.store, nextProps.location.pathname))
    }
  }

  render () {
    const { loading } = this.state
    return loading ? <div>Loading...</div> : this.props.children
  }
}

export default withRouter(DataLoader)
