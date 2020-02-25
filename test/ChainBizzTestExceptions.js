const chainBizzContract = artifacts.require('ChainBizz');

// test suite
contract('ChainBizz', async accounts => {
  let contractInstance;
  const title = 'Blockchain for Notary';
  const price = 10000000000000000000;
  const errorPublished = 'A hash to IPFS is required';

  before('setup contract for each test', async () => {
    contractInstance = await chainBizzContract.deployed();
  });

  it('should throw an exception if IPFS hash is not defined', async () => {
    try {
      // try to publish a project with an IPFS hash

      await contractInstance.publishProject(title, web3.utils.toBN(price), '', {
        from: accounts[1]
      });
      assert.fail();
    } catch (err) {
      assert.equal(
        err.reason,
        errorPublished,
        'error message should be: ' + errorPublished
      );
    }
  });
});
