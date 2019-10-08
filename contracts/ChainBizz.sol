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
    Published, 
    OnGoing, 
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
    address owner;
    address provider;             
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

  //
  // Implementation
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

    // publish the project
    project.status = ProjectStatus.Published;

    emit PublishedProject(_id, msg.sender, project.title, project.price);
  }


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
      projectIDs[numberOfProjects] = projects[i].id;
      numberOfProjects = numberOfProjects.add(1);
    }

    return projectIDs;
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
      if (projects[i].owner == msg.sender) {
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
}