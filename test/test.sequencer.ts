const { default: Sequencer } = require('@jest/test-sequencer');

class CustomSequencer extends Sequencer {
  sort(tests) {
    const order = [
      'user.create.e2e-spec.ts',
      'app.e2e-spec.ts',
      'auth.controller.e2e-spec.ts',
      'parking.controller.e2e-spec.ts',
      'user.update.e2e-spec.ts',
      'get.parking.controller.e2e-spec.ts',
      'parkingSpot.controller.e2e-spec.ts',
      'delete.parking.controller.e2e-spec.ts',
      'user.delete.e2e-spec.ts',
    ];

    const testMap = new Map();
    tests.forEach((test) => {
      const name = test.path.split('/').pop();
      testMap.set(name, test);
    });

    const sortedTests = order
      .filter((name) => testMap.has(name))
      .map((name) => testMap.get(name));

    return sortedTests;
  }
}

module.exports = CustomSequencer;
