const Sequelize = require('sequelize')
const {STRING, INTEGER, BOOLEAN, DATE} = Sequelize
const db = new Sequelize('postgres://localhost:5432/plantr')
module.exports = db

const Gardener = db.define('gardener', {
  name: STRING,
  age: INTEGER
})

const Plot = db.define('plot', {
  size: INTEGER,
  shaded: BOOLEAN
})

const Vegetable = db.define('vegetable', {
  name: STRING,
  color: STRING,
  'planted_on': DATE
})

Gardener.belongsTo(Vegetable, {as: 'favorite_vegetable'})
Plot.belongsTo(Gardener)
Gardener.hasOne(Plot)
Vegetable.belongsToMany(Plot, {through: 'plot_vegetable'})
Plot.belongsToMany(Vegetable, {through: 'plot_vegetable'})

module.exports = {
  db, Gardener, Plot, Vegetable
}
