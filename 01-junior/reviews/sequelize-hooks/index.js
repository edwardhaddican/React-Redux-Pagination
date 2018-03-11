const {green} = require('chalk')
const Sequelize = require('sequelize')
const {STRING} = Sequelize
const connection = 'postgres://localhost/codys-clubhouse-example'
const opts = {logging: false}
const db = new Sequelize(connection, opts)

// models/pug.js
const Pug = db.define('pugs', {
  name: STRING
})

Pug.beforeValidate((pugInstance) => {
  console.log('About to validate 1: ')
})

Pug.beforeValidate((pugInstance) => {
  console.log('About to validate 2:')
})

Pug.afterValidate((pugInstance) => {
  console.log('Done validating: ')
})

Pug.beforeCreate((pugInstance) => {
  console.log('About to create: ')
})

Pug.afterCreate((pugInstance) => {
  console.log('Done creating: ')
  return Human.create({name: 'Tom'})
    .then(tom => {
      console.log(tom.name)
    })
})

Pug.afterCreate((pugInstance) => {
  console.log('Done creating 2 ')
})

// models/human.js
const Human = db.define('human', {
  name: STRING
})

Human.belongsTo(Pug)

const main = async () => {
  console.log(green('\nWelcome to the clubhouse!\n'))

  await db.sync({force: true})

  await Pug.create({name: 'Cody'})

  await db.close()

  console.log(green('\nLeaving the clubhouse!\n'))
}

main()
