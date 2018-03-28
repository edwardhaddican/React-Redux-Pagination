import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'

const BlueBackground = (props) => (
  <div className='bg-blue fill-xy'>
    {props.children}
  </div>
)

const Cats = (props) => (
  <div>
    <h1>These are the cats:</h1>
    {props.children}
  </div>
)

const Pichu = () => (
  <h5>Pichu</h5>
)

const Phoebe = () => (
  <h5>Phoebe</h5>
)

ReactDOM.render(
  <BlueBackground>
    <Cats>
      <Pichu />
      <Phoebe />
    </Cats>
  </BlueBackground>,
  document.getElementById('app')
)
