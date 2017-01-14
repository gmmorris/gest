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
      Promise.resolve(${this.utils.printExpected(received)}) !== ${this.utils.printExpected(received)}
    Received:
      Promise.resolve(${this.utils.printExpected(received)}) === ${this.utils.printExpected(received)}`
    : () => {
      const diffString = diff(new Promise(() => received), received, {
        expand: this.expand
      })

      return `${this.utils.matcherHint('.toBe')}
          
          Expected value to be a Promise:
            Promise.resolve(${this.utils.printExpected(received)}) === ${this.utils.printExpected(received)}
          Received:
            ${this.utils.printReceived(received)}
          ${printDiff(diffString)}`
    }
}

export default {
  assert,
  message
}
