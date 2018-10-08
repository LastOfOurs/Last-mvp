var LAST = artifacts.require('./LAST.sol')
var assert = require('assert')
var expectThrow = require('./helper.js')

const interfaceERC165 = '0x01ffc9a7'
const interfaceERC721 = '0x80ac58cd'

beforeEach(async function () {
  // generate new LAST Contract for every test
  this.token = await LAST.new('Last', 'LTK')
})

describe('supports ERC165', async function () {
  it('should return true for the ERC165 interface', async function () {
    let supportsERC165 = await this.token.supportsInterface(interfaceERC165)
    assert.equal(supportsERC165, true)
  })
})

describe('supports ERC721', async function () {
  it('should return true for the ERC721 interface', async function () {
    let supportsERC721 = await this.token.supportsInterface(interfaceERC721)
    assert.equal(supportsERC721, true)
  })
})
