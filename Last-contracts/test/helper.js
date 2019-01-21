// this is a helper to run Mocha test that expect Smart contract Throws/reverts error

module.exports = {
  expectThrow: async(promise) => {
    try {
      await promise
    } catch (err) {
      return
    }
    assert(false, 'Expected throw not received')
  },
  resolveEventToPromise: function(event) {
    return new Promise(function(resolve, reject) {
      event.watch((error, res) => {
        if (error) {
          reject(error)
        } else {
          resolve(res)
        }
      })
    })
  }
}
