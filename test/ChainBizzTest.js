const chainBizzContract = artifacts.require('ChainBizz');

// test suite
contract('ChainBizz', async accounts => {
  let contractInstance;
  const idProject1 = 1;
  const titleProject1 = 'Project 1';
  const descriptionProject1 = 'Description for Project 1';
  const priceProject1 = 10000000000000000000;
  const newTitleProject1 = 'Project 1 - updated';
  const newDescriptionProject1 = 'Description for Project 1 - updated';
  const newPriceProject1 = 20000000000000000000;
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
      titleProject1,
      descriptionProject1,
      web3.utils.toBN(priceProject1),
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
      idProject1,
      'project id must be 1'
    );
    assert.equal(
      receipt.logs[0].args._owner,
      accounts[1],
      'customer must be ' + accounts[1]
    );
    assert.equal(
      receipt.logs[0].args._title,
      titleProject1,
      'project title must be ' + titleProject1
    );
    assert.equal(
      receipt.logs[0].args._price,
      priceProject1,
      'price must be ' + priceProject1
    );

    // retrieve the project from the contract
    const project = await contractInstance.getProject(idProject1);

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
      titleProject1,
      'project title must be ' + titleProject1
    );
    assert.equal(
      project['_description'],
      descriptionProject1,
      'description must be ' + descriptionProject1
    );
    assert.equal(
      project['_price'],
      priceProject1,
      'price must be ' + priceProject1
    );
    assert.equal(
      project['_status'],
      ProjectStatus.Draft,
      'status must be ' + ProjectStatus.Draft
    );
  });

  it('should let us update a project', async () => {
    // update the project
    const receipt = await contractInstance.updateProject(
      idProject1,
      newTitleProject1,
      newDescriptionProject1,
      web3.utils.toBN(newPriceProject1),
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
      idProject1,
      'project id must be 1'
    );
    assert.equal(
      receipt.logs[0].args._owner,
      accounts[1],
      'customer must be ' + accounts[1]
    );
    assert.equal(
      receipt.logs[0].args._title,
      newTitleProject1,
      'project title must be ' + newTitleProject1
    );
    assert.equal(
      receipt.logs[0].args._price,
      newPriceProject1,
      'price must be ' + newPriceProject1
    );

    // retrieve the project from the contract
    const project = await contractInstance.getProject(idProject1);

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
      newTitleProject1,
      'project title must be ' + newTitleProject1
    );
    assert.equal(
      project['_description'],
      newDescriptionProject1,
      'description must be ' + newDescriptionProject1
    );
    assert.equal(
      project['_price'],
      newPriceProject1,
      'price must be ' + newPriceProject1
    );
    assert.equal(
      project['_status'],
      ProjectStatus.Draft,
      'status must be ' + ProjectStatus.Draft
    );
  });

  it('should let us publish a project', async () => {
    // publish the project
    const receipt = await contractInstance.publishProject(idProject1, {
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
      idProject1,
      'project id must be 1'
    );
    assert.equal(
      receipt.logs[0].args._owner,
      accounts[1],
      'customer must be ' + accounts[1]
    );
    assert.equal(
      receipt.logs[0].args._title,
      newTitleProject1,
      'project title must be ' + newTitleProject1
    );
    assert.equal(
      receipt.logs[0].args._price,
      newPriceProject1,
      'price must be ' + newPriceProject1
    );

    // retrieve the project from the contract
    const project = await contractInstance.getProject(idProject1);

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
      newTitleProject1,
      'project title must be ' + newTitleProject1
    );
    assert.equal(
      project['_description'],
      newDescriptionProject1,
      'description must be ' + newDescriptionProject1
    );
    assert.equal(
      project['_price'],
      newPriceProject1,
      'price must be ' + newPriceProject1
    );
    assert.equal(
      project['_status'],
      ProjectStatus.Published,
      'status must be ' + ProjectStatus.Published
    );
  });
});
