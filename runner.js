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
      const its = [];

      global.render = render;
      global.beforeEach = (fn) => beforeEaches.push(fn);
      global.it = async (desc, fn) => {
        its.push({ desc, fn });
      };

      try {
        require(file.name);
        for (let _it of its) {
          const { desc, fn } = _it;
          for (let _before of beforeEaches) {
            _before();
          }
          try {
            await fn();
            console.log(`Success - ${desc}`.bold.green);
          } catch (error) {
            console.log(`Failed - ${desc}`.bold.red);
            console.log(`\n${error.message}`.red);
          }
        }
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
