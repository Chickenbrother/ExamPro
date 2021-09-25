import * as React from 'react'
import { HashRouter as Router, Route } from "react-router-dom"
import loadable from '@loadable/component'

const Home = loadable(() => import(/* webpackChunkName: "home" */ './pages/Home'))

class App extends React.Component {
  
  
  render() {

    return (
      <div className="app">
        <Router>
          <Route exact path='/' component={Home}></Route>
        </Router>
      </div>
    )
  }
}

export default App