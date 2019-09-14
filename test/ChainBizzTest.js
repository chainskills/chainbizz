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

    // check that we have received an event
    assert.equal(receipt.logs.length, 1, 'should have received 1 event');
    assert.equal(
      receipt.logs[0].event,
      'NewProject',
      'event name should be NewProject'
    );
    assert.equal(
      receipt.logs[0].args._id.toNumber(),
      projectId,
      'project id must be 1'
    );
    assert.equal(
      receipt.logs[0].args._owner,
      accounts[1],
      'customer must be ' + accounts[1]
    );
    assert.equal(
      receipt.logs[0].args._title,
      title,
      'project title must be ' + title
    );
    assert.equal(receipt.logs[0].args._price, price, 'price must be ' + price);

    // retrieve the project from the contract
    const project = await contractInstance.getProject(projectId);

    // check that we have properly stored the project
    assert.equal(
      project['_owner'],
      accounts[1],
      'customer must be ' + accounts[1]
    );
    assert.equal(
      web3.utils.toBN(project['_provider']),
      0,
      'provider must be null'
    );
    assert.equal(project['_title'], title, 'project title must be ' + title);
    assert.equal(
      project['_description'],
      description,
      'description must be ' + description
    );
    assert.equal(project['_price'], price, 'price must be ' + price);
    assert.equal(
      project['_status'],
      ProjectStatus.Draft,
      'status must be ' + ProjectStatus.Draft
    );
  });

  it('should let us publish a project', async () => {
    // publish the project
    const receipt = await contractInstance.publishProject(projectId, {
      from: accounts[1]
    });

    // check that we have received an event
    assert.equal(receipt.logs.length, 1, 'should have received 1 event');
    assert.equal(
      receipt.logs[0].event,
      'PublishedProject',
      'event name should be PublishedProject'
    );
    assert.equal(
      receipt.logs[0].args._id.toNumber(),
      projectId,
      'project id must be 1'
    );
    assert.equal(
      receipt.logs[0].args._owner,
      accounts[1],
      'customer must be ' + accounts[1]
    );
    assert.equal(
      receipt.logs[0].args._title,
      title,
      'project title must be ' + title
    );
    assert.equal(receipt.logs[0].args._price, price, 'price must be ' + price);

    // retrieve the project from the contract
    const project = await contractInstance.getProject(projectId);

    // check that we have properly stored the project
    assert.equal(
      project['_owner'],
      accounts[1],
      'customer must be ' + accounts[1]
    );
    assert.equal(
      web3.utils.toBN(project['_provider']),
      0,
      'provider must be null'
    );
    assert.equal(project['_title'], title, 'project title must be ' + title);
    assert.equal(
      project['_description'],
      description,
      'description must be ' + description
    );
    assert.equal(project['_price'], price, 'price must be ' + price);
    assert.equal(
      project['_status'],
      ProjectStatus.Published,
      'status must be ' + ProjectStatus.Published
    );

    // publish the project
    try {
      receipt = await contractInstance.publishProject(projectId, {
        from: accounts[1]
      });
    } catch (err) {
      assert.equal(
        err.reason,
        errorPublished,
        'status must be ' + errorPublished
      );
    }
  });

  it('should let catch exception while re-publish a project', async () => {
    // try to republish the same project
    try {
      receipt = await contractInstance.publishProject(projectId, {
        from: accounts[1]
      });
    } catch (err) {
      assert.equal(
        err.reason,
        errorPublished,
        'status must be ' + errorPublished
      );
    }
  });
});
