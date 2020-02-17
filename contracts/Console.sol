pragma solidity >=0.4.21 <0.7.0;

library Console {
    event _TruffleLog(bool boolean);
    event _TruffleLog(int256 num);
    event _TruffleLog(uint256 num);
    event _TruffleLog(string str);
    event _TruffleLog(bytes32 b32);
    event _TruffleLog(address addr);

    event _TruffleLogNamed(bytes32 label, bool boolean);
    event _TruffleLogNamed(bytes32 label, int256 num);
    event _TruffleLogNamed(bytes32 label, uint256 num);
    event _TruffleLogNamed(bytes32 label, string str);
    event _TruffleLogNamed(bytes32 label, bytes32 b32);
    event _TruffleLogNamed(bytes32 label, address addr);

    function log(bool x) public {
        emit _TruffleLog(x);
    }

    function log(int256 x) public {
        emit _TruffleLog(x);
    }

    function log(uint256 x) public {
        emit _TruffleLog(x);
    }

    function log(string memory x) public {
        emit _TruffleLog(x);
    }

    function log(bytes32 x) public {
        emit _TruffleLog(x);
    }

    function log(address x) public {
        emit _TruffleLog(x);
    }

    function log(bytes32 x, bool y) public {
        emit _TruffleLogNamed(x, y);
    }

    function log(bytes32 x, int256 y) public {
        emit _TruffleLogNamed(x, y);
    }

    function log(bytes32 x, uint256 y) public {
        emit _TruffleLogNamed(x, y);
    }

    function log(bytes32 x, string memory y) public {
        emit _TruffleLogNamed(x, y);
    }

    function log(bytes32 x, bytes32 y) public {
        emit _TruffleLogNamed(x, y);
    }

    function log(bytes32 x, address y) public {
        emit _TruffleLogNamed(x, y);
    }
}
