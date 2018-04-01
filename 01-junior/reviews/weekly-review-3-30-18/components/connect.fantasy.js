const connect = (mapState, mapDispatch) => (Component) => {
  return class ConnectedComponent extends React.Component {
    constructor () {
      super()
      this.state = this.magicContext.store.getState()
    }

    componentDidMount () {
      this.unsubscribe = this.magicContext.store.subscribe(() => {
        this.setState(this.magicContext.store.getState())
      })
    }

    componentWillUnmount () {
      this.unsubscribe()
    }

    render () {
      const stateIWant = mapState(this.magicContext.store.getState())
      const behaviorIWant = mapDispatch(this.magicContext.store.dispatch)

      return <Component {...stateIWant} {...behaviorIWant} />
    }
  }
}
