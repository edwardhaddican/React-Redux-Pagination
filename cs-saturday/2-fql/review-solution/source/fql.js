const Plan = require('./plan');

class FQL {
  constructor (table, plan = new Plan()) {
    this._table = table;
    this._plan = plan;
  }
  // get is the only thing that executes query
  get () {
    const rows = [];
    const ids = this._table.getRowIds();
    for (const id of ids) {
      if (!this._plan.withinLimit(rows)) break;
      const row = this._table.read(id);
      if (this._plan.matchesRow(row)) {
        const selectedRow = this._plan.selectColumns(row);
        rows.push(selectedRow);
      }
    }
    return rows;
  }
  count () {
    return this.get().length;
  }
  _copy () {
    const newPlan = Object.assign(new Plan(), this._plan);
    return new FQL(this._table, newPlan);
  }
  // does not execute the query, store information for later (when the query does get executed)
  limit (amount) {
    // const newPlan = new Plan();
    // for (const k in this._plan) {
    //   newPlan[k] = this._plan[k];
    // }
    // // can be written as...
    const copiedQuery = this._copy();
    copiedQuery._plan.setLimit(amount);
    return copiedQuery;
  }
  // does not execute the query, store information for later (when the query does get executed)
  // select () {
  //   const columns = Array.prototype.slice.call(arguments);
  // // can be written as ...
  select (...columns) {
    const copiedQuery = this._copy();
    copiedQuery._plan.setSelected(columns);
    return copiedQuery;
  }
  // does not execute the query, store information for later (when the query does get executed)
  where (criteria) {
    const copiedQuery = this._copy();
    copiedQuery._plan.setCriteria(criteria);
    return copiedQuery;
  }
  // extra credit...
  static merge () {}
  innerJoin () {}
}

module.exports = FQL;
