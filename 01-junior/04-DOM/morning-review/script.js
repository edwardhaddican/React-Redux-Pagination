const button = document.getElementById('the-button')
const select = document.getElementsByTagName('select')[0]

console.dir(select)

// state
let currentColor = select.firstElementChild.value

select.addEventListener('change', (evt) => {
  console.log(evt.target.value)
  currentColor = evt.target.value
})

button.addEventListener('click', () => {
  console.log(currentColor)
})
