import { injectGlobal } from 'react-emotion'
import { renderRoutes } from 'react-router-config'
// import { connect } from 'react-redux'

injectGlobal`
  body {
    margin: 0;
  }
`

const App = ({ route }) => renderRoutes(route.routes)

export default App
