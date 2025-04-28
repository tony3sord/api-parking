const { default: Sequencer } = require('@jest/test-sequencer');

class CustomSequencer extends Sequencer {
  sort(tests) {
    const order = [
      'user.controller.e2e-spec.ts',
      'app.e2e-spec.ts',
      'auth.controller.e2e-spec.ts',
      'user.update.e2e-spec.ts',
      'parking.controller.e2e-spec.ts',
      'user.delete.e2e-spec.ts',
    ];

    const sortedTests = tests.sort((a, b) => {
      const aName = a.path.split('/').pop();
      const bName = b.path.split('/').pop();
      return order.indexOf(aName) - order.indexOf(bName);
    });

    return sortedTests;
  }
}

module.exports = CustomSequencer;
