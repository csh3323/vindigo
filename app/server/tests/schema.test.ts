import { Schema } from '../src/schema/Schema';

function sum(a, b) {
  return a + b;
}

test('adds 1 + 2 to equal 3', () => {
	const n: number = 3;

	Schema.of("name", () => ({}));

	expect(sum(1, 2)).toBe(n);
});