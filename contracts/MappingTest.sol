pragma solidity ^0.4.24;

contract MappingTest {
    
    struct Candidate {
        string name;
        address depositContract;
        address owner;
        bool valid;
    }
    mapping (address => Candidate) public candidateMap;
    address[] public candidateArray;
    
    event RegisterCandidate(
        string name,
        address depositContract
    );
    event UnregisterCandidate(
        address owner
    );
    
    
    constructor() public {
    }


    
   function candidateRegister(string memory _name, address _depositContract) public returns (address owner){
            
        // deposit contrct does not exist
        require(!candidateMap[_depositContract].valid);

        Candidate storage candidate = candidateMap[_depositContract];

        candidate.name = _name;
        candidate.owner = msg.sender;
        candidate.depositContract = _depositContract;
        candidate.valid = true;

        emit RegisterCandidate(_name, _depositContract);

        return candidateMap[_depositContract].owner;
    }


    function candidateOwner(address _depositContract) public view returns (address owner){
        return candidateMap[_depositContract].owner;
    }


    function candidateUnregister(address _depositContract) public returns (bool registered){

        // sender must be owner of candidate
        require(msg.sender == candidateMap[_depositContract].owner);

        // set valid as false
        candidateMap[_depositContract].valid = false;

        emit UnregisterCandidate(candidateMap[_depositContract].depositContract);
        
        return candidateMap[_depositContract].valid;
    }
}