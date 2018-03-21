import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import {HashRouter as Router, Route, Link} from 'react-router-dom'

const CodyPage = () => (
  <h1>This is Cody's Page</h1>
)

const BigheadPage = () => (
  <h1>This is Bighead's Page</h1>
)

const Home = () => (
  <h1>This is the Home Page</h1>
)

const Main = () => (
  <div>
    <Link to='/cody'>Go to Cody</Link>
    <Link to='/bighead'>Go to Bighead</Link>
    <Route path='/cody' component={CodyPage} />
    <Route path='/bighead' component={BigheadPage} />
    <Route exact path='/' component={Home} />
  </div>
)

ReactDOM.render(
  <Router>
    <Main />
  </Router>,
  document.getElementById('app')
)
