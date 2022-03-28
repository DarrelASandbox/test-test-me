## About The Project

- The Modern Javascript Bootcamp Course (2022)
- The most up-to-date JS resource online! Master Javascript by building a beautiful portfolio of projects!
- Tutorial for tme (Building a Testing Framework From Scratch)
- [Colt Steele](https://github.com/Colt)
- [Stephen Grider](https://github.com/StephenGrider)

&nbsp;

## Notes

- Command to search for <code>.test.js</code> from any directory.

```sh
tme
```

- [global variable in browser & Node.js](https://nodejs.org/api/globals.html#globals_global)

### Testing Framework Requirements

1. Must be a Node-based CLI framework
2. Must be able to test browser-based JS apps
3. Must require very, very little setup
4. Must be able to test a whole application, not just one little widget
5. CLI must have a 'watch mode' so we don't have to keep restarting it over and over
6. CLI must automatically find and run all files in our project that have a name of '\*.test.js'

![JSDOM](JSDOM.png)

<style>table,th,td {text-align: center; width: 500px}</style>

---

<table>
  <thead>
    <tr>
      <th colspan="2">Mocha in the Browser</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>createAutoComplete</td>
      <td>Email Validation</td>
    </tr>
    <tr>
      <td>We had a function to run as manay times as we wanted</td>
      <td>Form logic executes instantly with 'index.js' being loaded</td>
    </tr>
    <tr>
      <td>We could create a new autocomplete for each test</td>
      <td>No easy ability to bind to a second form</td>
    </tr>
    <tr>
      <td>Direct handle onto the function we want to test</td>
      <td>Effectively, can only run one test</td>
    </tr>
  </tbody>
</table>

### Implementation Plan

1. File Collection
   - Find all files ending in '\*test.js' recursively through a folder
   - Store a reference to each file we find
   - After getting a full list of the rest files, execute them one by one
2. Test environment setup
3. Test file execution
4. Report results

&nbsp;
