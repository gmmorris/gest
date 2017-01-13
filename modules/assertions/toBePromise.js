import isObjectLike from 'lodash.isobjectlike'
import diff from 'jest-diff'

export function assert (obj) {
  return isObjectLike(obj) && Promise.resolve(obj) === obj
}

function printDiff (diffString) {
  return diffString ? `
  
  Difference:
    ${diffString}
  ` : ``
}
export function message (received, expected, pass) {
  return pass
    ? () => `${this.utils.matcherHint('.not.toBe')}
    
    Expected value to not be a Promise:
      Promise.resolve(${this.utils.printExpected(expected)}) === ${this.utils.printExpected(expected)}
    Received:
      ${this.utils.printReceived(received)}`
    : () => {
      const diffString = diff(expected, received, {
        expand: this.expand
      })

      return `${this.utils.matcherHint('.toBe')}
          
          Expected value to not be a Promise:
            Promise.resolve(${this.utils.printExpected(expected)}) === ${this.utils.printExpected(expected)}
          Received:
            ${this.utils.printReceived(received)}
          ${printDiff(diffString)}`
    }
}

export default {
  assert,
  message
}
