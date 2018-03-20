'use strict';

const db = require('./database');
const Sequelize = require('sequelize');
const Op = Sequelize.Op

// Make sure you have `postgres` running!

const User = require('./user');

//---------VVVV---------  your code below  ---------VVV----------

const Article = db.define('article', {
  title: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  version: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  tags: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: [],
    get () {
      return this.getDataValue('tags').join(', ')
    }
  }
});

Article.prototype.truncate = function (n) {
  this.content = this.content.slice(0, n)
}

Article.findByTitle = async function (title) {
  const article = await Article.findOne({
    where: {
      title: {
        [Op.eq]: title
      }
    }
  })
  return article
}

Article.belongsTo(User, {as: 'author'})

Article.beforeUpdate((article) => {
  article.version++
})

//---------^^^---------  your code above  ---------^^^----------

module.exports = Article;
