## JavaScript ecosystem super fight

### Backend

* Express, Koa
  * Express is kind of like a linked list of middleware
  * Koa is kind of like a stack of middleware

* SQL (relational databases), "NoSQL" ("document" databases, "graph" databases)
  * SQL/relational data
    * Data is stored in relational tables
    * Primary/foreign key relations
    * Use SQL as our means of querying
    * ACID-compliant transactions
      * A - Atomicity
      * C - Consistency
      * I - Isolation
      * D - Durability
    * "All or nothing"
    * Tends to be better at scaling "vertically"
    * Harder to scale "horizontally", because you may compromise ACID-qualities, or just be slower
    * Need to know what your data looks like ahead of time. Adding/removing columns from a table can be a lot of work.

  * NoSQL
    * Data is stored in JSON-formatted "documents"
      * No "schema", or sense of structured data
    * Still FK references to other documents
    * De-normalized data when possible
    * Querying is up to the framework, often JS-like syntax
    * Often be quicker to get info you need when it's de-normalized
    * Also tend to be easier to scale "horizontally"
      * Easier to add more servers
    * Not ACID compliant

* Sequelize (ORM), Knex (query-builder)

### Front End

* React, Angular, Vue, Elm
