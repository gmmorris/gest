import gest from '../index'

const gestExtension = gest(expect)

describe('toBePromise', () => {
  it('gest().toBePromise() installs the isPromise matcher', () => {
    expect(typeof gestExtension.toBePromise).toBe('function')
    gestExtension.toBePromise()
  })

  it('toBePromise validatest the one argument is a promise', () => {
    expect(new Promise(() => {})).toBePromise()
  })

  it('toBePromise validatest the one argument is a promise', () => {
    expect({}).not.toBePromise()

    expect(() => {
      expect({}).toBePromise()
    }).toThrow()
  })
})
