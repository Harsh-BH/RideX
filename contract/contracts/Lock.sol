// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Duber Smart Contract
contract Duber {
    //  ========= struct declarations start ============
    struct Driver {
        string name;
        uint256 licenseNumber;
        bool isActive;
        uint256[] tripIds;
    }

    struct Trip {
        uint256 tripId;
        address riderAddress;
        address driverAddress;
        string origin;
        string destination;
        uint256 startTime;
        uint256 endTime;
        uint256 fare;
        TripStatus status;
        uint256 transactionId;
    }

    enum TripStatus {
        Created,
        Accepted,
        Completed,
        Cancelled
    }

    struct Transaction {
        uint256 transactionId;
        uint256 tripId;
        uint256 amount;
        uint256 timestamp;
    }
    //  ========= struct declarations end ============

    //  ========= mapping declarations start ============
    mapping(address => Driver) public drivers;
    mapping(address => uint256[]) private riders;
    mapping(uint256 => Trip) private trips;
    mapping(uint256 => Transaction) private transactions;
    //  ========= mapping declarations end ============

    //  ========= variable declarations start ============
    uint256 public tripCounter;
    uint256 public transactionCounter;
    //  ========= variable declarations end ============

    //  ========= event declarations start ============
    event TripCreated(uint256 indexed tripId, address indexed riderAddress);
    event TripAccepted(uint256 indexed tripId, address indexed driverAddress);
    event TripCompleted(uint256 indexed tripId, uint256 fare);
    event TransactionRecorded(
        uint256 indexed transactionId,
        uint256 indexed tripId,
        uint256 amount
    );

    //  ========= event declarations end ==========

    // ---------------------driver specific function declarations start----------------------------
    function registerDriver(
        string memory _name,
        uint256 _licenseNumber
    ) public {
        require(
            drivers[msg.sender].licenseNumber == 0,
            "Driver already registered"
        );
        drivers[msg.sender] = Driver(
            _name,
            _licenseNumber,
            true,
            new uint256[](0)
        );
    }

    function acceptTrip(uint256 _tripId) public {
        require(drivers[msg.sender].isActive, "Driver is not active");
        Trip storage trip = trips[_tripId];
        require(trip.status == TripStatus.Created, "Trip is not available");

        trip.driverAddress = msg.sender;
        trip.status = TripStatus.Accepted;
        trip.startTime = block.timestamp;
        drivers[msg.sender].tripIds.push(_tripId);

        emit TripAccepted(_tripId, msg.sender);
    }

    function completeTrip(uint256 _tripId, uint256 _fare) public {
        Trip storage trip = trips[_tripId];
        require(
            trip.driverAddress == msg.sender,
            "Only the trip driver can complete the trip"
        );
        require(trip.status == TripStatus.Accepted, "Trip is not in progress");

        trip.endTime = block.timestamp;
        trip.fare = _fare;
        trip.status = TripStatus.Completed;

        transactionCounter++;
        trip.transactionId = transactionCounter;
        transactions[transactionCounter] = Transaction(
            transactionCounter,
            _tripId,
            _fare,
            block.timestamp
        );

        emit TripCompleted(_tripId, _fare);
        emit TransactionRecorded(transactionCounter, _tripId, _fare);
    }

    function getDriverDetails(
        address _driverAddress
    ) public view returns (string memory, uint256, bool) {
        Driver memory driver = drivers[_driverAddress];
        return (driver.name, driver.licenseNumber, driver.isActive);
    }

    function getDriverTrips() public view returns (Trip[] memory) {
        require(
            drivers[msg.sender].licenseNumber != 0,
            "Driver does not exists"
        );

        uint256[] memory tripIdsArr = drivers[msg.sender].tripIds;
        Trip[] memory tripsArr = new Trip[](tripIdsArr.length);

        for (uint i = 0; i < tripIdsArr.length; i++) {
            tripsArr[i] = (trips[tripIdsArr[i]]);
        }

        return tripsArr;
    }

    // ------------------------- driver specific function declarations end ----------------------------

    // ------------------------- rider specific function declarations start ----------------------------
    function createTrip(
        string memory _origin,
        string memory _destination
    ) public {
        require(
            (drivers[msg.sender].licenseNumber == 0),
            "Driver cannot create a trip"
        );

        if (riders[msg.sender].length == 0) {
            riders[msg.sender] = new uint256[](0);
        }

        tripCounter++;
        trips[tripCounter] = Trip(
            tripCounter,
            msg.sender,
            address(0),
            _origin,
            _destination,
            0,
            0,
            0,
            TripStatus.Created,
            0
        );
        riders[msg.sender].push(tripCounter);
        emit TripCreated(tripCounter, msg.sender);
    }

    function getRiderTrips() public view returns (Trip[] memory) {
        require(riders[msg.sender].length != 0, "Rider does not exists");

        uint256[] memory tripIdsArr = riders[msg.sender];
        Trip[] memory tripsArr = new Trip[](tripIdsArr.length);

        for (uint i = 0; i < tripIdsArr.length; i++) {
            tripsArr[i] = (trips[tripIdsArr[i]]);
        }

        return tripsArr;
    }

    // ------------------------- rider specific function declarations end ----------------------------

    function getTripDetails(
        uint256 _tripId
    )
        public
        view
        returns (
            uint256,
            address,
            address,
            string memory,
            string memory,
            uint256,
            uint256,
            uint256,
            TripStatus,
            uint256
        )
    {
        Trip memory trip = trips[_tripId];
        return (
            trip.tripId,
            trip.riderAddress,
            trip.driverAddress,
            trip.origin,
            trip.destination,
            trip.startTime,
            trip.endTime,
            trip.fare,
            trip.status,
            trip.transactionId
        );
    }

    function getTransactionDetails(
        uint256 _transactionId
    ) public view returns (uint256, uint256, uint256, uint256) {
        Transaction memory transaction = transactions[_transactionId];
        return (
            transaction.transactionId,
            transaction.tripId,
            transaction.amount,
            transaction.timestamp
        );
    }
}
