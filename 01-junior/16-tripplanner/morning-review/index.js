const Sequelize = require('sequelize')
const db = new Sequelize('postgres://localhost/codys-clubhouse-example', {
  logging: false
})

const Pug = db.define('pugs', {
  name: Sequelize.STRING,
  color: Sequelize.STRING
})

Pug.findByColor = function (color) {
  // this => Pug model/table
  return Pug.findAll({
    where: {
      color: color
    }
  })
}

Pug.prototype.sayName = function () {
  // this => specific pug row
  console.log(this.name)
}

const Owner = db.define('owners', {
  name: Sequelize.STRING
})

const Friend = db.define('friend', {
  name: Sequelize.STRING
})

Pug.belongsTo(Owner)
Pug.belongsTo(Friend)
Owner.hasMany(Pug)
Friend.hasMany(Friend)

const main = async () => {
  await db.sync({force: true})
  const tom = await Owner.create({name: 'tom'})
  const horacio = await Owner.create({name: 'horacio'})
  const friend = await Friend.create({name: 'franklin'})
  const cody = await Pug.create({name: 'cody', ownerId: tom.id, friendId: friend.id})
  const murphy = await Pug.create({name: 'murphy', ownerId: horacio.id })

  const allPugs = await Pug.findAll({
    include: [{model: Owner}]
  })

  cody.sayName()
  const fawnPugs = await Pug.findByColor('fawn')
  console.log('allPugs: ', allPugs.map(pug => pug.dataValues))
  db.close()
}

main()
