# React Design Patterns

React's flexibility allows for multiple patterns that we can use to compose presentations with re-usable state/behavior.

To provide a simple example, what if we just wanted a component that could wrap other arbitrary components/JSX in a blue background? Here's what it would look like:

## Render Props

```javascript

const BlueBackground = (props) => {
  return (
    <div style={{backgroundColor: 'blue'}}>
      {props.render()}
    </div>
  )
}

const Pugs = () => <h1>Pugs</h1>
const FrenchBulldogs = () => <h1>FrenchBulldogs</h1>
const Kittens = () => <h1>Kittens</h1>

ReactDOM.render(
  <div>
    <BlueBackground render={() => <Pugs />}/>
    <BlueBackground render={() => <FrenchBulldogs />}/>
    <BlueBackground render={() => <Kittens />}/>
  </div>,
  document.getElementById('app')
)


```

## Higher Order Components

```javascript
const giveBlueBackground = (Component) => {
  return (props) => {
    const children = props.children
    return (
      <div style={{backgroundColor: 'blue'}}>
        <Component />
      </div>
    )
  }
}

const Pugs = () => <h1>Pugs</h1>
const FrenchBulldogs = () => <h1>FrenchBulldogs</h1>
const Kittens = () => <h1>Kittens</h1>

const BluePugs = giveBlueBackground(Pugs)
const BlueFrenchies = giveBlueBackground(FrenchBulldogs)
const BlueKittens = giveBlueBackground(BlueKittens)

ReactDOM.render(
  <div>
    <BluePugs />
    <BlueFrenchies />
    <BlueKittens />
  </div>,
  document.getElementById('app')
)
```

## Props.Children

```javascript
const BlueBackground = (props) => {
  const children = props.children
  return (
    <div style={{backgroundColor: 'blue'}}>
      {children}
    </div>
  )
}

const Pugs = () => <h1>Pugs</h1>
const FrenchBulldogs = () => <h1>FrenchBulldogs</h1>
const Kittens = () => <h1>Kittens</h1>

ReactDOM.render(
  <div>
    <BlueBackground>
      <Pugs />
    </BlueBackground>

    <BlueBackground>
      <FrenchBulldogs />
    </BlueBackground>

    <BlueBackground>
      <Kittens />
    </BlueBackground>
  </div>,
  document.getElementById('app')
)
```
