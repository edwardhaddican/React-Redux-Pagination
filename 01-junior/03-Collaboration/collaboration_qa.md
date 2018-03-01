# Show/Hide dot files on Mac OS Finder
 Cmd + Shift + .

# Multi-repository projects
For JS specifically, there are tools like lerna.

# Integration between VSCode & Chrome for debugging.

It doesn't add anything that Chrome Dev Tools doesn't have - but it does show things in a different interface, so It's a a matter of trying it.

# Debugging Takeways

- Have ESLint
- GIT hygiene
- functions - Keep them small, keep them single-purposed, keep them pure

Example of function with side-effects:

```js
let currentCohort = "1802-FSA-RM";
...
function notifyStudents() {
  const students = getAllStudents(currentCohort);
  students.notify("Wake Up");
}

```

Example of pure function:

```js
function notifyStudents(currentCohort) {
  const students = getAllStudents(currentCohort);
  students.notify("Wake Up");
}
```