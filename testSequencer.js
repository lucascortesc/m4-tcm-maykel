const Sequencer = require("@jest/test-sequencer").default;

class CustomSequencer extends Sequencer {
  sort(tests) {
    const copyTests = Array.from(tests);
    return copyTests.sort((testA, testB) => (testA.path > testB.Path ? -1 : 1));
  }
}

module.exports = CustomSequencer;
