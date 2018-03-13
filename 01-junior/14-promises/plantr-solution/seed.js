const {db, Gardener, Plot, Vegetable} = require('./models')

const seed = async () => {
  await db.sync({force: true})
  const [broccoli, carrots, cauliflower] = await Promise.all([
    Vegetable.create({name: 'brocooli'}),
    Vegetable.create({name: 'carrots'}),
    Vegetable.create({name: 'cauliflower'})
  ])
  const cody = await Gardener.create({name: 'Cody', favoriteVegetableId: broccoli.id})
  const plot = await Plot.create({
    gardenerId: cody.id
  })
  await plot.addVegetable(broccoli)
  console.log('Finished!')
  db.close()
}

seed()
.catch((err) => {
  console.error('err!', err)
  db.close()
})

// db.sync({force: true})
//   .then(() => {
//     return Promise.all([
//       Vegetable.create({name: 'brocooli'}),
//       Vegetable.create({name: 'carrots'}),
//       Vegetable.create({name: 'cauliflower'})
//     ])
//   })
//   .then(([broccoli, carrots, cauliflower]) => {
//     broccoliG = broccoli
//     return Gardener.create({name: 'Cody', favoriteVegetableId: broccoli.id})
//   })
//   .then((cody) => {
//     return Plot.create({
//       gardenerId: cody.id
//     })
//   })
//   .then(plot => {
//     return plot.addVegetable(broccoliG)
//   })
//   .then(() => {
//     console.log('Finished!')
//     db.close()
//   })
//   .catch(err => {
//     console.error(err)
//     db.close()
//   })
