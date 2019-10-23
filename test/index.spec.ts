import sum from '../src/lib/test';

describe('test', () => {
  it('works if true is truthy', () => {
    expect(true).toBeTruthy()
  })

  it('sum', () => {
    expect(sum(1, 2)).toEqual(3);
  })
})