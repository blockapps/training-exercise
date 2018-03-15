import './Passport.sol';

contract PassportRegistry {
    mapping (address => Passport) public registry;
    address[] public registerAddresses;

    function createPassport(string  name, string dateCreated, string dateExpires,
                            string residentialAddress, uint8 age, string countryOfOrigin) returns (bool) {
        // TODO: get the address of the sender msg.sender

        // TODO: make sure sender doesn't already have a passport


        // TODO: create a new passport for the sender

        // TODO: add the sender to registerAddresses

        // TODO: register that passport with the sender

        return true;

    }


    function renewPassport(string dateExpires) returns (bool) {
        // TODO: make sure the sender has a passport
        address passportOwner = msg.sender;

        // TODO: renew senders passport

    }

    function nullifyPassport() returns (bool) {

    }
}\
