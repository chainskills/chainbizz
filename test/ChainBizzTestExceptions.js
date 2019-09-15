const chainBizzContract = artifacts.require('ChainBizz');

// test suite
contract('ChainBizz', async accounts => {
  let contractInstance;
  const projectId = 1;
  const title = 'Blockchain for Notary';
  const description =
    'We are looking for Ethereum developers to create a decentralised platform to notarize legal documents';
  const price = 10000000000000000000;
  const ProjectStatus = {
    Draft: 0,
    Published: 1,
    OnGoing: 2,
    Completed: 3,
    Canceled: 4,
    Unknown: 5
  };
  const errorPublished = 'Cannot be published';

  before('setup contract for each test', async () => {
    contractInstance = await chainBizzContract.deployed();
  });

  it('should let us add a project', async () => {
    // add the project
    const receipt = await contractInstance.addProject(
      title,
      description,
      web3.utils.toBN(price),
      {
        from: accounts[1]
      }
    );
  });

  it('should let us publish a project', async () => {
    // publish the project
    const receipt = await contractInstance.publishProject(projectId, {
      from: accounts[1]
    });
  });

  it('should throw an exception while re-publish a project', async () => {
    // try to republish the same project
    try {
      receipt = await contractInstance.publishProject(projectId, {
        from: accounts[1]
      });
      assert.fail();
    } catch (err) {
      assert.equal(
        err.reason,
        errorPublished,
        'status must be ' + errorPublished
      );
    }
  });
});
