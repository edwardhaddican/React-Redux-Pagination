class Plan {
  // hold onto the limit
  setLimit (limit) {
    this._limit = limit;
  }
  // check whether some result set has hit the limit yet
  withinLimit (rows) {
    if (!this.hasOwnProperty('_limit')) return true;
    return rows.length < this._limit;
  }
  // hold onto the columns to select
  setSelected (selectedColumns) {
    if (selectedColumns.includes('*')) {
      delete this._selectedColumns;
    } else {
      this._selectedColumns = selectedColumns;
    }
  }
  // select certain columns (the ones we have store from `setSelected`) from a row
  selectColumns (row) {
    if (!this.hasOwnProperty('_selectedColumns')) return row;
    const selectedRow = {};
    for (const column of this._selectedColumns) {
      selectedRow[column] = row[column];
    }
    return selectedRow;
  }
  // hold onto the criteria
  setCriteria (criteria) {
    this._criteria = criteria;
  }
  // // the following does not work! it has a `this` issue!
  // matchesRow (row) {
  //   if (!this.hasOwnProperty('_criteria')) return true;
  //   return Object.keys(this._criteria).every(function (column) {
  //     const cond = this._criteria[column]; // what will `this` be? ordinary functions determine their `this` by HOW they are invoked (call site)—i.e. when they are invoked, what is "to the left of the dot"
  //     // handle "predicate" function conditions
  //     if (typeof cond === 'function') {
  //       return cond(row[column]);
  //     }
  //     // handle ordinary values conditions
  //     return cond === row[column];
  //   });
  // }
  // // can be solved with an arrow function...
  // say whether or not a given row matches the stored criteria
  matchesRow (row) {
    if (!this.hasOwnProperty('_criteria')) return true;
    return Object.keys(this._criteria).every(column => {
      const cond = this._criteria[column]; // what will `this` be? arrow functions determine their `this` from their enclosing function (lexical scope)
      // handle "predicate" function conditions
      if (typeof cond === 'function') {
        return cond(row[column]);
      }
      // handle ordinary values conditions
      return cond === row[column];
    });
  }
  splitCriteria (table) {
    const indexedCriteria = {};
    const nonIndexedCriteria = {};
    if (!this.hasOwnProperty('_criteria')) return undefined;
    for (const column of Object.keys(this._criteria)) {
      if (table.hasIndexTable(column)) {
        indexedCriteria[column] = this._criteria[column];
      } else {
        nonIndexedCriteria[column] = this._criteria[column];
      }
    }
    // indexedCriteria = {year: 1999};
    // nonIndexedCriteria = {};
    return {
      nonIndexedCriteria,
      indexedCriteria
    };
  }
  handleIndexingAndReturnInitialIds (table) {
    const theSplit = this.splitCriteria(table);
    if (theSplit === undefined) return table.getRowIds();
    const {indexedCriteria, nonIndexedCriteria} = theSplit;
    // useful for `matchesRow`
    this._criteria = nonIndexedCriteria;
    if (Object.keys(indexedCriteria).length === 0) {
      // no indexing, return all table row ids
      return table.getRowIds();
    } else {
      for (const column in indexedCriteria) {
        // find the indexed ids
        const indexTable = table.getIndexTable(column);
        const indexTableKey = indexedCriteria[column];
        const indexedIds = indexTable[indexTableKey];
        return indexedIds;
      }
    }
  }
}

module.exports = Plan;
