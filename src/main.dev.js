import 'react-hot-loader/patch'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'
import { ConnectedRouter } from 'react-router-redux'
import configureStore from './store/configureStore'
import { renderRoutes } from 'react-router-config'
import DataLoader from './DataLoader'
import routes from './routes'

const { store, history } = configureStore()

const mountPoint = document.getElementById('root')

const render = (rr) => (
  <AppContainer>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <DataLoader store={store}>
          {renderRoutes(rr)}
        </DataLoader>
      </ConnectedRouter>
    </Provider>
  </AppContainer>
)

ReactDOM.render(render(routes), mountPoint)

if (module.hot) {
  module.hot.accept('./routes', () => {
    const routes = require('./routes').default

    ReactDOM.render(
      render(routes),
      mountPoint
    )
  })
}
