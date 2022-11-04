import { get } from '../src/get'

test('get should return an api handler', () => {
  const handler = get((a) => {
    return a.json('test')
  })
})
