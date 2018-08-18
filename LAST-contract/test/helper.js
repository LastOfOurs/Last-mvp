//this is a helper to run Mocha test that expect Smart contract Throws/reverts error

module.exports =  async (promise) => {
    try {
        await promise;
    } catch (err) {
        return;
    }
    assert(false, 'Expected throw not received');
}