- Sequelize: Task.update
  - getSiblings, addChild

```javascript
Task.belongsTo(Task, {as: 'parent'})
// id | content | parentId
// 1  | 'do chores' | null
// 2  | 'vacuum' | 1
// 3  | 'dust' | 1

Task.prototype.addChild = async function (soonToBeChildTaskInfo) {
  // this => instance invoking the method
  //      => (in this case, doChoresTask)
  const newlyCreatedChildTask = await Task.create({
    content: soonToBeChildTaskInfo.content,
    parentId: this.id
  })
  return newlyCreatedChildTask
}

doChoresTask.addChild({content: 'vacuum'})

```

```javascript
const Sequelize = require('sequelize')
const Op = Sequelize.Op
Task.prototype.getSiblings = function () {
  const parentId = this.parentId
  const selfId = this.id
  return Task.findAll({
    // SELECT * from tasks WHERE id != selfId AND parentId = parentId
    where: {
      id: {
        [Op.ne]: selfId
      },
      parentId: {
        [Op.eq]: parentId
      }
    }
  })
}

dustTask.getSiblings() // Promisefor: [{id: 2, content: 'vacuum', parentId: 1}]
```
