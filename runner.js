const fs = require('fs');
const path = require('path');

class Runner {
  constructor() {
    this.testFiles = [];
  }

  async runTests() {
    for (const file of this.testFiles) {
      const beforeEaches = [];
      global.beforeEach = (fn) => beforeEaches.push(fn);
      global.it = (desc, fn) => {
        beforeEaches.forEach((func) => func());
        fn();
      };
      require(file.name);
    }
  }

  // Breadth First Search
  async collectFiles(targetPath) {
    const files = await fs.promises.readdir(targetPath);

    for (const file of files) {
      const filepath = path.join(targetPath, file);
      const stats = await fs.promises.lstat(filepath);

      if (stats.isFile() && file.includes('.test.js')) {
        this.testFiles.push({ name: filepath });
      } else if (stats.isDirectory()) {
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
