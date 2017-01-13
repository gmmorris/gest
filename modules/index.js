import toBePromise from './assertions/toBePromise'

const supportedAssertions = {
  toBePromise: { assert: toBePromise.assert, message: toBePromise.message }
}

function defineMatcherOnExpect (expect, assertionName, { assert, message }) {
  expect.extend({
    [assertionName]: function (received, expected) {
      const pass = assert.length === 1
        ? assert.call(this, received)
        : assert.call(this, received, expected)

      return {
        pass,
        message: message.call(this, received, expected, pass)
      }
    }
  })
  return this
}

export default function (expect) {
  if (!(expect && typeof expect.extend === 'function')) {
    throw new Error(`Invalid 'expect' provided to gest, please provide Jest's global expect`)
  }

  const assertions = {}
  return Object.assign(assertions,
    ...Object
      .keys(supportedAssertions)
      .map(assertionName => {
        return {
          [assertionName]: defineMatcherOnExpect
            .bind(assertions, expect, assertionName, supportedAssertions[assertionName])
        }
      })
  )
}
