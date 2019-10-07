const chainBizzContract = artifacts.require('ChainBizz');

// test suite
contract('ChainBizz', async accounts => {
  let contractInstance;
  const projectId = 1;
  const title = 'Project 1';
  const description = 'Description for Project 1';
  const price = 10000000000000000000;
  const newTitle = 'Project 1 - updated';
  const newDescription = 'Description for Project 1 - updated';
  const newPrice = 20000000000000000000;
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

  it('should let us update a project', async () => {
    // update the project
    const receipt = await contractInstance.updateProject(
      projectId,
      newTitle,
      newDescription,
      web3.utils.toBN(newPrice),
      {
        from: accounts[1]
      }
    );

    // check that we have received an event
    assert.equal(receipt.logs.length, 1, 'should have received 1 event');
    assert.equal(
      receipt.logs[0].event,
      'UpdateProject',
      'event name should be UpdateProject'
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
      newTitle,
      'project title must be ' + newTitle
    );
    assert.equal(
      receipt.logs[0].args._price,
      newPrice,
      'price must be ' + newPrice
    );

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
    assert.equal(
      project['_title'],
      newTitle,
      'project title must be ' + newTitle
    );
    assert.equal(
      project['_description'],
      newDescription,
      'description must be ' + newDescription
    );
    assert.equal(project['_price'], newPrice, 'price must be ' + newPrice);
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
      newTitle,
      'project title must be ' + newTitle
    );
    assert.equal(
      receipt.logs[0].args._price,
      newPrice,
      'price must be ' + newPrice
    );

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
    assert.equal(
      project['_title'],
      newTitle,
      'project title must be ' + newTitle
    );
    assert.equal(
      project['_description'],
      newDescription,
      'description must be ' + newDescription
    );
    assert.equal(project['_price'], newPrice, 'price must be ' + newPrice);
    assert.equal(
      project['_status'],
      ProjectStatus.Published,
      'status must be ' + ProjectStatus.Published
    );
  });
});
