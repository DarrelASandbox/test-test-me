const fs = require('fs');
const path = require('path');
const colors = require('colors');
const render = require('./render');

const ignoreDirectories = ['node_modules'];

class Runner {
  constructor() {
    this.testFiles = [];
  }

  async runTests() {
    for (const file of this.testFiles) {
      console.log(`\n${file.shortName}\n`.yellow);

      const beforeEaches = [];
      global.render = render;
      global.beforeEach = (fn) => beforeEaches.push(fn);
      global.it = (desc, fn) => {
        beforeEaches.forEach((func) => func());
        try {
          fn();
          console.log(`Success - ${desc}`.bold.green);
        } catch (error) {
          console.log(`Failed - ${desc}`.bold.red);
          console.log(`\n${error.message}`.red);
        }
      };
      try {
        require(file.name);
      } catch (error) {
        console.log('\nERROR LOADING FILE'.bgMagenta, `${file.name}`.yellow);
        console.log(`\n${error}`.bold.red);
      }
    }
  }

  // Breadth First Search
  async collectFiles(targetPath) {
    const files = await fs.promises.readdir(targetPath);

    for (const file of files) {
      const filepath = path.join(targetPath, file);
      const stats = await fs.promises.lstat(filepath);

      if (stats.isFile() && file.includes('.test.js')) {
        this.testFiles.push({ name: filepath, shortName: file });
      } else if (stats.isDirectory() && !ignoreDirectories.includes(file)) {
        const childFiles = await fs.promises.readdir(filepath);

        // spread childFiles array & push to files array
        // recursive magic
        files.push(
          ...childFiles.map((childFile) => path.join(file, childFile))
        );
      }
    }
  }
}

module.exports = Runner;
