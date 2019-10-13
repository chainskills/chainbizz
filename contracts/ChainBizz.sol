pragma solidity >=0.4.21 <0.6.0;

import 'openzeppelin-solidity/contracts/math/SafeMath.sol';

// @title Decentralised business platform
contract ChainBizz {
  //
  // OpenZeppelin specifics
  //
  using SafeMath for uint256;

  // Defines the status of the project
  enum ProjectStatus {
    Draft,
    Available, 
    InReview,
    OnGoing, 
    Validate,
    Completed,
    Canceled,
    Unknown
  }

  //
  // State variables
  //

  // Description of a project
  struct ProjectItem {
    uint256 id;               // unique ID
    address payable owner;
    address payable provider;             
    string title;
    string description;
    uint256 price;            // price in Wei
    ProjectStatus status;      
  }

  // List of projects
  mapping(uint256 => ProjectItem) public projects;

  // Number of registered projects
  uint256 projectsCounter;
  
  //
  // Events
  //
  event NewProject(uint256 id, address owner, string title, uint256 price);
  event UpdateProject(uint256 id, address owner, string title, uint256 price);
  event RemoveProject(uint256 id, address owner, string title);
  event PublishedProject(uint256 id, address owner, string title, uint256 price);
  event UnpublishedProject(uint256 id, address owner, string title, uint256 price);
  event OfferSubmitted(uint256 id, address owner, string title, uint256 price);
  event OfferCancelled(uint256 id, address owner, address provider, string title, uint256 price);
  event AcceptProposal(uint256 id, address owner, address provider, string title, uint256 price);
  event RejectProposal(uint256 id, address owner, address provider, string title, uint256 price);
  event ProjectDelivered(uint256 id, address owner, address provider, string title, uint256 price);
  event ServicesCancelled(uint256 id, address owner, address provider, string title, uint256 price);
  event DeliveryAccepted(uint256 id, address owner, address provider, string title, uint256 price);
  event DeliveryRejected(uint256 id, address owner, address provider, string title, uint256 price);
  event ContractCancelled(uint256 id, address owner, address provider, string title, uint256 price);

  //
  // Implementation
  //


  //
  // Setters
  //
  
  // Add a new project
  function addProject(string memory _title, string memory _description, uint256 _price) public {
    
    // a title is required
    bytes memory title = bytes(_title);
    require(title.length > 0, "A title is required");

    // a description is required
    bytes memory description = bytes(_description);
    require(description.length > 0, "A description is required");

    // new project
    projectsCounter = projectsCounter.add(1);

    // store the new project
    projects[projectsCounter] = ProjectItem(projectsCounter, msg.sender, address(0x0), _title,  _description, _price, ProjectStatus.Draft);

    emit NewProject(projectsCounter, msg.sender, _title, _price);
  }

  // Update an unpublished project
  function updateProject(uint256 _id, string memory _title, string memory _description, uint256 _price) public {
    
    // retrieve the project
    ProjectItem storage project = projects[_id];

    // ensure that this project exists
    if (project.owner == address(0x0)) {
      return;
    }
 
    // do we own this project?
    require(project.owner == msg.sender, "You are not the owner of this project");

    // ready to be published?
    require(project.status == ProjectStatus.Draft, "Cannot be updated while published");

    // a title is required
    bytes memory title = bytes(_title);
    require(title.length > 0, "A title is required");

    // a description is required
    bytes memory description = bytes(_description);
    require(description.length > 0, "A description is required");

    // update the project
    project.title = _title;
    project.description = _description;
    project.price = _price;

    emit UpdateProject(projectsCounter, msg.sender, _title, _price);
  }

  // Remove an unpublished project
  function removeProject(uint256 _id) public {
    
    // retrieve the project
    ProjectItem memory project = projects[_id];

    // ensure that this project exists
    if (project.owner == address(0x0)) {
      return;
    }
 
    // do we own this project?
    require(project.owner == msg.sender, "You are not the owner of this project");

    // ready to be removed?
    require(project.status == ProjectStatus.Draft, "Cannot be removed while published");

    // keep title for future use
    string memory title = project.title;

    // remove the project
    delete projects[_id];

    emit RemoveProject(_id, msg.sender, title);
  }

  // Publish the project to seek for providers
  function publishProject(uint256 _id) public {
    
    // retrieve the project
    ProjectItem storage project = projects[_id];

    // ensure that this project exists
    if (project.owner == address(0x0)) {
      return;
    }
 
    // do we own this project?
    require(project.owner == msg.sender, "You are not the owner of this project");

    // ready to be published?
    require(project.status == ProjectStatus.Draft, "Cannot be published");

    // publish the project to be available for services
    project.status = ProjectStatus.Available;

    emit PublishedProject(_id, msg.sender, project.title, project.price);
  }

  // Unpublish the project
  // A project can be unpublished ONLY if it's already published and not already part of a contract 
  function unpublishProject(uint256 _id) public {
    
    // retrieve the project
    ProjectItem storage project = projects[_id];

    // ensure that this project exists
    if (project.owner == address(0x0)) {
      return;
    }
 
    // do we own this project?
    require(project.owner == msg.sender, "You are not the owner of this project");

    // ready to be unpublished?
    require(project.status == ProjectStatus.Available, "Cannot be unpublished");

    // unpublish the project
    project.status = ProjectStatus.Draft;

    emit UnpublishedProject(_id, msg.sender, project.title, project.price);
  }

  // Offer services for the project
  // A provider offers his/her services to perform the project 
  function submitOffer(uint256 _id) public {
    
    // retrieve the project
    ProjectItem storage project = projects[_id];

    // ensure that this project exists
    if (project.owner == address(0x0)) {
      return;
    }
 
    // is the project available?
    require(project.status == ProjectStatus.Available, "Project no more available");

    // store the address of the provider
    project.provider = msg.sender;

    // project is under review
    project.status = ProjectStatus.InReview;

    emit OfferSubmitted(_id, msg.sender, project.title, project.price);
  }

  // Cancel offer made by the provider
  // A provider cancels his/her offer to perform the project 
  function cancelOffer(uint256 _id) public {
    
    // retrieve the project
    ProjectItem storage project = projects[_id];

    // ensure that this project exists
    if (project.owner == address(0x0)) {
      return;
    }
 
     // are we the service provider?
    require(project.provider == msg.sender, "You are not the service provider");

    // is the project in review?
    require(project.status == ProjectStatus.InReview , "Proposal not in review");

    // project is now available
    address provider = project.provider;
    project.status = ProjectStatus.Available;
    project.provider = address(0x0);

    emit OfferCancelled(_id, msg.sender, provider, project.title, project.price);
  }

  // Accept services from the provider
  // The owner accepts the services offered by the provider 
  function acceptProposal(uint256 _id) payable public {
    
    // retrieve the project
    ProjectItem storage project = projects[_id];

    // ensure that this project exists
    if (project.owner == address(0x0)) {
      return;
    }
 
     // do we own this project?
    require(project.owner == msg.sender, "You are not the owner of this project");

    // is the project in review?
    require(project.status == ProjectStatus.InReview, "Proposal not in review");

    // is the owner has deposit the requeste amount?
    require(msg.value == project.price, "Your deposit doesn't match the contract's price");

    // project is now ongoing
    project.status = ProjectStatus.OnGoing;

    emit AcceptProposal(_id, msg.sender, project.provider, project.title, project.price);
  }

  // Reject proposal from the provider
  // The owner rejects the services offered by the provider 
  function rejectProposal(uint256 _id) public {
    
    // retrieve the project
    ProjectItem storage project = projects[_id];

    // ensure that this project exists
    if (project.owner == address(0x0)) {
      return;
    }
 
     // do we own this project?
    require(project.owner == msg.sender, "You are not the owner of this project");

    // is the project in review?
    require(project.status == ProjectStatus.InReview , "Proposal not in review");

    // project is now available
    address provider = project.provider;
    project.status = ProjectStatus.Available;
    project.provider = address(0x0);
    
    emit RejectProposal(_id, msg.sender, provider, project.title, project.price);
  }

  // Deliver the project to the customer
  // The provider delivers the project to the owner 
  function deliverProject(uint256 _id) public {
    
    // retrieve the project
    ProjectItem storage project = projects[_id];

    // ensure that this project exists
    if (project.owner == address(0x0)) {
      return;
    }
 
    // are we the service provider?
    require(project.provider == msg.sender, "You are not the service provider");

    // is the project ongoing?
    require(project.status == ProjectStatus.OnGoing, "Project not in progress");

    // project is now validation process
    project.status = ProjectStatus.Validate;

    emit ProjectDelivered(_id, msg.sender, project.provider, project.title, project.price);
  }

   // Cancel services from the provider
  // The provider cancels the services performed for the project 
  function cancelServices(uint256 _id) public {
    
    // retrieve the project
    ProjectItem storage project = projects[_id];

    // ensure that this project exists
    if (project.owner == address(0x0)) {
      return;
    }
 
    // are we the service provider?
    require(project.provider == msg.sender, "You are not the service provider");

    // is the project ongoing?
    require(project.status == ProjectStatus.OnGoing, "Project not in progress");

    // project becomes available
    address provider = project.provider;
    project.status = ProjectStatus.Available;
    project.provider = address(0x0);
    
    emit ServicesCancelled(_id, msg.sender, provider, project.title, project.price);
  }

  // Accept the project delivery from the provider
  // The owner accepts the project delivered by the provider 
  function acceptDelivery(uint256 _id) public {
    
    // retrieve the project
    ProjectItem storage project = projects[_id];

    // ensure that this project exists
    if (project.owner == address(0x0)) {
      return;
    }
 
     // do we own this project?
    require(project.owner == msg.sender, "You are not the owner of this project");

    // is the project in review?
    require(project.status == ProjectStatus.Validate, "Project not in validation process");

    // pay the service provide
    project.provider.transfer(project.price);

    // project is now completed
    project.status = ProjectStatus.Completed;

    emit DeliveryAccepted(_id, msg.sender, project.provider, project.title, project.price);
  }

  // Reject the project delivery from the provider
  // The owner rejects the project delivered by the provider 
  function rejectDelivery(uint256 _id) public {
    
    // retrieve the project
    ProjectItem storage project = projects[_id];

    // ensure that this project exists
    if (project.owner == address(0x0)) {
      return;
    }
 
     // do we own this project?
    require(project.owner == msg.sender, "You are not the owner of this project");

    // is the project in review?
    require(project.status == ProjectStatus.Validate, "Project not in validation process");

    // project remains ongoing
    project.status = ProjectStatus.OnGoing;
    
    emit DeliveryRejected(_id, msg.sender, project.provider, project.title, project.price);
  }

  // Contract cancelled by the owner
  // The owner cancels the contract 
  function cancelContract(uint256 _id) public {
    
    // retrieve the project
    ProjectItem storage project = projects[_id];

    // ensure that this project exists
    if (project.owner == address(0x0)) {
      return;
    }
 
    // are we the service provider?
    require(project.owner == msg.sender, "You are not the project's owner");

    // is the project ongoing?
    require((project.status == ProjectStatus.OnGoing) || (project.status == ProjectStatus.Validate), "Project not in progress");

    // pay back the contract's owner
    project.owner.transfer(project.price);

    // contract becomes canceled
    project.status = ProjectStatus.Canceled;
    
    emit ContractCancelled(_id, msg.sender, project.provider, project.title, project.price);
  }

  //
  // Getters
  //

  // Retrieve a project from its id
  function getProject(uint256 _id) public view returns (
    address owner,
    address provider,
    string memory title,
    string memory description,
    uint256 price,
    ProjectStatus status) {

    ProjectItem memory project = projects[_id];

    // ensure that we have a project to fetch
    if (project.owner == address(0x0)) {
      return (address(0x0), address(0x0), "", "", 0, ProjectStatus.Unknown);
    }

    return (
      project.owner,
      project.provider,
      project.title,
      project.description,
      project.price,
      project.status);
  }

  // return all projects
  function getAllProjects() view public returns (uint256[] memory) {
    if (projectsCounter == 0) {
      return new uint[](0);
    }

    // prepare output array
    uint256[] memory projectIDs = new uint[](projectsCounter);

    // iterate over projects
    uint256 numberOfProjects = 0;
    for (uint256 i = 1; i <= projectsCounter; i++) {
      // skip deleted projects
      if (projects[i].owner != address(0x0)) {
        projectIDs[numberOfProjects] = projects[i].id;
        numberOfProjects = numberOfProjects.add(1);
      }
    }

    // copy the project ID array into a smaller array
    uint256[] memory allProjects = new uint[](numberOfProjects);
    for (uint j = 0; j < numberOfProjects; j++) {
      allProjects[j] = projectIDs[j];
    }

    return allProjects;
  }


  // return all published projects
  function getPublishedProjects() view public returns (uint256[] memory) {
    if (projectsCounter == 0) {
      return new uint[](0);
    }

    // prepare output array
    uint256[] memory projectIDs = new uint[](projectsCounter);

    // iterate over projects
    uint256 numberOfProjects = 0;
    for (uint256 i = 1; i <= projectsCounter; i++) {
      // get only published and active projects 
      if ((projects[i].owner != address(0x0)) && (projects[i].status == ProjectStatus.Available)) {
        projectIDs[numberOfProjects] = projects[i].id;
        numberOfProjects = numberOfProjects.add(1);
      }
    }

    // copy the project ID array into a smaller array
    uint256[] memory allProjects = new uint[](numberOfProjects);
    for (uint j = 0; j < numberOfProjects; j++) {
      allProjects[j] = projectIDs[j];
    }

    return allProjects;
  }


  // return all projects owned by the sender
  function getMyProjects() view public returns (uint256[] memory) {
    if (projectsCounter == 0) {
      return new uint256[](0);
    }

    // prepare output array
    uint256[] memory projectIDs = new uint[](projectsCounter);

    // iterate over projects
    uint256 numberOfProjects = 0;
    for (uint i = 1; i <= projectsCounter; i++) {
      // keep the ID of the project owned by the caller
      if ((projects[i].owner == msg.sender) && (projects[i].status != ProjectStatus.Completed) && (projects[i].status != ProjectStatus.Canceled)) {
        projectIDs[numberOfProjects] = projects[i].id;

        numberOfProjects = numberOfProjects.add(1);
      }
    }

    // copy the project ID array into a smaller array
    uint256[] memory myProjects = new uint[](numberOfProjects);
    for (uint j = 0; j < numberOfProjects; j++) {
      myProjects[j] = projectIDs[j];
    }

    return myProjects;
  }

  // return all my offers waiting for review
  function getMyOffers() view public returns (uint256[] memory) {
    if (projectsCounter == 0) {
      return new uint256[](0);
    }

    // prepare output array
    uint256[] memory projectIDs = new uint[](projectsCounter);

    // iterate over projects
    uint256 numberOfProjects = 0;
    for (uint i = 1; i <= projectsCounter; i++) {
      // keep the ID of the project with the sender as provider and the project still in review process
      if ((projects[i].provider == msg.sender) && (projects[i].status == ProjectStatus.InReview)) {
        projectIDs[numberOfProjects] = projects[i].id;

        numberOfProjects = numberOfProjects.add(1);
      }
    }

    // copy the project ID array into a smaller array
    uint256[] memory myOffers = new uint[](numberOfProjects);
    for (uint j = 0; j < numberOfProjects; j++) {
      myOffers[j] = projectIDs[j];
    }

    return myOffers;
  }


  // return all projects waiting for review
  function getMyReviews() view public returns (uint256[] memory) {
    if (projectsCounter == 0) {
      return new uint256[](0);
    }

    // prepare output array
    uint256[] memory projectIDs = new uint[](projectsCounter);

    // iterate over projects
    uint256 numberOfProjects = 0;
    for (uint i = 1; i <= projectsCounter; i++) {
      // keep the ID of the project owned by the caller and the project still in review process
      if ((projects[i].owner == msg.sender) && (projects[i].status == ProjectStatus.InReview)) {
        projectIDs[numberOfProjects] = projects[i].id;

        numberOfProjects = numberOfProjects.add(1);
      }
    }

    // copy the project ID array into a smaller array
    uint256[] memory myReviews = new uint[](numberOfProjects);
    for (uint j = 0; j < numberOfProjects; j++) {
      myReviews[j] = projectIDs[j];
    }

    return myReviews;
  }

  // return all ongoing contracts
  function getMyContracts() view public returns (uint256[] memory) {
    if (projectsCounter == 0) {
      return new uint[](0);
    }

    // prepare output array
    uint256[] memory projectIDs = new uint[](projectsCounter);

    // iterate over projects
    uint256 numberOfProjects = 0;
    for (uint256 i = 1; i <= projectsCounter; i++) {
      // get only ongoing and under validation contracts owned by the contract's owner or the service provider 
      if (((projects[i].owner == msg.sender) || (projects[i].provider == msg.sender)) && 
      ((projects[i].status == ProjectStatus.OnGoing) || (projects[i].status == ProjectStatus.Validate))) {
        projectIDs[numberOfProjects] = projects[i].id;
        numberOfProjects = numberOfProjects.add(1);
      }
    }

    // copy the project ID array into a smaller array
    uint256[] memory myContracts = new uint[](numberOfProjects);
    for (uint j = 0; j < numberOfProjects; j++) {
      myContracts[j] = projectIDs[j];
    }

    return myContracts;
  }

  // return all deliveries to review
  function getDeliveries() view public returns (uint256[] memory) {
    if (projectsCounter == 0) {
      return new uint[](0);
    }

    // prepare output array
    uint256[] memory projectIDs = new uint[](projectsCounter);

    // iterate over projects
    uint256 numberOfProjects = 0;
    for (uint256 i = 1; i <= projectsCounter; i++) {
      // get only ongoing contracts owner by the contract's owner or the service provider 
      if (((projects[i].owner == msg.sender) || (projects[i].provider == msg.sender)) && (projects[i].status == ProjectStatus.Validate)) {
        projectIDs[numberOfProjects] = projects[i].id;
        numberOfProjects = numberOfProjects.add(1);
      }
    }

    // copy the project ID array into a smaller array
    uint256[] memory myDeliveries = new uint[](numberOfProjects);
    for (uint j = 0; j < numberOfProjects; j++) {
      myDeliveries[j] = projectIDs[j];
    }

    return myDeliveries;
  }

  // return all completed contracts
  function getCompleted() view public returns (uint256[] memory) {
    if (projectsCounter == 0) {
      return new uint[](0);
    }

    // prepare output array
    uint256[] memory projectIDs = new uint[](projectsCounter);

    // iterate over projects
    uint256 numberOfProjects = 0;
    for (uint256 i = 1; i <= projectsCounter; i++) {
      // get only ongoing contracts owner by the contract's owner or the service provider 
      if (((projects[i].owner == msg.sender) || (projects[i].provider == msg.sender)) && (projects[i].status == ProjectStatus.Completed)) {
        projectIDs[numberOfProjects] = projects[i].id;
        numberOfProjects = numberOfProjects.add(1);
      }
    }

    // copy the project ID array into a smaller array
    uint256[] memory myCompleted = new uint[](numberOfProjects);
    for (uint j = 0; j < numberOfProjects; j++) {
      myCompleted[j] = projectIDs[j];
    }

    return myCompleted;
  }

  // return all canceled contracts
  function getCanceled() view public returns (uint256[] memory) {
    if (projectsCounter == 0) {
      return new uint[](0);
    }

    // prepare output array
    uint256[] memory projectIDs = new uint[](projectsCounter);

    // iterate over projects
    uint256 numberOfProjects = 0;
    for (uint256 i = 1; i <= projectsCounter; i++) {
      // get only ongoing contracts owner by the contract's owner or the service provider 
      if (((projects[i].owner == msg.sender) || (projects[i].provider == msg.sender)) && (projects[i].status == ProjectStatus.Canceled)) {
        projectIDs[numberOfProjects] = projects[i].id;
        numberOfProjects = numberOfProjects.add(1);
      }
    }

    // copy the project ID array into a smaller array
    uint256[] memory myCanceled = new uint[](numberOfProjects);
    for (uint j = 0; j < numberOfProjects; j++) {
      myCanceled[j] = projectIDs[j];
    }

    return myCanceled;
  }
}