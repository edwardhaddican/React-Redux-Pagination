// YOUR CODE HERE
class $ {
  constructor (selector) {
    if (selector[0] === '#') {
      this.elements = [document.getElementById(selector.slice(1))]
    } else if (selector[0] === '.') {
      this.elements = Array.from(document.getElementsByClassName(selector.slice(1)))
    } else {
      this.elements = Array.from(document.getElementsByTagName(selector))
    }
  }

  hide () {
    this.elements.forEach(el => el.style.display = 'none')
    return this
  }

  show () {
    this.elements.forEach(el => el.style.display = 'inherit')
    return this
  }

  addClassName (className) {
    this.elements.forEach(el => el.classList.add(className))
    return this
  }

  removeClassName (className) {
    this.elements.forEach(el => el.classList.remove(className))
    return this
  }

  blink (interval) {
    let showing = true
    setInterval(() => {
      showing ? this.hide() : this.show()
      showing = !showing
    }, interval)
  }

  addChild (nodeName) {
    this.elements.forEach(el => el.appendChild(document.createElement(nodeName)))
    return this
  }

  text (text) {
    this.elements.forEach(el => el.appendChild(document.createTextNode(text)))
    return this
  }
}
// blink (interval, numBlinks) {
//   let showing = true
//   let counter = 0
//   const intervalId = setInterval(() => {
//     showing ? this.hide() : this.show()
//     showing = !showing
//     counter++
//     if (counter > numBlinks) {
//       clearInterval(intervalId)
//       this.show()
//     }
//   }, interval)
// }
