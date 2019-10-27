import * as Record from './record'

interface Test {
	foo?: { bar: number }
}
const input: Test = { foo: { bar: 1 } }
Record.update(input, 'foo', 'bar')(v => v + 1)
