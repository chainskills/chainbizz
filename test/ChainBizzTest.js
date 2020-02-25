const chainBizzContract = artifacts.require('ChainBizz');

// test suite
contract('ChainBizz', async accounts => {
  let contractInstance;
  const ipfsHash = 'QmeUndxEyrporsgYpPDzR4JEQQ3AeeYq7LqPpuybYwQi3f';
  const idProject1 = 1;
  const titleProject1 = 'Project 1';
  const priceProject1 = 10000000000000000000;
  const idProject2 = 2;
  const titleProject2 = 'Project 2';
  const priceProject2 = 20000000000000000000;
  const ProjectStatus = {
    Draft: 0,
    Available: 1,
    OnGoing: 2,
    Completed: 3,
    Canceled: 4,
    Unknown: 5
  };

  before('setup contract for each test', async () => {
    contractInstance = await chainBizzContract.deployed();
  });

  it('should let us publish a project', async () => {
    // publish the project
    const receipt = await contractInstance.publishProject(
      titleProject1,
      web3.utils.toBN(priceProject1),
      ipfsHash,
      {
        from: accounts[1]
      }
    );

    // check that we have received an event
    assert.equal(receipt.logs.length, 1, 'should have received 1 event');
    assert.equal(
      receipt.logs[0].event,
      'PublishedProject',
      'event name should be PublishedProject'
    );
    assert.equal(
      receipt.logs[0].args.id.toNumber(),
      idProject1,
      'project id must be 1'
    );
    assert.equal(
      receipt.logs[0].args.issuer,
      accounts[1],
      'issuer must be ' + accounts[1]
    );
    assert.equal(
      receipt.logs[0].args.title,
      titleProject1,
      'project title must be ' + titleProject1
    );
    assert.equal(
      receipt.logs[0].args.price,
      priceProject1,
      'price must be ' + priceProject1
    );
    assert.equal(
      receipt.logs[0].args.ipfsHash,
      ipfsHash,
      'ipfs hash must be ' + ipfsHash
    );

    // retrieve the project from the contract
    const project = await contractInstance.getProject(idProject1);

    // check that we have properly stored the project
    assert.equal(
      project['issuer'],
      accounts[1],
      'issuer must be ' + accounts[1]
    );
    assert.equal(
      web3.utils.toBN(project['fulfiller']),
      0,
      'fulfiller must be null'
    );
    assert.equal(
      project['title'],
      titleProject1,
      'project title must be ' + titleProject1
    );

    assert.equal(
      project['price'],
      priceProject1,
      'price must be ' + priceProject1
    );

    assert.equal(
      project['ipfsHash'],
      ipfsHash,
      'ipfs hash must be ' + ipfsHash
    );

    assert.equal(
      project['status'],
      ProjectStatus.Available,
      'status must be ' + ProjectStatus.Available
    );
  });

  it('should let us publish a second project', async () => {
    // add the second project
    const receipt = await contractInstance.publishProject(
      titleProject2,
      web3.utils.toBN(priceProject2),
      ipfsHash,
      {
        from: accounts[1]
      }
    );

    // check that we have received an event
    assert.equal(receipt.logs.length, 1, 'should have received 1 event');
    assert.equal(
      receipt.logs[0].event,
      'PublishedProject',
      'event name should be PublishedProject'
    );
    assert.equal(
      receipt.logs[0].args.id.toNumber(),
      idProject2,
      'project id must be ' + idProject2
    );
    assert.equal(
      receipt.logs[0].args.issuer,
      accounts[1],
      'issuer must be ' + accounts[1]
    );
    assert.equal(
      receipt.logs[0].args.title,
      titleProject2,
      'project title must be ' + titleProject2
    );
    assert.equal(
      receipt.logs[0].args.price,
      priceProject2,
      'price must be ' + priceProject2
    );
    assert.equal(
      receipt.logs[0].args.ipfsHash,
      ipfsHash,
      'ipfs hash must be ' + ipfsHash
    );

    // retrieve the project from the contract
    const project = await contractInstance.getProject(idProject2);

    // check that we have properly stored the project
    assert.equal(
      project['issuer'],
      accounts[1],
      'issuer must be ' + accounts[1]
    );
    assert.equal(
      web3.utils.toBN(project['fulfiller']),
      0,
      'fulfiller must be null'
    );
    assert.equal(
      project['title'],
      titleProject2,
      'project title must be ' + titleProject2
    );
    assert.equal(
      project['price'],
      priceProject2,
      'price must be ' + priceProject2
    );
    assert.equal(
      project['ipfsHash'],
      ipfsHash,
      'ipfs hash must be ' + ipfsHash
    );
    assert.equal(
      project['status'],
      ProjectStatus.Available,
      'status must be ' + ProjectStatus.Available
    );
  });
});
