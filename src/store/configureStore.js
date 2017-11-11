import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from '../modules'
import createHistory from 'history/createBrowserHistory'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const history = createHistory()
const middleware = routerMiddleware(history)

function configureStore () {
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(middleware, thunk))
  )

  return { store, history }
}

export default configureStore
