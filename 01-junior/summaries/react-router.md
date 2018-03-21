# Basic Components

```javascript
import React from 'react'
import ReactDOM from 'react-dom'

// Three main ingredients:
import {HashRouter, Route, Link} from 'react-router-dom'

const Main = () => {
  return (
    <div>
      <div id='navigation'>
        <Link to='/cody'>Go to Cody</Link>
        <Link to='/bighead'>Go to Bighead</Link>
      </div>
      <div id='main-content'>
        {/* routes consist of a `path` and `component` */}
        <Route path='/cody' component={CodyPage} />
        <Route path='/bighead' component={BigheadPage} />

        {/*
          You can also define wildcards!
          These are accessible from match.params (similar to req.params in Express)
          In this case, you will have match.params.pugId
        */}
        <Route path='/pugs/:pugId' component={Pug} />

        {/* need more space? use `render` */}
        <Route exact path='/' render={
          (routeProps) => {
            // the "routeProps" are
            // - match
            // - history
            // - location
            return <Home user='Tom' {...routeProps} />
          }
        } />
      </div>
    </div>
  )
}

ReactDOM.render(
  <Main />,
  document.getElementById('app')
)
```
