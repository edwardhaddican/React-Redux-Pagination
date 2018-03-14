const betterFetch = async (url) => {
  const response = await window.fetch(url)
  const data = await response.json()
  return data
}

const ul = document.getElementById('puppies-ul')
const button = document.getElementById('get-moar-pups')

const fetchAndAddPuppiesToList = async () => {
  const data = await betterFetch('/puppies')

  data.forEach(puppy => {
    const li = document.createElement('li')
    li.innerHTML = puppy.name
    ul.appendChild(li)
  })
}

button.addEventListener('click', fetchAndAddPuppiesToList)

fetchAndAddPuppiesToList()
