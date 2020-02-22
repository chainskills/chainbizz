pragma solidity >=0.4.21 <0.7.0;

import "openzeppelin-solidity/contracts/math/SafeMath.sol";

/// @title Decentralised business platform
/// @author Said Eloudrhiri (ChainSkills) - Devoxx Morocco 2019
/// @notice Learn how to create a smart contract to simulate a decentralised business platform to issue and fulfill projects
/// @dev This smart contract is for illustration purpose only and should not be used in the mainNet
contract ChainBizz {
    using SafeMath for uint256;

    /*
   * Enum
   */

    // Defines the status of the project
    enum ProjectStatus {
        Draft,
        Available,
        InReview,
        OnGoing,
        Validate,
        Completed,
        Canceled,
        Refunded,
        Unknown
    }

    /*
   * Structs
   */

    // Description of a project
    struct ProjectItem {
        uint256 id; // unique ID
        address payable issuer;
        address payable fulfiller;
        string title;
        uint256 price; // price in Wei
        string ipfsHash;
        ProjectStatus status;
    }

    /*
   * Storage
   */

    // List of projects
    mapping(uint256 => ProjectItem) public projects;

    // Number of registered projects
    uint256 projectsCounter;

    // Defines if the contract is still enable or not
    bool enabledContract;

    // Keep contract's issuer address
    address owner;

    /*
   * Modifiers
   */

    modifier onlyEnable() {
        require(enabledContract == true, "The contract is not more available");
        _;
    }

    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "This call is only allower by the contract's owner"
        );
        _;
    }

    /*
   * Events
   */
    event NewProject(
        uint256 id,
        address indexed issuer,
        string title,
        uint256 price
    );
    event UpdateProject(
        uint256 id,
        address indexed issuer,
        string title,
        uint256 price
    );
    event RemoveProject(uint256 id, address indexed issuer, string title);
    event PublishedProject(
        uint256 id,
        address indexed issuer,
        string title,
        uint256 price,
        string ipfsHash
    );
    event UnpublishedProject(
        uint256 id,
        address indexed issuer,
        string title,
        uint256 price
    );
    event OfferSubmitted(
        uint256 id,
        address indexed issuer,
        address indexed fulfiller,
        string title,
        uint256 price
    );
    event OfferCanceled(
        uint256 id,
        address indexed issuer,
        address indexed fulfiller,
        string title,
        uint256 price
    );
    event AcceptProposal(
        uint256 id,
        address indexed issuer,
        address indexed fulfiller,
        string title,
        uint256 price
    );
    event RejectProposal(
        uint256 id,
        address indexed issuer,
        address indexed fulfiller,
        string title,
        uint256 price
    );
    event ProjectDelivered(
        uint256 id,
        address indexed issuer,
        address indexed fulfiller,
        string title,
        uint256 price
    );
    event ServicesCanceled(
        uint256 id,
        address indexed issuer,
        address indexed fulfiller,
        string title,
        uint256 price
    );
    event DeliveryAccepted(
        uint256 id,
        address indexed issuer,
        address indexed fulfiller,
        string title,
        uint256 price
    );
    event DeliveryRejected(
        uint256 id,
        address indexed issuer,
        address indexed fulfiller,
        string title,
        uint256 price
    );
    event ContractCanceled(
        uint256 id,
        address indexed issuer,
        address indexed fulfiller,
        string title,
        uint256 price
    );

    /*
  * Public functions
  */

    constructor() public {
        enabledContract = true;
        owner = msg.sender;
    }

    /// @dev Enable the usage of the contract
    function enableContract() public onlyOwner {
        enabledContract = true;
    }

    /// @dev Disable the usage of the contract, change the status of all running projects and payback all issuers
    function disableContract() public onlyOwner onlyEnable {
        // First, we disable the contract
        enabledContract = false;

        // Then, we refund issuers for their running contracts

        // At least one project?
        if (projectsCounter == 0) {
            return;
        }

        // prepare output array
        uint256[] memory projectIDs = new uint256[](projectsCounter);

        // iterate over projects
        uint256 numberOfProjects = 0;
        for (uint256 i = 1; i <= projectsCounter; i++) {
            // retrieve the project
            ProjectItem storage project = projects[i];

            // check if this project is published
            if (
                (project.status == ProjectStatus.OnGoing) ||
                (project.status == ProjectStatus.Validate)
            ) {
                // Refund the issuer
                if (project.price > 0) {
                    // pay back the issuer
                    project.issuer.transfer(project.price);
                }

                // project refunded
                project.status = ProjectStatus.Refunded;
            }
        }
    }

    //
    // Setters
    //

    // Add a new project
    function addProject(string memory _title, uint256 _price)
        public
        onlyEnable
    {
        // a title is required
        bytes memory title = bytes(_title);
        require(title.length > 0, "A title is required");

        // new project
        projectsCounter = projectsCounter.add(1);

        // store the new project
        projects[projectsCounter] = ProjectItem(
            projectsCounter,
            msg.sender,
            address(0x0),
            _title,
            _price,
            "",
            ProjectStatus.Draft
        );

        emit NewProject(projectsCounter, msg.sender, _title, _price);
    }

    // Update an unpublished project
    function updateProject(uint256 _id, string memory _title, uint256 _price)
        public
        onlyEnable
    {
        // retrieve the project
        ProjectItem storage project = projects[_id];

        // ensure that this project exists
        if (project.issuer == address(0x0)) {
            return;
        }

        // do we own this project?
        require(
            project.issuer == msg.sender,
            "You are not the issuer of this project"
        );

        // ready to be published?
        require(
            project.status == ProjectStatus.Draft,
            "Cannot be updated while published"
        );

        // a title is required
        bytes memory title = bytes(_title);
        require(title.length > 0, "A title is required");

        // update the project
        project.title = _title;
        project.price = _price;

        emit UpdateProject(projectsCounter, msg.sender, _title, _price);
    }

    // Remove an unpublished project
    function removeProject(uint256 _id) public onlyEnable {
        // retrieve the project
        ProjectItem memory project = projects[_id];

        // ensure that this project exists
        if (project.issuer == address(0x0)) {
            return;
        }

        // do we own this project?
        require(
            project.issuer == msg.sender,
            "You are not the issuer of this project"
        );

        // keep title for future use
        string memory title = project.title;

        // remove the project
        delete projects[_id];

        emit RemoveProject(_id, msg.sender, title);
    }

    // Publish the project to seek for fulfillers
    function publishProject(
        string memory _title,
        uint256 _price,
        string memory _ipfsHash
    ) public onlyEnable {
        // a title is required
        bytes memory title = bytes(_title);
        require(title.length > 0, "A title is required");

        // The hash to IPFS is required
        bytes memory ipfsHash = bytes(_ipfsHash);
        require(ipfsHash.length > 0, "A hash to IPFS is required");

        // new project
        projectsCounter = projectsCounter.add(1);

        // store the new project
        projects[projectsCounter] = ProjectItem(
            projectsCounter,
            msg.sender,
            address(0x0),
            _title,
            _price,
            _ipfsHash,
            ProjectStatus.Available
        );

        emit PublishedProject(
            projectsCounter,
            msg.sender,
            _title,
            _price,
            _ipfsHash
        );
    }

    // Publish the project to seek for fulfillers
    function publishProjectOld(uint256 _id) public onlyEnable {
        // retrieve the project
        ProjectItem storage project = projects[_id];

        // ensure that this project exists
        if (project.issuer == address(0x0)) {
            return;
        }

        // do we own this project?
        require(
            project.issuer == msg.sender,
            "You are not the issuer of this project"
        );

        // ready to be published?
        require(project.status == ProjectStatus.Draft, "Cannot be published");

        // publish the project to be available for services
        project.status = ProjectStatus.Available;

        emit PublishedProject(
            _id,
            msg.sender,
            project.title,
            project.price,
            ""
        );
    }

    // Unpublish the project
    // A project can be unpublished ONLY if it's already published and not already part of a contract
    function unpublishProject(uint256 _id) public onlyEnable {
        // retrieve the project
        ProjectItem storage project = projects[_id];

        // ensure that this project exists
        if (project.issuer == address(0x0)) {
            return;
        }

        // do we own this project?
        require(
            project.issuer == msg.sender,
            "You are not the issuer of this project"
        );

        // ready to be unpublished?
        require(
            project.status == ProjectStatus.Available,
            "Cannot be unpublished"
        );

        // unpublish the project
        project.status = ProjectStatus.Draft;

        emit UnpublishedProject(_id, msg.sender, project.title, project.price);
    }

    // Offer services for the project
    // A fulfiller offers his/her services to perform the project
    function submitOffer(uint256 _id) public onlyEnable {
        // retrieve the project
        ProjectItem storage project = projects[_id];

        // ensure that this project exists
        if (project.issuer == address(0x0)) {
            return;
        }

        // is the project available?
        require(
            project.status == ProjectStatus.Available,
            "Project no more available"
        );

        // store the address of the fulfiller
        project.fulfiller = msg.sender;

        // project is under review
        project.status = ProjectStatus.InReview;

        emit OfferSubmitted(
            _id,
            project.issuer,
            msg.sender,
            project.title,
            project.price
        );
    }

    // Cancel offer made by the fulfiller
    // A fulfiller cancels his/her offer to perform the project
    function cancelOffer(uint256 _id) public onlyEnable {
        // retrieve the project
        ProjectItem storage project = projects[_id];

        // ensure that this project exists
        if (project.issuer == address(0x0)) {
            return;
        }

        // are we the service fulfiller?
        require(
            project.fulfiller == msg.sender,
            "You are not the service fulfiller"
        );

        // is the project in review?
        require(
            project.status == ProjectStatus.InReview,
            "Proposal not in review"
        );

        // project is now available
        address payable fulfiller = project.fulfiller;
        project.status = ProjectStatus.Available;
        project.fulfiller = address(0x0);

        emit OfferCanceled(
            _id,
            project.issuer,
            fulfiller,
            project.title,
            project.price
        );
    }

    // Accept services from the fulfiller
    // The issuer accepts the services offered by the fulfiller
    function acceptProposal(uint256 _id) public payable onlyEnable {
        // retrieve the project
        ProjectItem storage project = projects[_id];

        // ensure that this project exists
        if (project.issuer == address(0x0)) {
            return;
        }

        // do we own this project?
        require(
            project.issuer == msg.sender,
            "You are not the issuer of this project"
        );

        // is the project in review?
        require(
            project.status == ProjectStatus.InReview,
            "Proposal not in review"
        );

        // is the issuer has deposit the requeste amount?
        require(
            msg.value == project.price,
            "Your deposit doesn't match the contract's price"
        );

        // project is now ongoing
        project.status = ProjectStatus.OnGoing;

        emit AcceptProposal(
            _id,
            project.issuer,
            project.fulfiller,
            project.title,
            project.price
        );
    }

    // Reject proposal from the fulfiller
    // The issuer rejects the services offered by the fulfiller
    function rejectProposal(uint256 _id) public onlyEnable {
        // retrieve the project
        ProjectItem storage project = projects[_id];

        // ensure that this project exists
        if (project.issuer == address(0x0)) {
            return;
        }

        // do we own this project?
        require(
            project.issuer == msg.sender,
            "You are not the issuer of this project"
        );

        // is the project in review?
        require(
            project.status == ProjectStatus.InReview,
            "Proposal not in review"
        );

        // project is now available
        address payable fulfiller = project.fulfiller;
        project.status = ProjectStatus.Available;
        project.fulfiller = address(0x0);

        emit RejectProposal(
            _id,
            project.issuer,
            fulfiller,
            project.title,
            project.price
        );
    }

    // Deliver the project to the customer
    // The fulfiller delivers the project to the issuer
    function deliverProject(uint256 _id) public onlyEnable {
        // retrieve the project
        ProjectItem storage project = projects[_id];

        // ensure that this project exists
        if (project.issuer == address(0x0)) {
            return;
        }

        // are we the service fulfiller?
        require(
            project.fulfiller == msg.sender,
            "You are not the service fulfiller"
        );

        // is the project ongoing?
        require(
            project.status == ProjectStatus.OnGoing,
            "Project not in progress"
        );

        // project is now validation process
        project.status = ProjectStatus.Validate;

        emit ProjectDelivered(
            _id,
            project.issuer,
            project.fulfiller,
            project.title,
            project.price
        );
    }

    // Cancel services from the fulfiller
    // The fulfiller cancels the services performed for the project
    function cancelServices(uint256 _id) public onlyEnable {
        // retrieve the project
        ProjectItem storage project = projects[_id];

        // ensure that this project exists
        if (project.issuer == address(0x0)) {
            return;
        }

        // are we the service fulfiller?
        require(
            project.fulfiller == msg.sender,
            "You are not the service fulfiller"
        );

        // is the project ongoing?
        require(
            project.status == ProjectStatus.OnGoing,
            "Project not in progress"
        );

        // project becomes available
        address payable fulfiller = project.fulfiller;
        project.status = ProjectStatus.Available;
        project.fulfiller = address(0x0);

        emit ServicesCanceled(
            _id,
            project.issuer,
            fulfiller,
            project.title,
            project.price
        );
    }

    // Accept the project delivery from the fulfiller
    // The issuer accepts the project delivered by the fulfiller
    function acceptDelivery(uint256 _id) public onlyEnable {
        // retrieve the project
        ProjectItem storage project = projects[_id];

        // ensure that this project exists
        if (project.issuer == address(0x0)) {
            return;
        }

        // do we own this project?
        require(
            project.issuer == msg.sender,
            "You are not the issuer of this project"
        );

        // is the project in review?
        require(
            project.status == ProjectStatus.Validate,
            "Project not in validation process"
        );

        // pay the service provide
        project.fulfiller.transfer(project.price);

        // project is now completed
        project.status = ProjectStatus.Completed;

        emit DeliveryAccepted(
            _id,
            project.issuer,
            project.fulfiller,
            project.title,
            project.price
        );
    }

    // Reject the project delivery from the fulfiller
    // The issuer rejects the project delivered by the fulfiller
    function rejectDelivery(uint256 _id) public onlyEnable {
        // retrieve the project
        ProjectItem storage project = projects[_id];

        // ensure that this project exists
        if (project.issuer == address(0x0)) {
            return;
        }

        // do we own this project?
        require(
            project.issuer == msg.sender,
            "You are not the issuer of this project"
        );

        // is the project in review?
        require(
            project.status == ProjectStatus.Validate,
            "Project not in validation process"
        );

        // project remains ongoing
        project.status = ProjectStatus.OnGoing;

        emit DeliveryRejected(
            _id,
            project.issuer,
            project.fulfiller,
            project.title,
            project.price
        );
    }

    // Contract canceled by the issuer
    // The issuer cancels the contract
    function cancelContract(uint256 _id) public onlyEnable {
        // retrieve the project
        ProjectItem storage project = projects[_id];

        // ensure that this project exists
        if (project.issuer == address(0x0)) {
            return;
        }

        // are we the service fulfiller?
        require(
            project.issuer == msg.sender,
            "You are not the project's issuer"
        );

        // is the project ongoing?
        require(
            (project.status == ProjectStatus.OnGoing) ||
                (project.status == ProjectStatus.Validate),
            "Project not in progress"
        );

        // pay back the contract's issuer
        project.issuer.transfer(project.price);

        // contract becomes canceled
        project.status = ProjectStatus.Canceled;

        emit ContractCanceled(
            _id,
            project.issuer,
            project.fulfiller,
            project.title,
            project.price
        );
    }

    //
    // Getters
    //

    // Retrieve if the contract is still enable or not
    function isEnabled() public view returns (bool) {
        return enabledContract;
    }

    // Retrieve a project from its id
    function getProject(uint256 _id)
        public
        view
        returns (
            address issuer,
            address fulfiller,
            string memory title,
            uint256 price,
            string memory ipfsHash,
            ProjectStatus status
        )
    {
        ProjectItem memory project = projects[_id];

        // ensure that we have a project to fetch
        if (project.issuer == address(0x0)) {
            return (
                address(0x0),
                address(0x0),
                "",
                0,
                "",
                ProjectStatus.Unknown
            );
        }

        return (
            project.issuer,
            project.fulfiller,
            project.title,
            project.price,
            project.ipfsHash,
            project.status
        );
    }

    // return all projects
    function getAllProjects() public view returns (uint256[] memory) {
        if (projectsCounter == 0) {
            return new uint256[](0);
        }

        // prepare output array
        uint256[] memory projectIDs = new uint256[](projectsCounter);

        // iterate over projects
        uint256 numberOfProjects = 0;
        for (uint256 i = 1; i <= projectsCounter; i++) {
            // skip deleted projects
            if (projects[i].issuer != address(0x0)) {
                projectIDs[numberOfProjects] = projects[i].id;
                numberOfProjects = numberOfProjects.add(1);
            }
        }

        // copy the project ID array into a smaller array
        uint256[] memory allProjects = new uint256[](numberOfProjects);
        for (uint256 j = 0; j < numberOfProjects; j++) {
            allProjects[j] = projectIDs[j];
        }

        return allProjects;
    }

    // return all published projects
    function getPublishedProjects() public view returns (uint256[] memory) {
        if (projectsCounter == 0) {
            return new uint256[](0);
        }

        // prepare output array
        uint256[] memory projectIDs = new uint256[](projectsCounter);

        // iterate over projects
        uint256 numberOfProjects = 0;
        for (uint256 i = 1; i <= projectsCounter; i++) {
            // get only published and active projects
            if (
                (projects[i].issuer != address(0x0)) &&
                (projects[i].status == ProjectStatus.Available)
            ) {
                projectIDs[numberOfProjects] = projects[i].id;
                numberOfProjects = numberOfProjects.add(1);
            }
        }

        // copy the project ID array into a smaller array
        uint256[] memory allProjects = new uint256[](numberOfProjects);
        for (uint256 j = 0; j < numberOfProjects; j++) {
            allProjects[j] = projectIDs[j];
        }

        return allProjects;
    }

    // return all projects owned by the sender
    function getMyProjects() public view returns (uint256[] memory) {
        if (projectsCounter == 0) {
            return new uint256[](0);
        }

        // prepare output array
        uint256[] memory projectIDs = new uint256[](projectsCounter);

        // iterate over projects
        uint256 numberOfProjects = 0;
        for (uint256 i = 1; i <= projectsCounter; i++) {
            // keep the ID of the project owned by the caller
            if (
                (projects[i].issuer == msg.sender) &&
                (projects[i].status != ProjectStatus.Completed) &&
                (projects[i].status != ProjectStatus.Canceled)
            ) {
                projectIDs[numberOfProjects] = projects[i].id;

                numberOfProjects = numberOfProjects.add(1);
            }
        }

        // copy the project ID array into a smaller array
        uint256[] memory myProjects = new uint256[](numberOfProjects);
        for (uint256 j = 0; j < numberOfProjects; j++) {
            myProjects[j] = projectIDs[j];
        }

        return myProjects;
    }

    // return all my offers waiting for review
    function getMyOffers() public view returns (uint256[] memory) {
        if (projectsCounter == 0) {
            return new uint256[](0);
        }

        // prepare output array
        uint256[] memory projectIDs = new uint256[](projectsCounter);

        // iterate over projects
        uint256 numberOfProjects = 0;
        for (uint256 i = 1; i <= projectsCounter; i++) {
            // keep the ID of the project with the sender as fulfiller and the project still in review process
            if (
                (projects[i].fulfiller == msg.sender) &&
                (projects[i].status == ProjectStatus.InReview)
            ) {
                projectIDs[numberOfProjects] = projects[i].id;

                numberOfProjects = numberOfProjects.add(1);
            }
        }

        // copy the project ID array into a smaller array
        uint256[] memory myOffers = new uint256[](numberOfProjects);
        for (uint256 j = 0; j < numberOfProjects; j++) {
            myOffers[j] = projectIDs[j];
        }

        return myOffers;
    }

    // return all projects waiting for review
    function getMyReviews() public view returns (uint256[] memory) {
        if (projectsCounter == 0) {
            return new uint256[](0);
        }

        // prepare output array
        uint256[] memory projectIDs = new uint256[](projectsCounter);

        // iterate over projects
        uint256 numberOfProjects = 0;
        for (uint256 i = 1; i <= projectsCounter; i++) {
            // keep the ID of the project owned by the caller and the project still in review process
            if (
                (projects[i].issuer == msg.sender) &&
                (projects[i].status == ProjectStatus.InReview)
            ) {
                projectIDs[numberOfProjects] = projects[i].id;

                numberOfProjects = numberOfProjects.add(1);
            }
        }

        // copy the project ID array into a smaller array
        uint256[] memory myReviews = new uint256[](numberOfProjects);
        for (uint256 j = 0; j < numberOfProjects; j++) {
            myReviews[j] = projectIDs[j];
        }

        return myReviews;
    }

    // return all ongoing contracts
    function getMyContracts() public view returns (uint256[] memory) {
        if (projectsCounter == 0) {
            return new uint256[](0);
        }

        // prepare output array
        uint256[] memory projectIDs = new uint256[](projectsCounter);

        // iterate over projects
        uint256 numberOfProjects = 0;
        for (uint256 i = 1; i <= projectsCounter; i++) {
            // get only ongoing and under validation contracts owned by the issuer or the service fulfiller
            if (
                ((projects[i].issuer == msg.sender) ||
                    (projects[i].fulfiller == msg.sender)) &&
                ((projects[i].status == ProjectStatus.OnGoing) ||
                    (projects[i].status == ProjectStatus.Validate))
            ) {
                projectIDs[numberOfProjects] = projects[i].id;
                numberOfProjects = numberOfProjects.add(1);
            }
        }

        // copy the project ID array into a smaller array
        uint256[] memory myContracts = new uint256[](numberOfProjects);
        for (uint256 j = 0; j < numberOfProjects; j++) {
            myContracts[j] = projectIDs[j];
        }

        return myContracts;
    }

    // return all deliveries to review
    function getDeliveries() public view returns (uint256[] memory) {
        if (projectsCounter == 0) {
            return new uint256[](0);
        }

        // prepare output array
        uint256[] memory projectIDs = new uint256[](projectsCounter);

        // iterate over projects
        uint256 numberOfProjects = 0;
        for (uint256 i = 1; i <= projectsCounter; i++) {
            // get only ongoing projects issued by the issuer or the fulfiller
            if (
                ((projects[i].issuer == msg.sender) ||
                    (projects[i].fulfiller == msg.sender)) &&
                (projects[i].status == ProjectStatus.Validate)
            ) {
                projectIDs[numberOfProjects] = projects[i].id;
                numberOfProjects = numberOfProjects.add(1);
            }
        }

        // copy the project ID array into a smaller array
        uint256[] memory myDeliveries = new uint256[](numberOfProjects);
        for (uint256 j = 0; j < numberOfProjects; j++) {
            myDeliveries[j] = projectIDs[j];
        }

        return myDeliveries;
    }

    // return all completed contracts
    function getCompleted() public view returns (uint256[] memory) {
        if (projectsCounter == 0) {
            return new uint256[](0);
        }

        // prepare output array
        uint256[] memory projectIDs = new uint256[](projectsCounter);

        // iterate over projects
        uint256 numberOfProjects = 0;
        for (uint256 i = 1; i <= projectsCounter; i++) {
            // get only ongoing projects issued by the issuer or the fulfiller
            if (
                ((projects[i].issuer == msg.sender) ||
                    (projects[i].fulfiller == msg.sender)) &&
                (projects[i].status == ProjectStatus.Completed)
            ) {
                projectIDs[numberOfProjects] = projects[i].id;
                numberOfProjects = numberOfProjects.add(1);
            }
        }

        // copy the project ID array into a smaller array
        uint256[] memory myCompleted = new uint256[](numberOfProjects);
        for (uint256 j = 0; j < numberOfProjects; j++) {
            myCompleted[j] = projectIDs[j];
        }

        return myCompleted;
    }

    // return all canceled contracts
    function getCanceled() public view returns (uint256[] memory) {
        if (projectsCounter == 0) {
            return new uint256[](0);
        }

        // prepare output array
        uint256[] memory projectIDs = new uint256[](projectsCounter);

        // iterate over projects
        uint256 numberOfProjects = 0;
        for (uint256 i = 1; i <= projectsCounter; i++) {
            // get only ongoing projects issued by the issuer or the fulfiller
            if (
                ((projects[i].issuer == msg.sender) ||
                    (projects[i].fulfiller == msg.sender)) &&
                (projects[i].status == ProjectStatus.Canceled)
            ) {
                projectIDs[numberOfProjects] = projects[i].id;
                numberOfProjects = numberOfProjects.add(1);
            }
        }

        // copy the project ID array into a smaller array
        uint256[] memory myCanceled = new uint256[](numberOfProjects);
        for (uint256 j = 0; j < numberOfProjects; j++) {
            myCanceled[j] = projectIDs[j];
        }

        return myCanceled;
    }
}
